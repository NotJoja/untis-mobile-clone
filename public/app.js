/* WebUntis Recode - UI. Hash-routed single page app. */
const $app = document.getElementById('app');
function fit() { const k = Math.min(innerWidth, 440) / 360; $app.style.zoom = k; $app.style.height = (innerHeight / k) + 'px'; }
fit(); addEventListener('resize', fit);
const DOW = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MON_SHORT = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];
const MON = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];

/* ---------------------------------------------------------------- icons */
const I = (d, vb = '0 0 32 32') => `<svg viewBox="${vb}">${d}</svg>`;
const ICON = {
  chevR: I('<path d="M10 4l11 12-11 12"/>'),
  chevL: I('<path d="M21 4L10 16l11 12"/>'),
  chevD: I('<path d="M6 11l10 10 10-10"/>'),
  megaphone: I('<path d="M5 13h6l11-6v18l-11-6H5z"/><path d="M8 19l2 7h4l-2-7"/><path d="M26 12v8"/>'),
  school: I('<path d="M16 3v6M16 3h4v3h-4"/><path d="M5 28V17l11-6 11 6v11z"/><path d="M12 28v-5h8v5M12 17h2M18 17h2M10 22h1M21 22h1"/><circle cx="16" cy="14" r="1.5"/>'),
  cal19: I('<rect x="4" y="6" width="24" height="22" rx="3"/><path d="M4 12h24M10 3v5M22 3v5"/><text x="16" y="25" font-size="10" text-anchor="middle" fill="currentColor" stroke="none" font-family="Roboto" font-weight="400">19</text>'),
  mail: I('<rect x="4" y="8" width="24" height="17" rx="3"/><path d="M5 10l11 8 11-8"/>'),
  person: I('<circle cx="16" cy="10" r="6"/><path d="M5 29c0-6 5-10 11-10s11 4 11 10"/>'),
  filter: I('<path d="M4 6h24L18 17v9l-4 2V17z"/>'),
  clock: I('<circle cx="16" cy="16" r="11"/><path d="M16 9v7l5 3"/>'),
  info: I('<circle cx="16" cy="16" r="11"/><path d="M16 14v8M16 10v1.5"/>'),
  circle: I('<circle cx="16" cy="16" r="11"/>'),
  checkCircle: I('<circle cx="16" cy="16" r="11"/><path d="M10.5 16.5l4 4 7-8"/>'),
  doc: I('<path d="M8 4h13l5 5v19H8z"/><path d="M12 14h10M12 19h10M12 24h6"/>'),
  search: I('<circle cx="14" cy="14" r="9"/><path d="M21 21l7 7"/>'),
  clip: I('<path d="M22 11l-10 11a3.5 3.5 0 005 5l11-12a6 6 0 00-8.5-8.5L7 19.500a8.500 8.500 0 0012 12"/>', '0 0 36 36'),
  pdf: I('<path d="M8 3h12l6 6v20H8z"/><path d="M13 22c4-3 6-8 5-11-1-2-2 0-2 3 0 4 4 7 8 7-4 1-9 1-11 1z"/>'),
  room: I('<path d="M5 4h12v24H5z"/><path d="M17 8h6v20M12 16h1"/><path d="M20 20h8M25 17l3 3-3 3"/>'),
  calendar: I('<rect x="5" y="7" width="22" height="20" rx="2.500"/><path d="M5 13h22M11 4v5M21 4v5"/>'),
  subject: I('<path d="M6 5h16a2 2 0 012 2v19H8a2 2 0 01-2-2z"/><path d="M6 24h18"/><path d="M10 13l2-5 2 5M10.800 11.500h2.400M16 8h2.500a1.500 1.500 0 010 3H16zM16 11h3a1.500 1.500 0 010 3h-3z" stroke-width="1"/>'),
  exam: I('<rect x="9" y="3" width="17" height="21" rx="2"/><path d="M6 8v18a2 2 0 002 2h14"/><path d="M13 9h9M13 14h9M13 19h9"/>'),
  contact: I('<rect x="4" y="4" width="22" height="22" rx="2"/><path d="M8 10h14M8 15h5M8 19h5"/><circle cx="21" cy="21" r="3"/><path d="M16 29c0-3 2-5 5-5s6 2 6 5"/>'),
  termine: I('<path d="M6 5h16v8M6 5v22h9M10 10h8M10 15h5M10 20h4"/><path d="M17 22l7-3 7 3-7 3zM20 24v3c2 2 6 2 8 0v-3"/>'),
  absence: I('<rect x="4" y="6" width="21" height="20" rx="2"/><path d="M4 12h21M10 3v5M19 3v5"/><circle cx="24" cy="24" r="6"/><path d="M24 22v5M24 20.500v.5"/>'),
  starBox: I('<rect x="4" y="4" width="24" height="24" rx="3"/><path d="M16 9l2 4.500 5 .5-3.700 3.300 1.200 5-4.500-2.800-4.500 2.800 1.200-5L9 14l5-.5z"/>'),
  logout: I('<path d="M6 4h12v24H6z"/><path d="M12 15.500h1M18 15h10M24 11l4 4-4 4"/>'),
  headset: I('<path d="M6 17v-3a10 10 0 0120 0v3"/><rect x="4" y="16" width="5" height="8" rx="2"/><rect x="23" y="16" width="5" height="8" rx="2"/><path d="M25 24c0 3-3 4-7 4"/>'),
  news: I('<rect x="4" y="5" width="24" height="22" rx="3"/><path d="M4 11h24M12 11v16"/><rect x="15" y="14" width="10" height="4"/>'),
  jobs: I('<rect x="6" y="4" width="20" height="24" rx="3"/><circle cx="16" cy="13" r="4"/><path d="M9 25c0-4 3-6 7-6s7 2 7 6"/>'),
  lock: I('<rect x="7" y="13" width="18" height="15" rx="3"/><path d="M11 13V9a5 5 0 0110 0v4"/><circle cx="16" cy="21" r="2"/>'),
  oss: I('<path d="M5 26V16a11 11 0 0122 0v10"/><path d="M11 26c0-3 2-5 5-5s5 2 5 5"/><circle cx="16" cy="17" r="3"/>'),
  kebab: '<svg viewBox="0 0 32 32"><circle cx="16" cy="7" r="2.200"/><circle cx="16" cy="16" r="2.200"/><circle cx="16" cy="25" r="2.200"/></svg>',
  calSearch: I('<rect x="4" y="6" width="20" height="19" rx="2"/><path d="M4 12h20M10 3v5M18 3v5"/><circle cx="22" cy="22" r="5"/><path d="M26 26l4 4"/>'),
  vDay: I('<rect x="5" y="5" width="22" height="22" rx="2"/>'),
  v2: I('<rect x="5" y="5" width="22" height="22" rx="2"/><path d="M16 5v22"/>'),
  v3: I('<rect x="5" y="5" width="22" height="22" rx="2"/><path d="M12.500 5v22M19.500 5v22"/>'),
  vWeek: I('<rect x="5" y="5" width="22" height="22" rx="2"/><path d="M9 5v22M13 5v22M17 5v22M21 5v22"/>'),
  help: I('<circle cx="16" cy="16" r="12"/><path d="M12 12.500a4 4 0 117 2.500c-1.500 1-3 2-3 4M16 22.500v.5"/>'),
  tick: I('<path d="M4 17l8 8L28 7"/>'),
  close: I('<path d="M7 7l18 18M25 7L7 25"/>'),
  eye: I('<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M16 8C9.500 8 5 13.500 3.500 16 5 18.500 9.500 24 16 24s11-5.500 12.500-8C27 13.500 22.500 8 16 8zm0 13.500a5.500 5.500 0 110-11 5.500 5.500 0 010 11zM16 13a3 3 0 100 6 3 3 0 000-6z"/>'),
  calStar: I('<rect x="5" y="6" width="22" height="21" rx="2.500"/><path d="M5 12h22M11 3v5M21 3v5"/><path d="M16 15l1.400 3 3.300.4-2.400 2.300.6 3.300-2.900-1.600-2.900 1.600.6-3.300-2.400-2.300 3.300-.4z"/>'),
  classes: I('<circle cx="9" cy="8" r="3"/><path d="M4 25v-8a5 5 0 015-5M14 4h12v10H14z"/><path d="M17 11V8M20 11V6M23 11V9"/><circle cx="12" cy="24" r="2.500"/><circle cx="19" cy="24" r="2.500"/><circle cx="26" cy="24" r="2.500"/>'),
  students: I('<circle cx="11" cy="10" r="4"/><path d="M3 26c0-5 3.500-8 8-8s8 3 8 8"/><circle cx="22" cy="11" r="3.500"/><path d="M22 18c4 0 7 2.500 7 7"/>'),
  lockRound: I('<path d="M11 12V9a5 5 0 0110 0v3"/><circle cx="16" cy="20" r="8"/><circle cx="16" cy="20" r="2.200"/>'),
  trash: I('<path d="M6 8h20M12 8V5h8v3M9 8l1 19h12l1-19M14 13v10M18 13v10"/>'),
  searchX: I('<circle cx="14" cy="14" r="9"/><path d="M21 21l7 7M10.500 10.500l7 7M17.500 10.500l-7 7"/>'),
  star: I('<path d="M16 4l3.600 7.600 8.400 1-6.200 5.800 1.700 8.300L16 22.500 8.500 26.700l1.700-8.300L4 12.600l8.400-1z"/>'),
  edit: I('<path d="M5 27l1.500-6L21 6.500a2.800 2.800 0 014 4L10.500 25z"/><path d="M18.500 9l4.500 4.500"/>'),
  undo: I('<path d="M8 12h12a7 7 0 010 14H11M8 12l5-5M8 12l5 5"/>'),
};
const ic = (n, cls = '') => `<span class="${cls}" style="display:contents">${ICON[n]}</span>`;

