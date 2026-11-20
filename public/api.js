// Data layer. Two providers with the same interface:
//   Demo  - static data from data.js
//   Untis - real WebUntis data. In the Android app all requests go through Capacitor's native HTTP
//           (CapacitorHttp patches fetch), so there is no CORS restriction and no proxy is needed.
//
// Normalised lesson:  { date:'YYYY-MM-DD', start:'HH:MM', end:'HH:MM', room, subject, classes, teachers,
//                       status:'regular'|'cancelled'|'changed'|'room', room_changed, info, hue, sat }

const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = s => { const [y, m, d] = s.slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d); };
const mins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const mondayOf = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
const yyyymmdd = d => iso(d).replace(/-/g, '');
// WebUntis flags exams in different fields (type, status, statusDetail ...): look at all plain string fields
const isExam = g => Object.values(g).some(v => typeof v === 'string' && /exam|pr(ü|u)fung|klassenarbeit/i.test(v) && v.length < 40);
const fromHHMM = n => `${pad(Math.floor(n / 100))}:${pad(n % 100)}`;   // 750 -> 07:50

function isoWeek(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t - y0) / 864e5 + 1) / 7);
}

function hueOf(str) { let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }

/* ------------------------------------------------------------------ Demo */
const Demo = {
  async init() { return { school: DEMO.school, profile: DEMO.profile, unread: DEMO.unreadMessages }; },
  async grid() { return DEMO.grid; },
  async holidays() { return DEMO.holidays; },
  async week(monday, res) {
    if (DEMO.lockedWeeks.includes(iso(monday))) throw Object.assign(new Error('locked'), { code: 'LOCKED' });
    const out = [];
    for (const e of DEMO.week) {
      const date = iso(addDays(monday, e.day));
      out.push({ ...e, date, start: DEMO.grid[e.p - 1][0], end: DEMO.grid[e.p + e.n - 2][1],
        status: e.status || 'regular', classes: e.classes || '' });
    }
    return out;
  },
  async resources(type) { return type === 'CLASS' ? DEMO.classes : DEMO.students; },
  async announcement() { return DEMO.announcement; },
  async messages() { return DEMO.messages; },
  async message(id) { return DEMO.messages.find(m => m.id === id); },
  async confirmRead(id) { const m = DEMO.messages.find(x => x.id === id); if (m) m.needsConfirm = false; },
  async exams(from, to) { return DEMO.exams.filter(e => parseISO(e.date) >= from && parseISO(e.date) <= to); },
  async absences(from, to) { return DEMO.absences.filter(a => parseISO(a.date) >= from && parseISO(a.date) <= to); },
  async downloadAttachment() { toast('Im Demo-Modus nicht verfügbar'); },
};

