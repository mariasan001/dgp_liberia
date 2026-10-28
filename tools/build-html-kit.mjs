#!/usr/bin/env node
/**
 * Arma apps/html-kit: HTML + CSS + JS listos.
 * Sin node_modules, sin token, sin pnpm para quien solo abre la carpeta.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'apps', 'html-kit');
const stylesSrc = path.join(root, 'packages', 'styles', 'src');
const uiWc = path.join(root, 'packages', 'ui-wc');

function readCss(name) {
  return fs.readFileSync(path.join(stylesSrc, name), 'utf8');
}

console.log('1/3 Compilando componentes…');
execSync('pnpm build', { cwd: uiWc, stdio: 'inherit' });

console.log('2/3 Armando carpeta html-kit…');
fs.mkdirSync(outDir, { recursive: true });

const css = `/* Gob UI · estilos del kit (generado) */
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&display=swap");

${readCss('theme.css')}

${readCss('base.css')}

${readCss('utilities.css')}
`;

fs.writeFileSync(path.join(outDir, 'gob-ui.css'), css, 'utf8');

const esmPath = path.join(uiWc, 'dist', 'index.js');
const jsOut = path.join(outDir, 'gob-ui.js');
fs.copyFileSync(esmPath, jsOut);

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gob UI · listo</title>
    <link rel="stylesheet" href="./gob-ui.css" />
    <script type="module" src="./gob-ui.js"></script>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        background:
          radial-gradient(700px 320px at 90% -10%, rgba(159, 33, 65, 0.07), transparent 55%),
          var(--gob-bg, #fafafa);
      }
      .stage {
        width: min(720px, calc(100% - 32px));
        margin: 0 auto;
        padding: 48px 0 64px;
        display: grid;
        gap: 16px;
      }
      .badge {
        display: inline-flex;
        width: fit-content;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(159, 33, 65, 0.1);
        color: #9f2141;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .howto {
        margin: 8px 0 0;
        padding: 14px 16px;
        border-radius: 14px;
        border: 1px dashed #e2ddd4;
        background: #fcfcfc;
        font-size: 14px;
        line-height: 1.5;
        color: #6b665f;
      }
    </style>
  </head>
  <body>
    <main class="stage gob-stack">
      <span class="badge">Kit listo</span>
      <h1 style="margin: 0; font-size: clamp(1.8rem, 4vw, 2.4rem); letter-spacing: -0.03em">
        Gob UI sin instalar nada raro
      </h1>
      <p class="gob-muted" style="margin: 0; max-width: 48ch; line-height: 1.55">
        Si ves estos botones, ya funciona. Copia esta carpeta a tu trámite y
        edita el HTML.
      </p>

      <div class="gob-row" style="flex-wrap: wrap; gap: 10px">
        <gob-button tone="primary" appearance="solid">Guardar</gob-button>
        <gob-button tone="primary" appearance="outline">Cancelar</gob-button>
        <gob-button tone="accent" appearance="solid">Continuar</gob-button>
      </div>

      <gob-alert
        tone="info"
        title="Cómo abrir esta página"
        description="No la abras a doble clic. Usa Live Server (VS Code) o corre pnpm kit desde el proyecto."
      ></gob-alert>

      <div class="howto">
        <strong>En tu propio HTML:</strong> en la misma carpeta deja
        <code>gob-ui.css</code> y <code>gob-ui.js</code>, y pega esto en el
        <code>&lt;head&gt;</code>:<br /><br />
        <code>&lt;link rel="stylesheet" href="./gob-ui.css" /&gt;</code><br />
        <code>&lt;script type="module" src="./gob-ui.js"&gt;&lt;/script&gt;</code>
      </div>
    </main>
  </body>
</html>
`;

fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

const readme = `# Kit HTML de Gob UI

## Neta fácil

En esta carpeta hay solo 3 cosas:

1. \`index.html\` — página de ejemplo
2. \`gob-ui.css\` — estilos
3. \`gob-ui.js\` — componentes

## Cómo verlo

Opción más simple (si tienes VS Code):
1. Abre esta carpeta
2. Clic derecho en \`index.html\` → **Open with Live Server**

Desde el proyecto (si ya tienes pnpm):
\`\`\`
pnpm kit
\`\`\`
Abre http://localhost:5173/

## Cómo usarlo en tu trámite

1. Copia \`gob-ui.css\` y \`gob-ui.js\` junto a tu HTML
2. En el \`<head>\` pega:

\`\`\`html
<link rel="stylesheet" href="./gob-ui.css" />
<script type="module" src="./gob-ui.js"></script>
\`\`\`

3. En el body escribe, por ejemplo:

\`\`\`html
<gob-button tone="primary" appearance="solid">Guardar</gob-button>
\`\`\`

Listo. Sin token, sin npm, sin Node en tu máquina de destino
(solo necesitas un servidor local chiquito para verlo, como Live Server).
`;

fs.writeFileSync(path.join(outDir, 'LEEAME.md'), readme, 'utf8');

console.log('3/3 Listo → apps/html-kit/');
console.log('   index.html · gob-ui.css · gob-ui.js · LEEAME.md');