/* --------------------------------------------------------------- helpers */
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtDay = d => `${DOW[d.getDay()]}. ${pad(d.getDate())}. ${MON[d.getMonth()]}`;
const fmtShort = d => `${d.getDate()}. ${MON[d.getMonth()]}`;
const fmtMsgDate = d => `${d.getDate()}.${MON_SHORT[d.getMonth()]}`;
function fmtRange(a, b) {
  const y = d => String(d.getFullYear()).slice(2);
  if (a.getFullYear() !== b.getFullYear() || Math.abs(b - a) > 300 * 864e5 && false) return `${fmtShort(a)} ${y(a)} - ${fmtShort(b)} ${y(b)}`;
  if (a.getMonth() === b.getMonth()) return `${pad(a.getDate())}. - ${pad(b.getDate())}. ${MON[a.getMonth()]}`;
  return `${pad(a.getDate())}. ${MON[a.getMonth()]} - ${pad(b.getDate())}. ${MON[b.getMonth()]}`;
}
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; $app.appendChild(t);
  setTimeout(() => t.remove(), 2300);
}
window.toast = toast;
const store = {
  get(k, d) { try { const v = localStorage.getItem('wu.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('wu.' + k, JSON.stringify(v)); } catch { /* ignore */ } },
  del(k) { try { localStorage.removeItem('wu.' + k); } catch { /* ignore */ } },
};

/* ------------------------------------------------------------------ state */
const S = {
  info: null, mode: 'demo',
  ttMode: store.get('ttMode', 'week'), ttAnchor: new Date(),
  examFilter: store.get('examFilter', 'year'), absFilter: store.get('absFilter', 'default'),
  weekCache: {}, grid: null,
};
function applyTheme() {
  const t = store.get('theme', 'system');
  const dark = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = dark ? '#000000' : '#f6f7f9';
}
applyTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

/* ---- profiles & session ---- */
const profiles = () => store.get('profiles', []);
const saveProfiles = p => store.set('profiles', p);
const OWN = { own: true, id: 'own' };

// sign in (demo or real) and make it the active profile
async function startSession(cred) {
  if (cred.host === 'demo') {
    window.Provider = Demo; S.mode = 'demo'; S.info = await Demo.init(); store.set('session', { kind: 'demo' });
  } else {
    await Untis.login(cred); window.Provider = Untis; S.mode = 'untis'; S.info = await Untis.init();
    store.set('session', { kind: 'untis', s: Untis.s });
  }
  S.weekCache = {}; S.grid = null; S.ttRes = null;
  const id = `${cred.host}|${cred.school}|${cred.user}`, list = profiles().filter(p => p.id !== id);
  list.unshift({ id, kind: cred.host === 'demo' ? 'demo' : 'untis', name: S.info.profile.name, user: cred.user, host: cred.host, school: cred.school,
    schoolName: cred.schoolName || S.info.school, password: cred.password });
  saveProfiles(list); store.set('active', id);
}
// "Abmelden": keep the profile in the list but forget the password (lock icon)
function signOut() {
  const list = profiles(), r = list.find(p => p.id === store.get('active'));
  if (r) { delete r.password; saveProfiles(list); }
  store.del('session'); store.del('active'); S.info = null; S.weekCache = {}; S.grid = null; S.ttRes = null;
  location.replace('#/login');
}
function deleteProfile(id) {
  saveProfiles(profiles().filter(p => p.id !== id));
  if (store.get('active') === id) { store.del('session'); store.del('active'); S.info = null; S.weekCache = {}; S.grid = null; S.ttRes = null; }
}

async function boot() {
  const qp = new URLSearchParams(location.search);
  if (qp.get('theme')) { store.set('theme', qp.get('theme')); applyTheme(); }
  if (qp.get('date')) S.ttAnchor = parseISO(qp.get('date'));
  if (qp.has('admin')) store.set('admin', qp.get('admin') !== '0');
  if (qp.has('pend')) L.pending = { displayName: 'Demo-Gymnasium', host: 'demo', loginName: 'demo', user: qp.get('pend') };
  if (qp.has('seed')) store.set('profiles', [{ id: 'x|x|m', kind: 'untis', name: 'Mustermann Max', user: 'max.mustermann', host: 'x', school: 'x', schoolName: 'Demo-Gymnasium' }]);
  let saved = store.get('session', null);
  if (qp.has('demo')) saved = { kind: 'demo' };
  if (saved?.kind === 'untis') {
    try { Untis.restore(saved.s); window.Provider = Untis; S.mode = 'untis'; S.info = await Untis.init(); store.set('session', { kind: 'untis', s: Untis.s }); }
    catch { store.del('session'); }
  } else if (saved?.kind === 'demo') { window.Provider = Demo; S.mode = 'demo'; S.info = await Demo.init(); }
  if (S.info && qp.get('open')) {
    const [d, t] = qp.get('open').split(',');
    const wk = await loadWeek(mondayOf(parseISO(d)), OWN); S.lesson = wk.find(l => l.date === d && l.start === t);
    S.lessonGroup = wk.filter(x => x.date === d && mins(x.start) < mins(S.lesson.end) && mins(x.end) > mins(S.lesson.start));
    if (!location.hash.startsWith('#/lesson')) location.hash = '#/lesson';
  }
  if (!S.info) { if (!location.hash.startsWith('#/login')) location.replace('#/login'); }
  else if (!location.hash || location.hash.startsWith('#/login')) location.replace('#/start');
  route();
  setupBackButton();
  hideSplash();
}

// the native launch screen stays up until the first screen is drawn (plus a safety timeout)
function hideSplash() {
  const sp = window.Capacitor?.Plugins?.SplashScreen; if (!sp) return;
  requestAnimationFrame(() => setTimeout(() => sp.hide({ fadeOutDuration: 200 }).catch?.(() => {}), 80));
}
setTimeout(hideSplash, 6000);

// Android back button: close popups first, then go back; from the start tab leave the app
function setupBackButton() {
  const App = window.Capacitor?.Plugins?.App; if (!App) return;
  App.addListener('backButton', () => {
    const ov = $app.querySelector('.overlay'); if (ov) { ov.remove(); return; }
    const h = location.hash || '#/start';
    if (h === '#/start' || (h === '#/login' && !S.info)) return App.exitApp();
    if (['#/timetable', '#/messages', '#/profile'].includes(h)) { location.replace('#/start'); return; }
    if (history.length > 1) history.back(); else location.replace(S.info ? '#/start' : '#/login');
  });
}

/* ----------------------------------------------------------------- router */
const TABS = [['start', 'Start', 'school'], ['timetable', 'Stundenplan', 'cal19'], ['messages', 'Mitteilungen', 'mail'], ['profile', 'Profil', 'person']];
window.addEventListener('hashchange', route);

function route() {
  const h = (location.hash || '#/start').slice(2).split('/');
  const [a, b] = h;
  if (!S.info && a !== 'login') { location.replace('#/login'); return; }
  switch (a) {
    case 'login': return viewLogin(b);
    case 'ttselect': return viewTtSelect(b);
    case 'lesson': return b === 'edit' ? viewLessonEdit() : viewLesson();
    case 'start': return viewStart();
    case 'timetable': return viewTimetable();
    case 'messages': return b ? viewMessage(Number(b) || b) : viewMessages();
    case 'profile':
      if (b === 'contact') return viewContact();
      if (b === 'about') return viewAbout();
      return viewProfile();
    case 'appointments': return b === 'filter' ? viewFilter('exam') : viewExams();
    case 'absences': return b === 'filter' ? viewFilter('abs') : viewAbsences();
    default: location.replace('#/start');
  }
}

function screenWithTabs(active, inner) {
  $app.innerHTML = `<div class="screen">${inner}
    <nav class="tabbar">${TABS.map(([k, l, i]) => `
      <a class="tab ${k === active ? 'active' : ''}" href="#/${k}" data-k="${k}">
        <span class="ic">${ICON[i]}${k === 'start' ? '<span class="badge">1</span>' : ''}${k === 'messages' && S.info.unread ? `<span class="badge" style="left:17px">${S.info.unread}</span>` : ''}</span>${l}</a>`).join('')}
    </nav></div>`;
  // switching tabs does not add history entries (so "back" goes to the previous page, not the previous tab)
  $app.querySelectorAll('.tab').forEach(t => t.addEventListener('click', e => {
    e.preventDefault(); const h = '#/' + t.dataset.k; if (location.hash !== h) location.replace(h);
  }));
  return $app.querySelector('.screen');
}
// login and timetable-chooser screens have a plain white page in light mode
function screenPlain(inner) { $app.innerHTML = `<div class="screen ${location.hash.startsWith("#/login") || location.hash.startsWith("#/ttselect") ? 'white' : ''}">${inner}</div>`; return $app.querySelector('.screen'); }
// big: true|'big' = bold 17px title, 'med' = 14px medium, '' = 14px regular
const navHead = (title, sub, extra = '', big = false, icon = 'chevL') => `<div class="nav-head"><button class="back" aria-label="Zurück">${ICON[icon]}</button>
  <div class="t ${big === true ? 'big' : big}"><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</div>${extra}</div>`;
function wireBack(root) { root.querySelector('.back')?.addEventListener('click', () => history.length > 1 ? history.back() : location.replace('#/start')); }

// modal dialog (delete profile)
function showDialog(root, { title, text, ok, cancel = 'Abbrechen', danger = true }) {
  return new Promise(res => {
    const ov = document.createElement('div'); ov.className = 'overlay dim';
    ov.innerHTML = `<div class="dialog"><h4>${esc(title)}</h4><p>${esc(text)}</p><div class="btns"><button data-r="0">${esc(cancel)}</button><button data-r="1" class="${danger ? 'danger' : ''}">${esc(ok)}</button></div></div>`;
    root.appendChild(ov);
    ov.addEventListener('click', e => { const r = e.target.closest('[data-r]'); if (r || e.target === ov) { ov.remove(); res(r?.dataset.r === '1'); } });
  });
}
const SPIN = '<div class="spin"><i class="spinner"></i></div>';

/* ------------------------------------------------------------------ login */
const L = { query: '', edit: false, pending: null, token: 0 };
const emptyState = (icon, title, text) => `<div class="empty-state"><div class="circ">${ICON[icon]}</div><b>${esc(title)}</b><p>${esc(text)}</p></div>`;

function viewLogin(sub) {
  if (sub === 'school') return viewLoginCreds();
  if (sub === 'manual') return viewLoginManual();
  const list = profiles();
  const root = screenPlain(`${navHead('Anmelden', '', list.length ? `<button class="act txt" id="edit">${L.edit ? 'Fertig' : 'Bearbeiten'}</button>` : '', 'med')}
    <div class="search" style="margin:14px 14px 0">${ICON.search}<input id="q" placeholder="Schule suchen" value="${esc(L.query)}" autocapitalize="none" autocomplete="off"><button class="clr" id="clr" ${L.query ? '' : 'hidden'}>${ICON.close}</button></div>
    <div class="scroll" id="res" style="margin-top:6px"></div>
    <div class="bottom-btns"><button class="dbtn" id="qr">Anmelden mit QR-Code</button><button class="dbtn" id="man">Manuelle Anmeldung</button></div>`);
  wireBack(root);
  const res = root.querySelector('#res'), q = root.querySelector('#q'), clr = root.querySelector('#clr');

  const profileRows = () => profiles().map(r => `<div class="prow ${L.edit ? 'editing' : ''}" data-id="${esc(r.id)}"><div class="avatar">${esc((r.name || '?')[0].toUpperCase())}</div>
      <div class="tx"><b>${esc(r.name)}</b><i>${esc(r.schoolName)}</i></div>${!r.password && r.kind !== 'demo' ? `<span class="lk">${ICON.lockRound}</span>` : ''}${L.edit ? '' : ICON.chevR.replace('<svg', '<svg class="chev"')}
      ${L.edit ? `<button class="trash" data-del="${esc(r.id)}">${ICON.trash}</button>` : ''}</div>`).join('');

  const draw = async () => {
    const text = L.query.trim(), tok = ++L.token;
    clr.hidden = !L.query;
    if (!text) {
      res.innerHTML = profiles().length ? profileRows() : emptyState('search', 'Suchen Sie Ihre Schule', 'Schulname oder Adresse eingeben');
      res.querySelectorAll('.prow').forEach(row => row.addEventListener('click', async e => {
        const r = profiles().find(p => p.id === row.dataset.id); if (!r) return;
        if (e.target.closest('[data-del]')) {
          if (await showDialog(root, { title: `Profil löschen "${r.name}"?`, text: 'Lokale Einstellungen werden gelöscht', ok: 'Löschen' })) { deleteProfile(r.id); if (!profiles().length) L.edit = false; viewLogin(); }
          return;
        }
        if (L.edit) return;
        if (r.password || r.kind === 'demo') {
          res.innerHTML = SPIN;
          try { await startSession({ host: r.host, school: r.school, user: r.user, password: r.password, schoolName: r.schoolName }); location.replace('#/start'); return; } catch { /* fall through to password entry */ }
        }
        L.pending = { displayName: r.schoolName, host: r.host, loginName: r.school, user: r.user }; location.hash = '#/login/school';
      }));
      return;
    }
    res.innerHTML = SPIN;
    let r;
    if (/demo/i.test(text)) r = { state: 'ok', schools: DEMO.schools };
    else r = await Schools.search(text);
    if (tok !== L.token) return;
    if (r.state === 'many') res.innerHTML = emptyState('searchX', 'Zu viele Ergebnisse', 'Bitte verfeinern Sie die Suche');
    else if (r.state === 'none') res.innerHTML = emptyState('searchX', 'Keine Ergebnisse', 'Bitte überprüfen Sie Ihre Eingabe');
    else if (r.state === 'error') res.innerHTML = emptyState('searchX', 'Keine Verbindung', 'Bitte überprüfen Sie Ihre Internetverbindung');
    else {
      res.innerHTML = r.schools.map((s, i) => `<button class="sres" data-i="${i}"><span class="tx"><b>${esc(s.displayName)}</b><i>${esc(s.address)}</i></span>${ICON.chevR.replace('<svg', '<svg class="chev"')}</button>`).join('');
      res.querySelectorAll('.sres').forEach(b => b.addEventListener('click', () => { L.pending = r.schools[b.dataset.i]; location.hash = '#/login/school'; }));
    }
  };
  let timer; q.addEventListener('input', () => { L.query = q.value; clearTimeout(timer); timer = setTimeout(draw, L.query.trim() ? 350 : 0); clr.hidden = !L.query; });
  clr.addEventListener('click', () => { L.query = ''; q.value = ''; q.focus(); draw(); });
  root.querySelector('#edit')?.addEventListener('click', () => { L.edit = !L.edit; viewLogin(); });
  root.querySelector('#qr').addEventListener('click', () => toast('Anmeldung per QR-Code ist nicht verfügbar'));
  root.querySelector('#man').addEventListener('click', () => { location.hash = '#/login/manual'; });
  draw();
}

// floating-label text field helper
const flField = (id, label, { type = 'text', value = '', extra = '' } = {}) => `<div class="fl ${value ? 'has' : ''}" id="f-${id}"><label>${label}</label>
  <input id="${id}" type="${type}" value="${esc(value)}" autocapitalize="none" autocomplete="off" spellcheck="false">${extra}</div>`;
function wireFields(root) {
  root.querySelectorAll('.fl').forEach(f => {
    const i = f.querySelector('input'), x = f.querySelector('.x');
    const upd = () => { f.classList.toggle('has', !!i.value); if (x) x.hidden = !i.value || !f.classList.contains('focus'); };
    i.addEventListener('focus', () => { f.classList.add('focus'); upd(); });
    i.addEventListener('blur', () => { f.classList.remove('focus'); upd(); });
    i.addEventListener('input', upd);
    x?.addEventListener('mousedown', e => e.preventDefault());
    x?.addEventListener('click', () => { i.value = ''; i.dispatchEvent(new Event('input')); i.focus(); });
    upd();
  });
}

function viewLoginCreds() {
  const p = L.pending; if (!p) { location.replace('#/login'); return; }
  const root = screenPlain(`${navHead(p.displayName, '', '', false)}
    <div class="scroll"><div style="height:7px"></div>
    ${flField('user', 'Benutzername', { value: p.user || '', extra: `<button class="x" hidden>${ICON.close}</button>` })}
    ${flField('pw', 'Passwort', { type: 'password', extra: `<button class="eye" type="button">${ICON.eye}</button>` })}
    <div class="err" id="err" hidden></div>
    <button class="pbtn off" id="go" style="margin-top:27px">Anmelden</button>
    <a class="link" id="forgot" style="margin-top:22px">Passwort vergessen?</a>
    <div class="oder" style="margin-top:28px">ODER</div>
    <button class="obtn" id="sso" style="margin-top:21px">Mit SSO anmelden</button></div>`);
  wireBack(root); wireFields(root);
  const user = root.querySelector('#user'), pw = root.querySelector('#pw'), go = root.querySelector('#go'), err = root.querySelector('#err');
  const upd = () => go.classList.toggle('off', !(user.value.trim() && pw.value));
  user.addEventListener('input', upd); pw.addEventListener('input', upd); upd();
  (p.user ? pw : user).focus();
  root.querySelector('.eye').addEventListener('click', () => { pw.type = pw.type === 'password' ? 'text' : 'password'; });
  root.querySelector('#forgot').addEventListener('click', () => window.open(p.host === 'demo' ? 'https://www.untis.at' : `https://${p.host}/WebUntis/?school=${encodeURIComponent(p.loginName)}#/basic/forgotpassword`, '_blank'));
  root.querySelector('#sso').addEventListener('click', () => toast('SSO-Anmeldung ist nicht verfügbar'));
  const submit = async () => {
    if (go.classList.contains('off') || go.dataset.busy) return;
    go.dataset.busy = 1; err.hidden = true; go.innerHTML = '<i class="spinner" style="width:20px;height:20px;border-width:3px;display:inline-block;vertical-align:middle;border-top-color:#fff;border-right-color:#fff"></i>';
    try {
      await startSession({ host: p.host, school: p.loginName, user: user.value.trim(), password: pw.value, schoolName: p.displayName });
      L.query = ''; L.pending = null; location.replace('#/start');
    } catch (ex) { err.textContent = /Anmeld|password|credential|-8504/i.test(ex.message || '') ? 'Benutzername oder Passwort falsch' : (ex.message || 'Anmeldung fehlgeschlagen'); err.hidden = false; go.textContent = 'Anmelden'; delete go.dataset.busy; }
  };
  go.addEventListener('click', submit);
  pw.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
}

function viewLoginManual() {
  const root = screenPlain(`${navHead('Manuelle Anmeldung', '', '', 'med')}
    <div class="scroll"><div style="height:7px"></div>
    ${flField('host', 'Server (z. B. xyz.webuntis.com)')}${flField('school', 'Schule')}
    ${flField('user', 'Benutzername')}${flField('pw', 'Passwort', { type: 'password', extra: `<button class="eye" type="button">${ICON.eye}</button>` })}
    <div class="err" id="err" hidden></div><button class="pbtn off" id="go" style="margin-top:27px">Anmelden</button></div>`);
  wireBack(root); wireFields(root);
  const g = id => root.querySelector('#' + id), go = g('go'), err = g('err');
  const upd = () => go.classList.toggle('off', !(g('host').value.trim() && g('school').value.trim() && g('user').value.trim() && g('pw').value));
  root.querySelectorAll('input').forEach(i => i.addEventListener('input', upd));
  g('f-pw').querySelector('.eye').addEventListener('click', () => { g('pw').type = g('pw').type === 'password' ? 'text' : 'password'; });
  go.addEventListener('click', async () => {
    if (go.classList.contains('off')) return;
    err.hidden = true; go.textContent = 'Anmelden …';
    try {
      const host = g('host').value.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      await startSession({ host, school: g('school').value.trim(), user: g('user').value.trim(), password: g('pw').value, schoolName: g('school').value.trim() });
      location.replace('#/start');
    } catch (ex) { err.textContent = ex.message || 'Anmeldung fehlgeschlagen'; err.hidden = false; go.textContent = 'Anmelden'; }
  });
}

/* ------------------------------------------------------- timetable helpers */
async function loadWeek(monday, res = S.ttRes || OWN) {
  const k = `${res.id}|${iso(monday)}`;
  if (!S.weekCache[k]) S.weekCache[k] = Provider.week(monday, res).then(applyOverrides).catch(e => { delete S.weekCache[k]; throw e; });
  return S.weekCache[k];
}

/* ---- admin mode: local edits of single lessons (never sent to WebUntis) ---- */
const lessonKey = l => `${l.date}|${l.start}|${l.subject}`;
function applyOverrides(list) {
  const ov = store.get('overrides', {});
  return list.map(l => { const base = { ...l, _key: lessonKey(l) }; return ov[base._key] ? applyOv(base, ov[base._key]) : base; });
}
function applyOv(l, o) {
  const r = { ...l, _edited: true, _orig: { room: l.room, subject: l.subject } };
  r.subject = o.subject || l.subject;
  r.teachers = o.teachers ?? l.teachers;
  const newRoom = o.room || l.room, moved = newRoom !== l.room;
  r.room = newRoom; r.old_room = moved ? l.room : ''; r.room_changed = moved;
  r.exam = ''; r.info = '';
  switch (o.type) {
    case 'regular': r.status = 'regular'; r.room_changed = false; r.old_room = ''; break;
    case 'cancelled': r.status = 'cancelled'; r.room = l.room; r.room_changed = false; r.old_room = ''; break;
    case 'room': r.status = 'room'; r.room_changed = true; r.old_room = l.room; break;
    case 'changed': r.status = 'changed'; r.info = o.info || ''; break;
    case 'exam': r.status = 'changed'; r.exam = o.exam || 'Prüfung'; r.info = o.info || ''; break;
  }
  return r;
}
const isAdmin = () => store.get('admin', false);
async function loadGrid() { return S.grid || (S.grid = await Provider.grid()); }
const nowMin = () => { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); };
function dayEnded(date, lessons) {
  const today = iso(new Date());
  if (date < today) return true;
  if (date > today) return false;
  const ends = lessons.filter(l => l.date === date).map(l => mins(l.end));
  return ends.length ? nowMin() > Math.max(...ends) : true;
}
const barColor = l => l.bar || `hsl(${l.hue ?? 200} ${l.sat ?? 60}% 62%)`;
const lessonLines = (l) => {
  const room = esc(l.room || '');
  const roomHtml = (l.status === 'room' || l.room_changed) ? `<span class="chip">${room}</span>` : room;
  return { roomHtml, subject: esc(l.subject || ''), classes: esc(l.classes || '') };
};

/* ------------------------------------------------------------------ start */
async function viewStart() {
  const root = screenWithTabs('start', `<div class="scroll"><div class="page-title">${esc(S.info.school)}</div>
    <div class="cards" id="cards"><div class="spin"><i class="spinner"></i></div></div></div>`);
  const cards = root.querySelector('#cards');
  const [ann, today] = await Promise.all([Provider.announcement().catch(() => null), todayData().catch(() => null)]);
  if (!$app.contains(cards)) return;
  let html = '';
  if (ann) html += `<div class="card news"><div class="head">${ICON.megaphone}${ann.isNew ? '<span class="neu">neu</span>' : ''}</div>
    <div class="body"><b>${esc(ann.title)}</b><p>${esc(ann.text)}</p></div></div>`;
  if (today) {
    const { date, lessons } = today, d = parseISO(date), td = new Date(); td.setHours(0, 0, 0, 0);
    const diff = Math.round((d - td) / 864e5);
    const label = diff === 0 ? 'Heute' : diff === 1 ? 'Morgen' : DOW[d.getDay()] + '.';
    const nm = nowMin();
    html += `<div class="card today"><div class="date"><div class="dow">${DOW[d.getDay()]}</div><div class="day">${d.getDate()}</div><div class="mon">${MON[d.getMonth()].replace('.', '')}</div></div>
      <div class="list"><h3>${label} | Mein Stundenplan</h3><div class="sb"></div><div class="items">
      ${lessons.map(l => {
        const cur = diff === 0 && nm >= mins(l.start) && nm < mins(l.end);
        const x = lessonLines(l);
        return `<div class="titem ${l.status} ${cur ? 'cur' : ''}" style="--bar:${barColor(l)}"><i class="bar"></i>
          <div class="txt"><b>${x.roomHtml}</b><br>${x.subject}</div><span class="t s">${l.start}</span><span class="t e">${l.end}</span></div>`;
      }).join('') || '<div class="empty" style="padding:30px 0">Kein Unterricht</div>'}</div></div></div>`;
  }
  html += `<div class="card"><a class="list-row" href="#/appointments"><span class="ico">${ICON.termine}</span><span class="lbl">Meine Termine</span>${ICON.chevR.replace('<svg', '<svg class="chev"')}</a>
    <a class="list-row" href="#/absences"><span class="ico">${ICON.absence}</span><span class="lbl">Meine Abwesenheiten</span>${ICON.chevR.replace('<svg', '<svg class="chev"')}</a></div>`;
  cards.innerHTML = html;
}
// first day (today or later) that still has lessons to come
async function todayData() {
  let d = new Date(); d.setHours(0, 0, 0, 0);
  const holi = new Set(await Provider.holidays().catch(() => []));
  for (let i = 0; i < 21; i++, d = addDays(d, 1)) {
    if (d.getDay() === 0 || d.getDay() === 6 || holi.has(iso(d))) continue;
    const all = await loadWeek(mondayOf(d), OWN);
    const ls = all.filter(l => l.date === iso(d)).sort((a, b) => mins(a.start) - mins(b.start));
    if (ls.length && !dayEnded(iso(d), all)) return { date: iso(d), lessons: ls };
  }
  return null;
}

/* -------------------------------------------------------------- timetable */
const TT_MODES = { day: 1, '2': 2, '3': 3, week: 5 };
const PPM_MIN = 0.5, PPM_MAX = 3.2, TT_TOP = 10;   // PPM = pixels per minute (vertical zoom)
const isWorkday = d => d.getDay() !== 0 && d.getDay() !== 6;
const T = {};   // state of the visible timetable

// the n working days of a page, starting at `start`
function ttDays(start, n) { const out = []; for (let d = new Date(start); out.length < n; d = addDays(d, 1)) if (isWorkday(d)) out.push(new Date(d)); return out; }
function ttStartOf(anchor) {
  const s = S.ttMode === 'week' ? mondayOf(anchor) : new Date(anchor); s.setHours(0, 0, 0, 0);
  if (S.ttMode !== 'week') while (!isWorkday(s)) s.setDate(s.getDate() + 1);
  return s;
}
// start of the previous (-1) / next (+1) page
function ttNeighbour(start, dir) {
  if (S.ttMode === 'week') return addDays(start, 7 * dir);
  let s = new Date(start);
  for (let i = 0; i < TT_MODES[S.ttMode]; i++) { do { s = addDays(s, dir); } while (!isWorkday(s)); }
  return s;
}
async function ttPageData(start) {
  const days = ttDays(start, T.n);
  const mondays = [...new Set(days.map(d => iso(mondayOf(d))))];
  let locked = false;
  const parts = await Promise.all(mondays.map(m => loadWeek(parseISO(m), S.ttRes || OWN).catch(e => { if (e.code === 'LOCKED') { locked = true; return []; } throw e; })));
  return { days, lessons: parts.flat(), locked };
}
const ppmY = m => `calc(var(--ppm) * ${m - T.s0}px + ${TT_TOP}px)`;
const ppmH = min => `calc(var(--ppm) * ${min}px)`;
const lessonIsFuture = l => { const t = iso(new Date()); return l.date > t || (l.date === t && mins(l.end) > nowMin()); };

function ttHeadHtml(start) {
  const todayIso = iso(new Date());
  return ttDays(start, T.n).map(d => `<div class="d ${iso(d) === todayIso ? 'is-today' : ''}"><span>${DOW[d.getDay()]}</span><b>${d.getDate()}</b></div>`).join('');
}
function ttGridHtml({ days, lessons, locked }) {
  if (locked) return `<div class="locked"><div class="in"><div class="circ">${ICON.lock}</div><b>Anzeige gesperrt</b><p>Die Stundenplananzeige wurde von deiner Administration eingeschränkt</p></div></div>`;
  const n = days.length, { grid, e1 } = T, todayIso = iso(new Date());
  let h = '';
  const lines = new Set(); grid.forEach(([a, b]) => { lines.add(mins(a)); lines.add(mins(b)); });
  lines.forEach(m => { h += `<div class="tt-line" style="top:${ppmY(m)}"></div>`; });
  days.forEach((d, di) => {
    const dIso = iso(d);
    if (T.holi.has(dIso)) {
      h += `<div class="hol" style="top:${TT_TOP - 1}px;height:calc(var(--ppm) * ${e1 - T.s0}px + 4px);left:${100 / n * di}%;width:${100 / n}%">
        <svg viewBox="0 0 16 16" style="width:11px;height:11px;fill:currentColor;stroke:none"><path d="M4 7V5a4 4 0 018 0v2h1v8H3V7zm2 0h4V5a2 2 0 00-4 0z"/></svg>
        <b>Ferien</b><span>${pad(d.getDate())}.${pad(d.getMonth() + 1)}.</span></div>`;
      return;
    }
    const ls = lessons.filter(l => l.date === dIso).sort((a, b) => mins(a.start) - mins(b.start) || mins(b.end) - mins(a.end));
    // lane assignment for lessons that overlap in time (their widths follow `lw`, default: equal)
    const lanes = []; let cluster = [], clusterEnd = -1;
    const flush = () => {
      const nl = Math.max(1, ...cluster.map(c => c.lane + 1));
      const w = Array.from({ length: nl }, (_, i) => cluster.find(c => c.lane === i)?.lw || 1 / nl), sum = w.reduce((a, b) => a + b, 0);
      let x = 0; const left = w.map(v => { const r = x; x += v / sum; return r; });
      cluster.forEach(c => { c.lf = left[c.lane]; c.wf = w[c.lane] / sum; }); cluster = []; lanes.length = 0;
    };
    ls.forEach(l => {
      if (cluster.length && mins(l.start) >= clusterEnd) { flush(); clusterEnd = -1; }
      let lane = lanes.findIndex(end => end <= mins(l.start)); if (lane < 0) { lane = lanes.length; lanes.push(0); }
      lanes[lane] = mins(l.end); l.lane = lane; cluster.push(l); clusterEnd = Math.max(clusterEnd, mins(l.end));
    });
    flush();
    ls.forEach(l => {
      const x = lessonLines(l), id = `${l.date}|${l.start}|${l.subject}|${l.room}`;
      T.byId.set(id, l);
      h += `<div class="les ${l.status} ${lessonIsFuture(l) ? 'future' : ''}" data-id="${esc(id)}" data-date="${l.date}" data-end="${l.end}" style="top:${ppmY(mins(l.start))};height:${ppmH(mins(l.end) - mins(l.start))};left:calc(${(di + l.lf) * 100 / n}% + 1px);width:calc(${l.wf * 100 / n}% - 3px);--bar:${barColor(l)}">
        <i class="bar"></i><div class="l1">${x.roomHtml}</div><div class="l2">${x.subject}</div>${x.classes ? `<div class="l3">${x.classes}</div>` : ''}
        ${l.status === 'changed' || l.info ? '<i class="info">i</i>' : ''}</div>`;
    });
    if (dIso === todayIso) h += `<div class="nowseg" data-now style="left:${100 / n * di}%;width:${100 / n}%"></div>`;
  });
  if (days.some(d => iso(d) === todayIso)) h += '<div class="nowline" data-now></div>';
  return h;
}
// keeps lesson colours ("already over" vs "still to come") and the orange "now" line current
function ttTick() {
  if (!T.root || !$app.contains(T.root)) { clearInterval(T.timer); return; }
  const m = nowMin(), show = m >= T.s0 && m <= T.e1, top = `calc(var(--ppm) * ${m - T.s0}px + ${TT_TOP}px)`;
  T.root.querySelectorAll('[data-now]').forEach(el => { el.style.display = show ? '' : 'none'; el.style.top = top; });
  T.root.querySelectorAll('.les').forEach(el => { const f = lessonIsFuture({ date: el.dataset.date, end: el.dataset.end }); el.classList.toggle('future', f); });
}

// (re)fill one page of the 3-page track for the page starting at `start`
function ttFill(gNode, dNode, start) {
  const key = iso(start);
  gNode.dataset.start = key; dNode.dataset.start = key;
  dNode.innerHTML = ttHeadHtml(start);
  gNode.innerHTML = '';
  return ttPageData(start).then(data => { if (gNode.dataset.start === key) { gNode.innerHTML = ttGridHtml(data); ttTick(); } }).catch(() => {});
}
function ttSetKw(root) {
  const days = ttDays(T.start, T.n);
  root.querySelector('.kw').innerHTML = `<span>KW ${isoWeek(days[0])}</span><b>${MON[days[0].getMonth()]}</b>`;
}

async function viewTimetable() {
  clearInterval(T.timer);
  T.n = TT_MODES[S.ttMode]; T.start = ttStartOf(S.ttAnchor); T.byId = new Map(); T.anim = false;
  T.ppm = Math.min(PPM_MAX, Math.max(PPM_MIN, store.get('ttPpm', 1)));
  const who = S.ttRes ? S.ttRes.name : S.info.profile.name;
  const root = T.root = screenWithTabs('timetable', `<div class="tt-head"><div class="tt-top"><a class="who" href="#/ttselect"><span>${S.grid ? esc(who) : 'Stundenplan auswählen'}</span>${ICON.chevD}</a>
    <button class="kebab" aria-label="Menü">${ICON.kebab}</button></div>
    <div class="tt-days"><div class="kw"></div><div class="dclip"><div class="dtrack"><div class="dpage"></div><div class="dpage"></div><div class="dpage"></div></div></div></div></div>
    <div class="tt-body">${SPIN}</div>`);
  ttSetKw(root);
  wireTTMenu(root);
  const body = root.querySelector('.tt-body');
  try {
    T.grid = await loadGrid(); T.holi = new Set(await Provider.holidays().catch(() => []));
  } catch (e) { body.innerHTML = `<div class="empty">Stundenplan konnte nicht geladen werden.<br>${esc(e.message)}</div>`; return; }
  if (!$app.contains(body)) return;
  T.s0 = mins(T.grid[0][0]); T.e1 = mins(T.grid[T.grid.length - 1][1]);
  root.querySelector('.who span').textContent = who;

  let times = '';
  T.grid.forEach(([a, b], i) => {
    times += `<div class="tt-time" style="top:${ppmY(mins(a))};height:${ppmH(mins(b) - mins(a))}"><span class="a">${a}</span><span class="n">${i + 1}.</span><span class="c">${b}</span></div>`;
  });
  body.innerHTML = `<div class="tt-inner"><div class="tt-times">${times}</div><div class="gclip"><div class="gtrack"><div class="gpage"></div><div class="gpage"></div><div class="gpage"></div></div></div></div>`;
  const inner = body.querySelector('.tt-inner'), gtrack = body.querySelector('.gtrack'), dtrack = root.querySelector('.dtrack');
  const gclip = body.querySelector('.gclip');
  inner.style.height = `calc(var(--ppm) * ${T.e1 - T.s0}px + ${2 * TT_TOP + 8}px)`;
  inner.style.setProperty('--bh', body.clientHeight + 'px');
  const applyPpm = () => { inner.style.setProperty('--ppm', T.ppm); inner.classList.toggle('compact', T.ppm < 0.8); };
  applyPpm();

  const gp = [...gtrack.children], dp = [...dtrack.children];
  // current page first, then its neighbours
  ttFill(gp[1], dp[1], T.start).then(() => { ttFill(gp[0], dp[0], ttNeighbour(T.start, -1)); ttFill(gp[2], dp[2], ttNeighbour(T.start, 1)); });
  T.timer = setInterval(ttTick, 30000);

  /* ----- horizontal swipe with a page that follows the finger ----- */
  const CENTER = 'translate3d(-33.3333%,0,0)';
  const kEff = () => (gclip.getBoundingClientRect().width / gclip.offsetWidth) || 1;
  const setTx = (tx, anim) => {
    for (const t of [gtrack, dtrack]) { t.style.transition = anim ? 'transform .28s cubic-bezier(.22,.8,.3,1)' : 'none'; t.style.transform = tx; }
  };
  const rotate = dir => {
    for (const t of [gtrack, dtrack]) {
      t.style.transition = 'none';
      if (dir > 0) t.appendChild(t.firstElementChild); else t.insertBefore(t.lastElementChild, t.firstElementChild);
      t.style.transform = CENTER;
    }
    T.start = ttNeighbour(T.start, dir); S.ttAnchor = T.start; ttSetKw(root);
    const g = [...gtrack.children], d = [...dtrack.children], i = dir > 0 ? 2 : 0;
    ttFill(g[i], d[i], ttNeighbour(T.start, dir));
  };
  const goPage = dir => {                       // animated page change (swipe, keyboard)
    if (T.anim) return; T.anim = true;
    setTx(dir > 0 ? 'translate3d(-66.6667%,0,0)' : 'translate3d(0,0,0)', true);
    setTimeout(() => { rotate(dir); T.anim = false; }, 290);
  };
  T.goPage = goPage;

  let g = null, pinch = null;
  const dist = ts => Math.hypot(ts[0].clientX - ts[1].clientX, ts[0].clientY - ts[1].clientY);
  const midY = ts => (ts[0].clientY + ts[1].clientY) / 2;
  body.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      if (g?.lock === 'h') setTx(CENTER, true);
      g = null;
      const my = (midY(e.touches) - body.getBoundingClientRect().top) / kEff();
      pinch = { d0: dist(e.touches), ppm0: T.ppm, my, minute: (body.scrollTop + my - TT_TOP) / T.ppm };
    } else if (e.touches.length === 1 && !T.anim && !pinch) {
      const t = e.touches[0]; g = { x: t.clientX, y: t.clientY, lock: null, dx: 0, lastX: t.clientX, lastT: performance.now(), vx: 0 };
    }
  }, { passive: true });
  body.addEventListener('touchmove', e => {
    if (pinch && e.touches.length === 2) {
      if (e.cancelable) e.preventDefault();
      T.ppm = Math.min(PPM_MAX, Math.max(PPM_MIN, pinch.ppm0 * dist(e.touches) / pinch.d0));
      applyPpm();
      body.scrollTop = pinch.minute * T.ppm + TT_TOP - pinch.my;
      return;
    }
    if (!g) return;
    const t = e.touches[0], dx = t.clientX - g.x, dy = t.clientY - g.y;
    if (!g.lock) { if (Math.hypot(dx, dy) < 8) return; g.lock = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'h' : 'v'; }
    if (g.lock !== 'h') return;
    if (e.cancelable) e.preventDefault();
    const now = performance.now(); g.vx = (t.clientX - g.lastX) / Math.max(1, now - g.lastT); g.lastX = t.clientX; g.lastT = now; g.dx = dx;
    setTx(`translate3d(calc(-33.3333% + ${dx / kEff()}px),0,0)`, false);
  }, { passive: false });
  const end = e => {
    if (pinch && e.touches.length < 2) { store.set('ttPpm', +T.ppm.toFixed(3)); pinch = null; }
    if (!g || e.touches.length) return;
    const cur = g; g = null;
    if (cur.lock !== 'h') return;
    const W = gclip.offsetWidth, dx = cur.dx / kEff();
    if (Math.abs(dx) > W * 0.22 || Math.abs(cur.vx) > 0.45) goPage((Math.abs(dx) > 12 ? dx : cur.vx) < 0 ? 1 : -1);
    else setTx(CENTER, true);
  };
  body.addEventListener('touchend', end); body.addEventListener('touchcancel', end);

  // ctrl + wheel (or trackpad pinch) zooms, arrow keys change page (handy in a desktop preview)
  body.addEventListener('wheel', e => {
    if (!e.ctrlKey) return; e.preventDefault();
    const my = (e.clientY - body.getBoundingClientRect().top) / kEff(), minute = (body.scrollTop + my - TT_TOP) / T.ppm;
    T.ppm = Math.min(PPM_MAX, Math.max(PPM_MIN, T.ppm * Math.exp(-e.deltaY * 0.01))); applyPpm();
    body.scrollTop = minute * T.ppm + TT_TOP - my; store.set('ttPpm', +T.ppm.toFixed(3));
  }, { passive: false });
  document.onkeydown = e => { if (location.hash === '#/timetable' && !/INPUT|TEXTAREA/.test(e.target.tagName)) { if (e.key === 'ArrowRight') goPage(1); if (e.key === 'ArrowLeft') goPage(-1); } };

  gtrack.addEventListener('click', e => {
    const el = e.target.closest('.les'); if (!el) return;
    const l = T.byId.get(el.dataset.id); if (!l) return;
    // all lessons that run at the same time (tabs in the detail view)
    S.lessonGroup = [...T.byId.values()].filter(x => x.date === l.date && mins(x.start) < mins(l.end) && mins(x.end) > mins(l.start)).sort((a, b) => a.lane - b.lane);
    S.lesson = l; location.hash = '#/lesson';
  });
  root.querySelector('.kw').addEventListener('click', () => { S.ttAnchor = new Date(); viewTimetable(); });
}

