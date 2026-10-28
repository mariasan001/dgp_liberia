#!/usr/bin/env node
/** Sirve apps/html-kit en http://localhost:5173 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', 'apps', 'html-kit');
const port = Number(process.env.PORT || 5173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

function safeJoin(base, reqPath) {
  const decoded = decodeURIComponent((reqPath || '/').split('?')[0]);
  let cleaned = decoded.replace(/^\/+/, '');
  if (!cleaned || cleaned.endsWith('/')) cleaned += 'index.html';
  const full = path.normalize(path.join(base, cleaned));
  if (!full.startsWith(base)) return null;
  return full;
}

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('Falta apps/html-kit. Corre primero: pnpm kit:build');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const filePath = safeJoin(root, req.url === '/' ? '/index.html' : req.url);
  if (!filePath) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404).end('No encontrado');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log('');
  console.log('  Gob UI · kit listo (sin npm en tu HTML)');
  console.log(`  http://localhost:${port}/`);
  console.log('');
});