/* ----------------------------------------------------------------- Untis */
// Endpoints below are the ones the WebUntis web client itself uses. They differ slightly
// between school/server versions, so every call is defensive about the response shape.
const Untis = {
  s: null,   // { host, school, cookie, personId, personType, klasseId, token }

  async raw(path, opts = {}) {
    const s = this.s;
    const headers = { cookie: s.cookie, ...(opts.headers || {}) };
    if (s.token) headers.authorization = 'Bearer ' + s.token;
    const r = await fetch(`https://${s.host}${path}`, { ...opts, headers });
    const sc = parseSetCookie(r.headers.get('set-cookie'));
    if (sc) s.cookie = mergeCookie(s.cookie, sc);
    return r;
  },
  // JSON request. If the WebUntis session/token has expired (typical after the app was closed for a while),
  // log in again with the saved credentials and retry once.
  async json(path, opts, retry = true) {
    const r = await this.raw(path, opts);
    let j = null, ok = r.ok;
    if (ok) { try { j = await r.json(); } catch { ok = false; } }
    if (ok && j && j.error && j.error.code === -8520) ok = false;   // JSON-RPC: "not authenticated"
    if (ok) return j;
    if (retry && this.s.password) { await this.relogin(); return this.json(path, opts, false); }
    throw Object.assign(new Error(`${r.status} ${path}`), { status: r.status });
  },

  async fetchToken() {
    try {
      const r = await this.raw('/WebUntis/api/token/new');
      const t = r.ok ? (await r.text()).replace(/"/g, '').trim() : '';
      this.s.token = /^[\w-]+\.[\w-]+\.[\w-]+$/.test(t) ? t : null;
    } catch { this.s.token = null; }
    return this.s.token;
  },

  async relogin() {
    const old = this.s;
    if (!old.password) throw new Error('Sitzung abgelaufen');
    await this.login({ host: old.host, school: old.school, user: old.user, password: old.password });
    Object.assign(this.s, { studentId: old.studentId, klasseId: old.klasseId ?? this.s.klasseId });
    await this.fetchToken();
    store.set('session', { kind: 'untis', s: this.s });
  },

  async login({ host, school, user, password }) {
    host = host.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    this.s = { host, school, cookie: `schoolname=_${btoa(school)}`, token: null };
    const r = await this.raw(`/WebUntis/jsonrpc.do?school=${encodeURIComponent(school)}`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: 'recode', method: 'authenticate', jsonrpc: '2.0',
        params: { user, password, client: 'WebUntis Recode' } }),
    });
    const j = await r.json();
    if (!j.result) throw new Error(j.error?.message || 'Anmeldung fehlgeschlagen');
    Object.assign(this.s, { personId: j.result.personId, personType: j.result.personType, password,
      klasseId: j.result.klasseId, user, cookie: mergeCookie(this.s.cookie, 'JSESSIONID=' + j.result.sessionId) });
    return this.s;
  },
  restore(s) { this.s = s; },

  async init() {
    const s = this.s;
    // validate the stored session; if it is dead, sign in again silently
    if (!(await this.fetchToken()) && s.password) await this.relogin();
    let name = s.user, school = s.school;
    try {
      const d = (await this.json('/WebUntis/api/rest/view/v1/app/data')).user || {};
      name = d.person?.displayName || name;
      s.studentId = d.person?.id || s.personId;
      s.klasseId = d.klasse?.id || s.klasseId;
      school = (await this.json('/WebUntis/api/rest/view/v1/app/data')).tenant?.displayName || school;
    } catch { s.studentId = s.personId; }
    let unread = 0;
    try { unread = (await this.messages()).filter(m => !m.read).length; } catch { /* ignore */ }
    return { school, profile: { name, username: s.user, role: 'Schüler*in', email: '' }, unread };
  },

  async grid() {
    try {
      const j = await this.json(`/WebUntis/jsonrpc.do?school=${encodeURIComponent(this.s.school)}`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 'g', method: 'getTimegridUnits', params: {}, jsonrpc: '2.0' }) });
      const day = (j.result || []).find(d => d.timeUnits?.length) || j.result?.[0];
      return day.timeUnits.map(u => [fromHHMM(u.startTime), fromHHMM(u.endTime)]);
    } catch { return DEMO.grid; }
  },

  async resources(type) {
    const j = await this.json('/WebUntis/api/rest/view/v1/timetable/filter?resourceType=' + type);
    return (j.resources || []).map(x => x.resource || x).map(r => ({
      id: r.id, name: r.displayName || r.shortName || r.name || '', teachers: (r.klassenlehrer || []).map(t => t.shortName || t.displayName),
      cls: r.klasse?.shortName || r.klasse?.displayName || '' })).sort((a, b) => a.name.localeCompare(b.name, 'de'));
  },

  async week(monday, res) {
    const own = !res || res.own;
    const q = new URLSearchParams({ start: iso(monday), end: iso(addDays(monday, 6)), format: '1',
      resourceType: own ? 'STUDENT' : res.type, resources: own ? (this.s.studentId || this.s.personId) : res.id,
      timetableType: own ? 'MY_TIMETABLE' : 'STANDARD' });
    let j;
    try { j = await this.json('/WebUntis/api/rest/view/v1/timetable/entries?' + q); }
    catch (e) { if (e.status === 403) throw Object.assign(new Error('locked'), { code: 'LOCKED' }); throw e; }
    const out = [];
    for (const day of j.days || []) {
      for (const g of day.gridEntries || []) {
        const pick = type => (g.position1 || []).concat(g.position2 || [], g.position3 || [], g.position4 || [], g.position5 || [])
          .map(p => p.current || p).filter(p => p.type === type).map(p => p.shortName || p.displayName || p.longName);
        const pos = i => (g['position' + i] || []).map(p => (p.current || p)).map(p => p.shortName || p.displayName || p.longName).join(', ');
        const subject = pick('SUBJECT').join(', ') || pos(1);
        const room = pick('ROOM').join(', ') || pos(3);
        const rooms = [].concat(g.position1 || [], g.position2 || [], g.position3 || [], g.position4 || []);
        const removedRoom = rooms.find(p => p.removed && p.removed.type === 'ROOM')?.removed;
        const roomChanged = !!removedRoom;
        const status = g.status === 'CANCELLED' ? 'cancelled'
          : g.status === 'CHANGED' || g.status === 'SUBSTITUTION' ? (g.substitutionText || g.lessonInfo ? 'changed' : 'room') : 'regular';
        out.push({ date: String(day.date).slice(0, 10), start: g.duration.start.slice(11, 16) || g.duration.start.slice(0, 5),
          end: g.duration.end.slice(11, 16) || g.duration.end.slice(0, 5),
          room, subject, classes: pick('CLASS').join(' '), teachers: pick('TEACHER').join(', '),
          status, room_changed: roomChanged, old_room: removedRoom?.shortName || '', exam: isExam(g) ? (g.lessonText || g.name || 'Prüfung') : '', info: [g.substitutionText, g.lessonInfo].filter(Boolean).join('\n'),
          hue: hueOf(subject) });
      }
    }
    // exam lessons are not always flagged as EXAM in the timetable: also match the exam list by date/time
    if (own) {
      try {
        const ex = await this.exams(monday, addDays(monday, 6));
        for (const l of out) {
          if (l.exam) continue;
          const e = ex.find(x => x.date === l.date && x.start < l.end && x.end > l.start);
          if (e) l.exam = e.text || e.subject || 'Prüfung';
        }
      } catch { /* exam list is optional */ }
    }
    // exams are shown orange like other changed lessons
    for (const l of out) if (l.exam && l.status === 'regular') l.status = 'changed';
    return out;
  },

  async holidays() {
    if (this._hol) return this._hol;
    try {
      const j = await this.json(`/WebUntis/jsonrpc.do?school=${encodeURIComponent(this.s.school)}`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 'h', method: 'getHolidays', params: {}, jsonrpc: '2.0' }) });
      const d = n => { const s = String(n); return new Date(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8)); };
      const out = [];
      for (const h of j.result || []) for (let x = d(h.startDate); x <= d(h.endDate); x = addDays(x, 1)) out.push(iso(x));
      return (this._hol = out);
    } catch { return []; }
  },

  async announcement() {
    try {
      const j = await this.json('/WebUntis/api/portal/news/newsWidgetData?date=' + yyyymmdd(new Date()));
      const m = j.data?.messagesOfDay?.[0];
      return m ? { title: m.subject, text: (m.text || '').replace(/<[^>]+>/g, ' ').trim(), isNew: true } : null;
    } catch { return null; }
  },

  async messages() {
    const j = await this.json('/WebUntis/api/rest/view/v1/messages');
    const norm = m => ({ id: m.id, sender: m.sender?.displayName || m.sender?.name || '', date: m.sentDateTime,
      subject: m.subject, preview: m.contentPreview || '', read: !!m.isMessageRead,
      needsConfirm: !!m.requestReadConfirmation && !m.isReadConfirmed,
      attachments: m.hasAttachments ? [{}] : [] });
    return (j.incomingMessages || []).map(norm);
  },
  async message(id) {
    const m = await this.json('/WebUntis/api/rest/view/v1/messages/' + id);
    return { id, sender: m.sender?.displayName || '', date: m.sentDateTime, subject: m.subject,
      body: (m.content || '').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<[^>]+>/g, '').trim(),
      needsConfirm: !!m.requestReadConfirmation && !m.isReadConfirmed,
      attachments: (m.attachments || []).map(a => ({ id: a.id, name: a.name || a.fileName })) };
  },
  async confirmRead(id) {
    await this.raw(`/WebUntis/api/rest/view/v1/messages/${id}/read-confirmation`, { method: 'POST' });
  },
  async downloadAttachment(msgId, att) {
    const r = await this.raw(`/WebUntis/api/rest/view/v1/messages/${msgId}/attachments/${att.id}`);
    const url = URL.createObjectURL(await r.blob());
    Object.assign(document.createElement('a'), { href: url, download: att.name }).click();
  },

  async exams(from, to) {
    const q = new URLSearchParams({ studentId: this.s.studentId || this.s.personId, klasseId: this.s.klasseId || 0,
      withGrades: 'false', startDate: yyyymmdd(from), endDate: yyyymmdd(to) });
    const j = await this.json('/WebUntis/api/exams?' + q);
    const d = n => { const s = String(n); return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`; };
    return (j.data?.exams || []).map(e => ({ date: d(e.examDate), start: fromHHMM(e.startTime), end: fromHHMM(e.endTime),
      rooms: e.rooms || [], subject: e.subject || '', type: e.examType || 'Klassenarbeit', text: e.text || e.name || '' }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },
  async absences(from, to) {
    const q = new URLSearchParams({ startDate: yyyymmdd(from), endDate: yyyymmdd(to),
      studentId: this.s.studentId || this.s.personId, excuseStatusId: '-1' });
    const j = await this.json('/WebUntis/api/classreg/absences/students?' + q);
    const d = n => { const s = String(n); return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`; };
    return (j.data?.absences || []).map(a => ({ date: d(a.startDate), start: fromHHMM(a.startTime), end: fromHHMM(a.endTime),
      reason: a.reason || 'unbekannt', text: a.text || '', excused: !!a.isExcused }))
      .sort((a, b) => b.date.localeCompare(a.date));
  },
};