function wireTTMenu(root) {
  root.querySelector('.kebab').addEventListener('click', () => {
    const ov = document.createElement('div'); ov.className = 'overlay';
    const modes = [['day', 'Tag', 'vDay'], ['2', '2 Tage', 'v2'], ['3', '3 Tage', 'v3'], ['week', 'Woche', 'vWeek']];
    ov.innerHTML = `<div class="menu"><button class="it" data-a="goto">Gehe zu Datum ${ICON.calSearch}</button><div class="gap"></div><div class="hd">Ansicht</div>
      ${modes.map(([k, l, i]) => `<button class="it ${S.ttMode === k ? 'chk' : ''}" data-m="${k}">${l}${ICON[i]}</button>`).join('')}
      <div class="gap"></div><button class="it" data-a="help">Hilfe ${ICON.help}</button></div>`;
    root.appendChild(ov);
    ov.addEventListener('click', ev => {
      const b = ev.target.closest('button'); ov.remove(); if (!b) return;
      const days = ttDays(T.start, T.n);
      if (b.dataset.m) {
        S.ttMode = b.dataset.m; store.set('ttMode', S.ttMode);
        S.ttAnchor = days.some(d => iso(d) === iso(new Date())) ? new Date() : days[0]; viewTimetable();
      } else if (b.dataset.a === 'goto') {
        const inp = Object.assign(document.createElement('input'), { type: 'date', value: iso(days[0]) });
        inp.style.cssText = 'position:absolute;opacity:0;pointer-events:none;top:100px;left:50%';
        root.appendChild(inp);
        inp.addEventListener('change', () => { if (inp.value) { S.ttAnchor = parseISO(inp.value); viewTimetable(); } inp.remove(); });
        try { inp.showPicker(); } catch { inp.style.opacity = 1; inp.style.pointerEvents = 'auto'; }
      } else if (b.dataset.a === 'help') window.open('https://help.untis.at', '_blank');
    });
  });
}

