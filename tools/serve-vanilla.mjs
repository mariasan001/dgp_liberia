#!/usr/bin/env node
/**
 * Sirve apps/web-vanilla desde la raíz del monorepo
 * para que las rutas a node_modules/@mariasan001/* funcionen.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 5173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

function safeJoin(base, reqPath) {
  const decoded = decodeURIComponent(reqPath.split('?')[0]);
  const cleaned = decoded.replace(/^\/+/, '');
  const full = path.normalize(path.join(base, cleaned));
  if (!full.startsWith(base)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '/apps/web-vanilla/index.html' : req.url;
  const filePath = safeJoin(root, urlPath ?? '/');

  if (!filePath) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`No encontrado: ${urlPath}`);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log('');
  console.log('  Gob UI · HTML listo');
  console.log(`  http://localhost:${port}/`);
  console.log('');
  console.log('  Ctrl+C para detener');
  console.log('');
});