// native responses may fold several Set-Cookie headers into one comma-joined string
function parseSetCookie(h) {
  if (!h) return '';
  return h.split(/,(?=\s*[\w.-]+=)/).map(c => c.trim().split(';')[0]).join('; ');
}

function mergeCookie(old, add) {
  const m = new Map();
  for (const part of (old + '; ' + add).split(';')) {
    const [k, ...v] = part.trim().split('='); if (k) m.set(k, v.join('='));
  }
  return [...m].map(([k, v]) => `${k}=${v}`).join('; ');
}

/* ---------------------------------------------------------- school search */
// returns { state:'ok'|'many'|'none'|'error', schools:[{displayName,address,host,loginName}] }
const Schools = {
  async search(q, demo) {
    q = q.trim(); if (!q) return { state: 'idle', schools: [] };
    if (demo) {
      if (q.length < 4) return { state: 'many', schools: [] };
      return { state: 'ok', schools: DEMO.schools.filter(s => (s.displayName + s.address).toLowerCase().includes(q.toLowerCase())) };
    }
    try {
      const r = await fetch('https://schoolsearch.webuntis.com/schoolquery2', { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 'wu_schulsuche-1', method: 'searchSchool', params: [{ search: q }], jsonrpc: '2.0' }) });
      const j = await r.json();
      const res = j.result || {};
      const list = (res.schools || []).map(s => ({ displayName: s.displayName || s.loginName, address: s.address || '', host: s.server, loginName: s.loginName }));
      if (!list.length) return { state: (res.size || 0) > 0 ? 'many' : (j.error ? 'many' : 'none'), schools: [] };
      return { state: 'ok', schools: list };
    } catch { return { state: 'error', schools: [] }; }
  },
};

window.Schools = Schools;
window.Provider = Demo;
window.Demo = Demo;
window.Untis = Untis;