/* ---- "Stundenplan auswählen": own timetable, classes, students ---- */
function viewTtSelect(sub) {
  if (sub === 'CLASS' || sub === 'STUDENT') return viewTtList(sub);
  const chev = ICON.chevR.replace('<svg', '<svg class="chev"');
  const root = screenPlain(`<div class="nav-head"><button class="back" aria-label="Schließen">${ICON.close}</button><div class="t big"><b>Stundenplan auswählen</b></div></div>
    <div class="search sq" style="margin-top:17px">${ICON.search}<input id="q" placeholder="Stundenplan suchen" autocomplete="off"><button class="clr" id="clr">${ICON.close}</button></div>
    <div class="scroll"><button class="crow" id="mine" style="margin-top:14px"><span class="avatar">${ICON.calStar}</span><span class="tx"><b style="font-size:17.3px">Mein Stundenplan</b></span></button>
      <div class="grp-lbl" style="margin-top:12px">Stundenpläne</div>
      <button class="crow big" data-t="CLASS" style="height:53px"><span class="cico">${ICON.classes}</span><span class="tx"><b>Klassen</b></span>${chev}</button>
      <button class="crow big" data-t="STUDENT" style="height:53px"><span class="cico">${ICON.students}</span><span class="tx"><b>Schüler*innen</b></span>${chev}</button></div>`);
  wireBack(root);
  root.querySelector('#mine').addEventListener('click', () => { S.ttRes = null; location.replace('#/timetable'); });
  root.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => { location.hash = '#/ttselect/' + b.dataset.t; }));
  root.querySelector('#clr').addEventListener('click', () => { root.querySelector('#q').value = ''; });
  root.querySelector('#q').addEventListener('keydown', e => { if (e.key === 'Enter') toast('Wähle Klassen oder Schüler*innen'); });
}
async function viewTtList(type) {
  const isClass = type === 'CLASS', favs = store.get('favs', []);
  const root = screenPlain(`${navHead(isClass ? 'Klassen' : 'Schüler*innen', '', '', true)}
    <div class="search sq" style="margin-top:17px">${ICON.search}<input id="q" placeholder="Stundenplan suchen" autocomplete="off"><button class="clr" id="clr">${ICON.close}</button></div>
    <div class="scroll" id="l">${SPIN}</div>`);
  wireBack(root);
  let items = []; try { items = await Provider.resources(type); } catch (e) { root.querySelector('#l').innerHTML = `<div class="empty">Liste nicht verfügbar</div>`; return; }
  const q = root.querySelector('#q');
  const draw = () => {
    const f = items.filter(i => i.name.toLowerCase().includes(q.value.trim().toLowerCase()));
    let html = '', last = '';
    f.forEach((it, idx) => {
      const k = it.name[0].toUpperCase();
      if (k !== last) { html += `<div class="grp-h">${esc(k)}</div>`; last = k; }
      const fav = favs.includes(type + it.id);
      html += `<div class="crow" data-i="${items.indexOf(it)}"><span class="avatar">${isClass ? ICON.classes : esc(it.name[0].toUpperCase())}</span>
        <span class="tx"><b>${esc(it.name)}</b><span class="chips">${isClass ? (it.teachers || []).map(t => `<i>Klassenlehrkraft | ${esc(t)}</i>`).join('') : (it.cls ? `<i>${esc(it.cls)}</i>` : '')}</span></span>
        <button class="star ${fav ? 'on' : ''}" data-f="${esc(type + it.id)}">${ICON.star}</button></div>`;
    });
    root.querySelector('#l').innerHTML = html || '<div class="empty">Keine Ergebnisse</div>';
    root.querySelectorAll('.crow').forEach(r => r.addEventListener('click', e => {
      const sb = e.target.closest('.star');
      if (sb) { const i = favs.indexOf(sb.dataset.f); if (i < 0) favs.push(sb.dataset.f); else favs.splice(i, 1); store.set('favs', favs); sb.classList.toggle('on'); return; }
      const it = items[r.dataset.i]; S.ttRes = { type, id: it.id, name: it.name }; location.replace('#/timetable');
    }));
  };
  q.addEventListener('input', draw);
  root.querySelector('#clr').addEventListener('click', () => { q.value = ''; draw(); });
  draw();
}

