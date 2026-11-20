// Tiny static server to preview public/ in a desktop browser (demo mode only; real logins need the Android app).
//   node tools/preview.js [port]      -> http://localhost:3000/?demo
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'public'), port = process.argv[2] || 3000;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  const f = path.join(root, path.normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[\/])+/, ''));
  const file = f.endsWith(path.sep) || f === root ? path.join(root, 'index.html') : f;
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' }); res.end(d); });
}).listen(port, '127.0.0.1', () => console.log('preview on http://localhost:' + port + '/?demo'));
