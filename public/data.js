// Demo data, taken from the reference screenshots. Used in "Demo" mode (no login).
window.DEMO = {
  school: 'Demo-Gymnasium',
  profile: { name: 'Max Mustermann', username: 'max.mustermann', role: 'Schüler*in', klass: '11c', email: 'max@example.com' },

  // Time grid (minutes are derived from these strings)
  grid: [
    ['07:50', '08:35'], ['08:40', '09:25'], ['09:40', '10:25'], ['10:25', '11:10'],
    ['11:30', '12:15'], ['12:15', '13:00'], ['13:55', '14:40'], ['14:45', '15:30'],
    ['15:35', '16:20'], ['16:20', '17:05'],
  ],

  // Weekly pattern: day 0 = Monday. p = first period (1-based), n = number of periods.
  // status: regular | cancelled | changed (orange, with info) | room (teal room change)
  week: [
    { day: 0, p: 1, n: 1, room: 'C304', subject: 'GK', bar: '#a4d06c', hue: 90 },
    { day: 0, p: 2, n: 1, room: 'B4 (A512)', subject: 'BIO', bar: '#00ff00', hue: 125 },
    { day: 0, p: 3, n: 2, room: 'A201', subject: 'D', bar: '#8000ff', hue: 270 },
    { day: 0, p: 5, n: 2, room: 'B4 (A512)', subject: 'PH', bar: '#ff0000', hue: 0 },
    { day: 1, p: 1, n: 2, room: 'C304', subject: 'M', bar: '#0080ff', hue: 210 },
    { day: 1, p: 3, n: 2, room: 'B1 (A311)', subject: 'SPO', bar: '#ffff00', hue: 55, status: 'changed', room_changed: true, info: 'Vertretung: Halle gesperrt, Unterricht im Klassenzimmer.' },
    { day: 1, p: 5, n: 2, room: 'C205', subject: 'REV', bar: '#c6e3ff', classes: '11a 11b ...', hue: 210 },
    { day: 2, p: 1, n: 2, room: 'C303', subject: 'F', bar: '#b4e7d0', classes: '11a 11b ...', hue: 150 },
    { day: 2, p: 3, n: 2, room: 'CR1', subject: 'IMP', bar: '#408080', classes: '11a 11b ...', hue: 175 },
    { day: 2, p: 5, n: 2, room: 'Wk', subject: 'BK', bar: '#ff80ff', hue: 300 },
    { day: 2, p: 7, n: 2, room: 'A301', subject: 'E', bar: '#85fcfc', hue: 185 },
    { day: 3, p: 1, n: 1, room: 'C304', subject: 'WBS', bar: '#ff8040', hue: 20, status: 'cancelled' },
    { day: 3, p: 2, n: 1, room: 'C304', subject: 'M', bar: '#0080ff', hue: 210 },
    { day: 3, p: 3, n: 2, room: 'C304', subject: 'G', bar: '#c0c0c0', hue: 0, sat: 0, status: 'changed', exam: 'Geschichte KA', info: 'KA Geschichte KA' },
    { day: 3, p: 5, n: 2, room: 'C303', subject: 'F', bar: '#b4e7d0', classes: '11a 11b ...', hue: 150 },
    { day: 3, p: 7, n: 2, room: 'C1 (A309)', subject: 'CH', bar: '#00edee', hue: 185 },
    { day: 4, p: 1, n: 1, room: 'C304', subject: 'E11+', bar: '#a5fefe', hue: 185 },
    { day: 4, p: 2, n: 1, room: 'B2 (A313)', subject: 'GEO', bar: '#ffff80', hue: 60, status: 'room', room_changed: true, old_room: 'C304' },
    { day: 4, p: 3, n: 2, room: 'P1 (A511)', subject: 'IMP', bar: '#408080', classes: '11a 11b ...', hue: 180 },
    { day: 4, p: 5, n: 2, room: 'C206', subject: 'D11+', bar: '#8000ff', hue: 275, lw: 0.8 },
    { day: 4, p: 5, n: 2, room: 'C304', subject: 'M11+', bar: '#0080ff', hue: 210, lw: 0.2 },
  ],

  holidays: ['2026-11-23'],
  lockedWeeks: ['2026-11-02'],   // timetable display restricted by the school admin
  classes: [
    { id: 'c1', name: '11c', teachers: ['Abc', 'Def'] }, { id: 'c2', name: '11a', teachers: ['Ghi'] }, { id: 'c3', name: '11b', teachers: ['Jkl'] },
  ],
  students: [{ id: 's1', name: 'Mustermann Max', cls: '11c' }, { id: 's2', name: 'Musterfrau Erika', cls: '11c' }],
  schools: [{ displayName: 'Demo-Gymnasium', address: '12345, Musterstadt, Beispielstraße 1', host: 'demo', loginName: 'demo' }],

  announcement: { title: 'Hinweis', text: 'Dies ist eine Beispielmeldung für den Demo-Modus.', isNew: true },

  messages: [
    { id: 1, sender: 'Abc', date: '2026-11-14T21:52:00', subject: 'Informationen zum Schüleraustausch', needsConfirm: true, attachments: [],
      body: 'Liebe Schülerinnen und Schüler,\n\nder Bewerbungszeitraum für den Schüleraustausch beginnt. Alle Informationen findet ihr auf der Schulwebsite.\n\nBei Fragen könnt ihr mich gerne ansprechen.\n\nViele Grüße' },
    { id: 2, sender: 'Def', date: '2026-03-27T05:58:00', subject: 'Elternbrief Musikprojekt', needsConfirm: true, parentConfirm: true, attachments: [{ name: 'Elternbrief.pdf' }],
      body: 'Liebe Eltern, liebe Schülerinnen und Schüler,\n\nbitte beachten Sie den Brief im Anhang.\n\nViele Grüße' },
    { id: 3, sender: 'Def', date: '2026-03-10T08:12:00', subject: 'Zusatzprobe', needsConfirm: true, attachments: [],
      body: 'Liebe Eltern,\n\nvielen Dank für die schnelle Rückmeldung. Die Zusatzprobe findet wie besprochen statt.\n\nViele Grüße' },
    { id: 4, sender: 'Def', date: '2026-01-27T07:30:00', subject: 'Termine im zweiten Halbjahr', needsConfirm: true, attachments: [{ name: 'Termine.pdf' }],
      body: 'Liebe Eltern, liebe Schülerinnen und Schüler,\n\nbitte beachten Sie die Terminübersicht im Anhang.\n\nViele Grüße' },
    { id: 5, sender: 'Admin', date: '2026-11-16T19:33:00', subject: 'Allgemeine Information der Schulleitung', attachments: [],
      body: 'Liebe Schulgemeinschaft,\n\nhier steht eine allgemeine Information für alle Schülerinnen, Schüler und Eltern.\n\nMit freundlichen Grüßen\nDie Schulleitung' },
    { id: 6, sender: 'Ghi', date: '2026-11-16T10:05:00', subject: 'Erinnerung', attachments: [{ name: 'Anhang.pdf' }], body: '' },
  ],
  unreadMessages: 67,

  exams: [
    { date: '2026-11-19', start: '09:40', end: '11:10', rooms: ['C304'], subject: 'Geschichte', type: 'Klassenarbeit', text: 'Klassenarbeit Geschichte Nr. 1' },
    { date: '2026-11-24', start: '11:30', end: '13:00', rooms: ['C205'], subject: 'evang. Religionslehre', type: 'Klassenarbeit', text: 'Klassenarbeit Religion' },
    { date: '2026-12-01', start: '07:50', end: '09:25', rooms: ['C304', 'C304'], subject: 'Mathematik', type: 'Klassenarbeit', text: 'Klassenarbeit Mathematik Nr. 1' },
    { date: '2026-12-03', start: '09:40', end: '11:10', rooms: ['C303'], subject: 'Französisch', type: 'Klassenarbeit', text: 'Klassenarbeit Französisch Nr. 1' },
  ],

  absences: [
    { date: '2026-11-30', start: '07:50', end: '17:05', reason: 'unbekannt', text: '', excused: false },
    { date: '2026-11-17', start: '07:50', end: '08:31', reason: 'verspätet', text: '', excused: false },
    { date: '2026-11-16', start: '07:45', end: '08:30', reason: 'Krankheit', text: '', excused: true },
  ],
};