/* ----------------------------------------------------------- lesson detail */
function viewLesson() {
  const l = S.lesson;
  if (!l) { location.replace('#/timetable'); return; }
  const group = (S.lessonGroup && S.lessonGroup.length > 1 && S.lessonGroup.includes(l)) ? S.lessonGroup : [l];
  const d = parseISO(l.date);
  const klass = l.klass || S.info.profile.klass || (l.classes || '').split(' ')[0] || '';
  const room = l.old_room && l.old_room !== l.room ? `<s>${esc(l.old_room)}</s> → ${esc(l.room)}` : esc(l.room);
  const chev = ICON.chevR.replace('<svg', '<svg class="chev"');
  const row = (icon, title, sub, cls = '') => `<button class="lrow ${cls}"><span class="li">${ICON[icon]}</span><span class="lt"><b>${esc(title)}</b><i>${esc(sub)}</i></span>${chev}</button>`;
  const stamp = `${DOW[d.getDay()]}. | ${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`;
  const accent = x => `--bar:${barColor(x)}`;
  const top = group.length > 1
    ? `<div class="ltabs">${group.map((x, i) => `<button class="${x === l ? 'sel' : ''}" data-i="${i}" style="${accent(x)}">${esc(x.subject)}</button>`).join('')}</div>`
    : `<div class="lbar" style="${accent(l)}"></div>`;
  const root = screenPlain(`${navHead(stamp, `${l.start} - ${l.end}`, `<button class="act kb">${ICON.kebab.replace('<svg', '<svg style="fill:currentColor;stroke:none"')}</button>`)}
    ${top}
    <div class="scroll"><div class="lhead">${klass ? `<div><b>${esc(klass)}</b></div>` : ''}<div><b>${esc(l.subject)}</b>${l.exam ? '<span class="pill">PRÜFUNG</span>' : ''}</div>
      <div>${room}</div></div>
      ${l.status === 'cancelled' ? '<div class="cband">ENTFÄLLT</div>' : ''}
      ${l.exam ? row('doc', 'Prüfung', l.exam) : ''}
      ${l.info ? row('info', 'Information zur Stunde', l.info, 'info2') : ''}
      ${l.teachers ? row('person', 'Lehrkraft', l.teachers) : ''}
      ${isAdmin() ? row('edit', 'Stunde bearbeiten', l._edited ? 'Admin-Modus · bearbeitet' : 'Admin-Modus', 'editrow') : ''}</div>`);
  wireBack(root);
  root.querySelector('.kb').addEventListener('click', () => toast('Nicht verfügbar'));
  root.querySelectorAll('.ltabs button').forEach(b => b.addEventListener('click', () => { S.lesson = group[b.dataset.i]; viewLesson(); }));
  root.querySelectorAll('.lrow').forEach(r => r.addEventListener('click', () => {
    if (r.classList.contains('editrow')) location.hash = '#/lesson/edit'; else toast(r.querySelector('i').textContent);
  }));
}

const EDIT_TYPES = [
  ['regular', 'Regulär', 'Findet normal statt'], ['cancelled', 'Entfällt', 'Stunde fällt aus'],
  ['room', 'Raumänderung', 'Anderer Raum'], ['changed', 'Vertretung / Änderung', 'Mit Information zur Stunde'],
  ['exam', 'Prüfung', 'Klassenarbeit oder Test'],
];
function viewLessonEdit() {
  const l = S.lesson;
  if (!l) { location.hash = '#/timetable'; return; }
  const d = parseISO(l.date);
  const saved = store.get('overrides', {})[l._key];
  let type = saved?.type || (l.status === 'cancelled' ? 'cancelled' : l.exam ? 'exam' : l.status === 'room' ? 'room' : l.status === 'changed' ? 'changed' : 'regular');
  const stamp = `${DOW[d.getDay()]}. | ${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)} · ${l.start} - ${l.end}`;
  const root = screenPlain(`${navHead('Stunde bearbeiten', stamp, `<button class="act" id="ok">${ICON.tick}</button>`)}
    <div class="scroll"><div class="sect" style="margin-top:6px">Status</div><div class="opt-card" id="types">
      ${EDIT_TYPES.map(([k, t, s]) => `<button class="opt-row" data-k="${k}"><div><b>${t}</b><span>${s}</span></div><span class="tk">${k === type ? ICON.tick : ''}</span></button>`).join('')}</div>
      <div class="field"><label>Fach</label><input id="f-subject" value="${esc(l.subject)}"></div>
      <div class="field"><label>Raum</label><input id="f-room" value="${esc(l.room)}"></div>
      <div class="field"><label>Lehrkraft</label><input id="f-teachers" value="${esc(l.teachers || '')}"></div>
      <div class="field" id="w-info"><label>Information zur Stunde</label><input id="f-info" value="${esc(l.info || '')}"></div>
      <div class="field" id="w-exam"><label>Prüfung</label><input id="f-exam" value="${esc(l.exam || '')}" placeholder="z. B. Geschichte KA"></div>
      <button class="btn sec" id="reset" style="margin:22px 14px 24px;width:calc(100% - 28px)">Zurücksetzen</button></div>`);
  wireBack(root);
  const sync = () => {
    root.querySelectorAll('#types .tk').forEach(t => { t.innerHTML = t.parentElement.dataset.k === type ? ICON.tick : ''; });
    root.querySelector('#w-info').hidden = !(type === 'changed' || type === 'exam');
    root.querySelector('#w-exam').hidden = type !== 'exam';
  };
  sync();
  root.querySelectorAll('#types .opt-row').forEach(r => r.addEventListener('click', () => { type = r.dataset.k; sync(); }));
  const done = async all => {
    store.set('overrides', all); S.weekCache = {};
    const wk = await loadWeek(mondayOf(d));
    S.lesson = wk.find(x => x._key === l._key) || l;
    history.back();
  };
  const v = id => root.querySelector(id).value.trim();
  root.querySelector('#ok').addEventListener('click', () => {
    const all = store.get('overrides', {});
    all[l._key] = { type, subject: v('#f-subject'), room: v('#f-room'), teachers: v('#f-teachers'), info: v('#f-info'), exam: v('#f-exam') };
    done(all);
  });
  root.querySelector('#reset').addEventListener('click', () => { const all = store.get('overrides', {}); delete all[l._key]; done(all); });
}

/* --------------------------------------------------------------- messages */
let msgQuery = '';
async function viewMessages() {
  const root = screenWithTabs('messages', `<div class="scroll"><div class="page-title">Mitteilungen</div>
    <div class="search">${ICON.search}<input type="search" placeholder="Inhalt oder Person suchen" value="${esc(msgQuery)}"></div><div id="ml"><div class="spin"><i class="spinner"></i></div></div></div>`);
  let msgs = [];
  try { msgs = await Provider.messages(); } catch (e) { root.querySelector('#ml').innerHTML = `<div class="empty">${esc(e.message)}</div>`; return; }
  const draw = () => {
    const q = msgQuery.toLowerCase();
    const f = msgs.filter(m => !q || [m.sender, m.subject, m.preview, m.body].join(' ').toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
    const row = m => `<a class="msg ${m.read === false ? 'unread' : ''}" href="#/messages/${m.id}"><div class="avatar">${esc((m.sender || '?')[0].toUpperCase())}</div>
      <div class="mb"><div class="from">${esc(m.sender)}</div><span class="dt">${fmtMsgDate(new Date(m.date))}</span>
      <div class="sub">${esc(m.subject)}</div><div class="pre">${esc(m.preview || (m.body || '').replace(/\s+/g, ' '))}</div>
      ${m.attachments?.length ? `<span class="clip">${ICON.clip}</span>` : ''}</div></a>`;
    const a = f.filter(m => m.needsConfirm), b = f.filter(m => !m.needsConfirm);
    root.querySelector('#ml').innerHTML =
      (a.length ? `<div class="sect">Lesebestätigung erforderlich</div><div class="mlist">${a.map(row).join('')}</div>` : '') +
      (b.length ? `<div class="sect">Meine Mitteilungen</div><div class="mlist">${b.map(row).join('')}</div>` : '') +
      (!f.length ? '<div class="empty">Keine Mitteilungen</div>' : '') + '<div style="height:20px"></div>';
  };
  draw();
  root.querySelector('input').addEventListener('input', e => { msgQuery = e.target.value; draw(); });
}
function linkify(text) {
  return esc(text).replace(/(https?:\/\/[^\s<]+|\b[\w.+-]+@[\w-]+\.[\w.-]+\b|\b[\w-]+\.(?:de|com|org|at)\b|\b\d{2}\/\d{2}\b)/g, m => {
    if (/^https?:/.test(m)) return `<a href="${m}" target="_blank" rel="noopener">${m}</a>`;
    if (m.includes('@')) return `<a href="mailto:${m}">${m}</a>`;
    if (/^\d/.test(m)) return `<a>${m}</a>`;
    return `<a href="https://${m}" target="_blank" rel="noopener">${m}</a>`;
  });
}
async function viewMessage(id) {
  const root = screenPlain(`${navHead('', '')}<div class="scroll"><div class="spin"><i class="spinner"></i></div></div>`);
  wireBack(root);
  let m; try { m = await Provider.message(id); } catch (e) { root.querySelector('.scroll').innerHTML = `<div class="empty">${esc(e.message)}</div>`; return; }
  if (!m) { root.querySelector('.scroll').innerHTML = '<div class="empty">Nicht gefunden</div>'; return; }
  const d = new Date(m.date);
  const stamp = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)} <span style="opacity:.5">|</span> ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  root.innerHTML = `${navHead('', '')}
    ${m.parentConfirm ? '<div class="banner" style="background:#d0d2d6;color:#111;font-size:14px;font-weight:500;height:24px;line-height:24px;padding:0 23px;white-space:nowrap;overflow:hidden">Lesebestätigung der Erziehungsberechtigten erforderlich</div>' : '<div class="mdetail"><div class="divider"></div></div>'}
    <div class="scroll mdetail"><div class="pad"><div class="meta"><span class="f">Von <b>${esc(m.sender)}</b></span><span class="r">${stamp}</span></div>
      <h2>${esc(m.subject)}</h2>
      ${(m.attachments || []).map((a, i) => `<button class="att" data-i="${i}">${ICON.pdf}<span>${esc(a.name || 'Anhang')}</span></button>`).join('')}
      <div class="body">${linkify(m.body || '')}</div></div></div>
    ${m.needsConfirm && !m.parentConfirm ? '<button class="confirm">Lesebestätigung senden</button>' : ''}`;
  wireBack(root);
  root.querySelectorAll('.att').forEach(b => b.addEventListener('click', () => Provider.downloadAttachment(id, m.attachments[b.dataset.i])));
  root.querySelector('.confirm')?.addEventListener('click', async e => {
    try { await Provider.confirmRead(id); e.target.remove(); toast('Lesebestätigung gesendet'); } catch { toast('Senden fehlgeschlagen'); }
  });
}

/* ---------------------------------------------------------------- profile */
function viewProfile() {
  const p = S.info.profile;
  const chev = ICON.chevR.replace('<svg', '<svg class="chev"');
  const row = (icon, label, href) => `<${href ? 'a href="' + href + '"' : 'button'} class="list-row" ${href ? '' : `data-a="${label}"`}><span class="ico">${ICON[icon]}</span><span class="lbl">${label}</span>${chev}</${href ? 'a' : 'button'}>`;
  const root = screenWithTabs('profile', `<div class="scroll"><div class="page-title">${esc(p.name)}</div><div class="cards" style="gap:21px">
    <div class="card"><button class="pcard"><div class="avatar">${esc((p.username || '?')[0])}</div><div class="pn"><b>${esc(p.username)}</b><i>${esc(p.role)}</i></div>${chev}</button></div>
    <div class="card">${row('contact', 'Kontaktdaten', '#/profile/contact')}</div>
    <div class="card">${row('megaphone', 'Was gibt es Neues')}${row('starBox', 'App bewerten')}${row('info', 'Über', '#/profile/about')}</div>
    <div class="card"><button class="list-row" data-a="admin"><span class="ico">${ICON.edit}</span><span class="lbl">Admin-Modus</span><span class="sw ${isAdmin() ? 'on' : ''}"></span></button>
      ${isAdmin() ? `<button class="list-row" data-a="reset"><span class="ico">${ICON.undo}</span><span class="lbl">Änderungen zurücksetzen</span><span class="cnt">${Object.keys(store.get('overrides', {})).length}</span></button>` : ''}</div>
    <div class="card">${row('logout', 'Abmelden')}</div></div></div>`);
  const sheet = html => {
    const ov = document.createElement('div'); ov.className = 'overlay dim'; ov.innerHTML = `<div class="sheet"><div class="grab"></div>${html}<button class="cancel">Abbrechen</button></div>`;
    root.appendChild(ov);
    ov.addEventListener('click', e => { if (e.target === ov || e.target.closest('.cancel')) ov.remove(); });
    return ov;
  };
  root.querySelector('.pcard').addEventListener('click', () => {
    const ov = sheet(`<div class="grp"><h4 class="line">Profil-Optionen</h4><button class="opt" data-a="copy">Benutzernamen kopieren</button>
      <button class="opt" data-a="add">Profil hinzufügen</button><button class="opt danger" data-a="del">Profil löschen</button></div>`);
    ov.addEventListener('click', async e => {
      const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return;
      ov.remove();
      if (a === 'copy') { try { await navigator.clipboard.writeText(p.username); toast('Benutzername kopiert'); } catch { toast(p.username); } }
      if (a === 'add') { L.edit = false; L.query = ''; location.hash = '#/login'; }
      if (a === 'del' && await showDialog(root, { title: `Profil löschen "${p.name}"?`, text: 'Lokale Einstellungen werden gelöscht', ok: 'Löschen' })) { deleteProfile(store.get('active')); location.replace('#/login'); }
    });
  });
  root.querySelectorAll('button.list-row').forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.a;
    if (a === 'Abmelden') {
      const ov = sheet(`<div class="grp"><h4>Abmelden?</h4><p>Nach dem Abmelden können Sie sich mit Ihrem Passwort wieder anmelden</p><button class="opt danger" data-a="out">Abmelden</button></div>`);
      ov.querySelector('[data-a=out]').addEventListener('click', signOut);
    }
    else if (a === 'admin') { store.set('admin', !isAdmin()); viewProfile(); }
    else if (a === 'reset') { if (confirm('Alle lokalen Stundenplan-Änderungen löschen?')) { store.del('overrides'); S.weekCache = {}; toast('Änderungen zurückgesetzt'); viewProfile(); } }
    else toast('Nicht verfügbar');
  }));
}
function viewContact() {
  const email = store.get('email', S.info.profile.email || '');
  const root = screenPlain(`${navHead('Kontaktdaten', '', `<button class="act" id="ok">${ICON.tick}</button>`, true)}
    <div class="field"><label>E-Mail</label><input type="email" value="${esc(email)}"></div>
    <div class="hint">${ICON.info}<span>Erforderlich um Ihr Passwort zurückzusetzen</span></div>`);
  wireBack(root);
  root.querySelector('#ok').addEventListener('click', () => { store.set('email', root.querySelector('input').value); history.back(); });
}
function viewAbout() {
  const row = (icon, label, url) => `<a class="list-row" href="${url}" target="_blank" rel="noopener"><span class="ico">${ICON[icon]}</span><span class="lbl">${label}</span>${ICON.chevR.replace('<svg', '<svg class="chev"')}</a>`;
  const theme = store.get('theme', 'system');
  const root = screenPlain(`${navHead('Über', '', '', true)}<div class="scroll"><div class="cards" style="padding-top:12px;gap:21px">
    <div class="card">${row('headset', 'Hilfe', 'https://help.untis.at')}</div>
    <div class="card">${row('news', 'Untis', 'https://www.untis.at')}${row('jobs', 'Jobs', 'https://www.untis.at/karriere')}${row('doc', 'AGB', 'https://www.untis.at/agb')}${row('lock', 'Datenschutzerklärung', 'https://www.untis.at/datenschutz')}${row('oss', 'Open-Source-Lizenzen', 'https://www.untis.at')}</div>
    <div class="card"><div class="list-row"><span class="lbl" style="margin-left:-6px">Version</span><span style="color:var(--muted);font-size:17px">6.8.1</span></div>
      <div class="list-row"><span class="lbl" style="margin-left:-6px">WebUntis-Version</span><span style="color:var(--muted);font-size:17px">2027.5.1</span></div></div>
    <div class="card"><button class="list-row" id="theme"><span class="lbl" style="margin-left:-6px">Darstellung</span><span style="color:var(--muted);font-size:17px">${{ system: 'System', light: 'Hell', dark: 'Dunkel' }[theme]}</span></button></div>
    </div></div>`);
  wireBack(root);
  root.querySelector('#theme').addEventListener('click', () => {
    const next = { system: 'light', light: 'dark', dark: 'system' }[store.get('theme', 'system')];
    store.set('theme', next); applyTheme(); viewAbout();
  });
}

/* ------------------------------------------------- appointments / absences */
const SY_START = () => { const n = new Date(); return new Date(n.getMonth() >= 7 ? n.getFullYear() : n.getFullYear() - 1, 7, 1); };
const SY_END = () => { const n = new Date(); return new Date((n.getMonth() >= 7 ? n.getFullYear() : n.getFullYear() - 1) + 1, 6, 31); };
function examRange(key) {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const days = { 7: 7, 14: 14, 30: 30, 90: 90 }[key];
  return days ? [t, addDays(t, days)] : [SY_START(), SY_END()];
}
function absRange(key) {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  if (key === 'default') return [addDays(t, -7), addDays(t, 30)];
  if (key === '30') return [addDays(t, -30), t];
  if (key === '90') return [addDays(t, -90), t];
  return [SY_START(), SY_END()];
}
async function viewExams() {
  const [a, b] = examRange(S.examFilter);
  const sub = S.examFilter === 'year' ? 'Ganzes Schuljahr' : fmtRange(a, b);
  const root = screenPlain(`${navHead('Meine Termine', sub, `<a class="act" href="#/appointments/filter">${ICON.filter}</a>`)}<div class="scroll" id="l"><div class="spin"><i class="spinner"></i></div></div>`);
  wireBack(root);
  const from = S.examFilter === 'year' ? (() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; })() : a;
  let ex = []; try { ex = await Provider.exams(from, b); } catch (e) { root.querySelector('#l').innerHTML = `<div class="empty">${esc(e.message)}</div>`; return; }
  root.querySelector('#l').innerHTML = ex.length ? ex.map(e => {
    const d = parseISO(e.date);
    return `<div class="day-h">${fmtDay(d)}</div><div class="ev"><span class="big" style="color:var(--text)">${ICON.exam}</span><h4>${esc(e.type)}</h4>
      <div class="ln">${ICON.room}<span>${(e.rooms.length ? e.rooms : ['']).map(esc).join('<br>')}</span></div>
      <div class="ln">${ICON.calendar}<span>${fmtShort(d)}</span></div>
      <div class="ln">${ICON.clock}<span>${e.start} - ${e.end}</span></div>
      <div class="ln">${ICON.subject}<span>${esc(e.subject)}</span></div>
      ${e.text ? `<div class="ln">${ICON.doc}<span>${esc(e.text)}</span></div>` : ''}</div>`;
  }).join('') + '<div style="height:20px"></div>' : '<div class="empty">Keine Termine</div>';
}
async function viewAbsences() {
  const [a, b] = absRange(S.absFilter);
  const root = screenPlain(`${navHead('Abwesenheiten', S.absFilter === 'year' ? 'Ganzes Schuljahr' : fmtRange(a, b), `<a class="act" href="#/absences/filter">${ICON.filter}</a>`)}<div class="scroll pt8" id="l"><div class="spin"><i class="spinner"></i></div></div>`);
  wireBack(root);
  let ab = []; try { ab = await Provider.absences(a, b); } catch (e) { root.querySelector('#l').innerHTML = `<div class="empty">${esc(e.message)}</div>`; return; }
  root.querySelector('#l').innerHTML = ab.length ? ab.map(x => {
    const d = parseISO(x.date);
    return `<div class="ev ab"><h4>${fmtShort(d)}</h4>
      <div class="ln">${ICON.clock}<span>${x.start} - ${x.end}</span></div>
      <div class="ln">${ICON.info}<span>${esc(x.reason)}</span></div>
      ${x.text ? `<div class="ln">${ICON.doc}<span>${esc(x.text)}</span></div>` : ''}
      <div class="ln ${x.excused ? 'ok' : ''}">${x.excused ? ICON.checkCircle : ICON.circle}<span>${x.excused ? 'entschuldigt' : 'Offen'}</span></div></div>`;
  }).join('') : '<div class="empty">Keine Abwesenheiten</div>';
}
function viewFilter(kind) {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const opts = kind === 'exam'
    ? [7, 14, 30, 90].map(n => [String(n), `Die nächsten ${n} Tage anzeigen`, fmtRange(t, addDays(t, n))]).concat([['year', 'Ganzes Schuljahr', 'Ganzes Schuljahr']])
    : [['default', 'Letzte 7 und nächste 30 Tage', fmtRange(...absRange('default'))], ['30', 'Letzte 30 Tage', fmtRange(...absRange('30'))],
       ['90', 'Letzte 90 Tage', fmtRange(...absRange('90'))], ['year', 'Ganzes Schuljahr', 'Ganzes Schuljahr']];
  const cur = kind === 'exam' ? S.examFilter : S.absFilter;
  const root = screenPlain(`${navHead('Filter', kind === 'exam' ? 'Meine Termine' : 'Abwesenheiten')}<div class="scroll"><div class="opt-card" style="margin-top:12px">
    ${opts.map(([k, l, s]) => `<button class="opt-row" data-k="${k}"><div><b>${l}</b><span>${s}</span></div>${k === cur ? ICON.tick : ''}</button>`).join('')}</div></div>`);
  wireBack(root);
  root.querySelectorAll('.opt-row').forEach(r => r.addEventListener('click', () => {
    if (kind === 'exam') { S.examFilter = r.dataset.k; store.set('examFilter', S.examFilter); } else { S.absFilter = r.dataset.k; store.set('absFilter', S.absFilter); }
    history.back();
  }));
}

boot();
