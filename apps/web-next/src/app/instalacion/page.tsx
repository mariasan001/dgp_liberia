'use client';

import Link from 'next/link';
import { useState } from 'react';
import '@mariasan001/ui-wc';

import { SiteNav } from '../site-nav';
import s from './page.module.css';

type Manager = 'npm' | 'pnpm' | 'yarn';

const STYLES_VERSION = '0.1.4';
const UI_VERSION = '0.3.1';

const INSTALL_CMDS: Record<Manager, string> = {
  npm: `npm install @mariasan001/styles@${STYLES_VERSION} @mariasan001/ui-wc@${UI_VERSION}`,
  pnpm: `pnpm add @mariasan001/styles@${STYLES_VERSION} @mariasan001/ui-wc@${UI_VERSION}`,
  yarn: `yarn add @mariasan001/styles@${STYLES_VERSION} @mariasan001/ui-wc@${UI_VERSION}`,
};

const NPMRC = `@mariasan001:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TU_GITHUB_PACKAGES_TOKEN
always-auth=true`;

const IMPORT_CSS = `<link rel="stylesheet" href="node_modules/@mariasan001/styles/fonts.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/theme.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/base.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/utilities.css" />`;

const IMPORT_JS = `<script type="module">
  import '@mariasan001/ui-wc';
</script>`;

const KIT_LINKS = `<link rel="stylesheet" href="./gob-ui.css" />
<script type="module" src="./gob-ui.js"></script>`;

const STARTER_HTML = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gob UI</title>
    <link rel="stylesheet" href="node_modules/@mariasan001/styles/fonts.css" />
    <link rel="stylesheet" href="node_modules/@mariasan001/styles/theme.css" />
    <link rel="stylesheet" href="node_modules/@mariasan001/styles/base.css" />
    <link rel="stylesheet" href="node_modules/@mariasan001/styles/utilities.css" />
  </head>
  <body>
    <main class="gob-container gob-stack" style="padding: 32px;">
      <h1>Gob UI</h1>
      <div class="gob-row">
        <gob-button tone="primary" appearance="solid">Guardar</gob-button>
        <gob-button tone="primary" appearance="outline">Cancelar</gob-button>
      </div>
    </main>
    <script type="module">
      import '@mariasan001/ui-wc';
    </script>
  </body>
</html>`;

const FAQ = [
  {
    q: '¿Por qué hace falta un token de GitHub?',
    a: 'Los paquetes se publican en GitHub Packages. El token con permiso read:packages permite descargarlos. No lo subas al repositorio.',
  },
  {
    q: '¿Hay que instalar los dos paquetes?',
    a: 'Sí. styles aporta tipografía y tema; ui-wc aporta las etiquetas gob-*. Sin uno de los dos, el resultado queda incompleto.',
  },
  {
    q: 'El botón no se ve bien o aparece como etiqueta desconocida',
    a: 'Revisa que exista el import de @mariasan001/ui-wc y que el script sea type="module". Abre la página con un servidor local, no con file://.',
  },
  {
    q: '¿Se puede usar sin instalar paquetes?',
    a: 'Sí. En apps/html-kit están gob-ui.css y gob-ui.js listos para copiar junto a tu HTML.',
  },
];

function CodeBlock({
  code,
  label,
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={s.codeWrap}>
      <div className={s.codeBar}>
        <span className={s.codeLabel}>{label ?? 'HTML'}</span>
        <button type="button" className={s.copyBtn} onClick={() => void onCopy()}>
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className={s.pre}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ManagerTabs({
  value,
  onChange,
}: {
  value: Manager;
  onChange: (m: Manager) => void;
}) {
  const items: Manager[] = ['npm', 'pnpm', 'yarn'];
  return (
    <div className={s.tabs} role="tablist" aria-label="Gestor de paquetes">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={value === item}
          className={`${s.tab} ${value === item ? s.tabActive : ''}`}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default function InstalacionPage() {
  const [manager, setManager] = useState<Manager>('npm');

  return (
    <div className={s.page}>
      <SiteNav active="instalacion" />

      <header className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.eyebrow}>Documentación</p>
          <h1 className={s.title}>Instalación</h1>
          <p className={s.hint}>
            Agrega Gob UI a tu proyecto con <strong>npm</strong>,{' '}
            <strong>pnpm</strong> o <strong>yarn</strong>. Dos paquetes: estilos
            y componentes HTML.
          </p>
        </div>
      </header>

      <div className={s.panelWrap}>
        <div className={s.mainSolo}>
          <section className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>Por paquetes</p>
              <h2 className={s.cardTitle}>Instalar con npm</h2>
              <p className={s.cardLead}>
                El camino habitual: configuras el acceso, instalas los paquetes
                y los enlazas en tu HTML.
              </p>
            </div>

            <div className={s.pkgStrip}>
              <article className={s.pkgChip}>
                <span className={s.pkgChipRole}>Estilos</span>
                <code>@mariasan001/styles</code>
                <span className={s.pkgChipVer}>v{STYLES_VERSION}</span>
              </article>
              <article className={s.pkgChip}>
                <span className={s.pkgChipRole}>Componentes</span>
                <code>@mariasan001/ui-wc</code>
                <span className={s.pkgChipVer}>v{UI_VERSION}</span>
              </article>
            </div>

            <div className={s.block}>
              <h3 className={s.blockTitle}>1. Acceso a los paquetes</h3>
              <p className={s.blockText}>
                Gob UI no está en el registro público de npm. Se publica en
                GitHub Packages. Agrega este archivo <code>.npmrc</code> en la
                raíz de tu proyecto:
              </p>
              <CodeBlock code={NPMRC} label=".npmrc" />
              <p className={s.callout}>
                Usa un token de GitHub con permiso <code>read:packages</code>.
                No lo commits.
              </p>
            </div>

            <div className={s.block}>
              <h3 className={s.blockTitle}>2. Instalar</h3>
              <p className={s.blockText}>
                Instala ambos paquetes. Elige el gestor que uses en el equipo:
              </p>
              <ManagerTabs value={manager} onChange={setManager} />
              <CodeBlock code={INSTALL_CMDS[manager]} label="Terminal" />
            </div>

            <div className={s.block}>
              <h3 className={s.blockTitle}>3. Enlazar en el HTML</h3>
              <p className={s.blockText}>
                Carga los estilos (en este orden) y el script de componentes:
              </p>
              <CodeBlock code={IMPORT_CSS} label="CSS" />
              <CodeBlock code={IMPORT_JS} label="JavaScript" />
              <p className={s.blockText}>Uso en el cuerpo de la página:</p>
              <CodeBlock
                code={`<gob-button tone="primary" appearance="solid">Guardar</gob-button>`}
                label="HTML"
              />
            </div>

            <div className={s.block}>
              <h3 className={s.blockTitle}>4. Ejemplo completo</h3>
              <p className={s.blockText}>
                Plantilla mínima. Ábrela con un servidor local (Vite, Live
                Server u otro). Evita abrir el archivo directo en el navegador.
              </p>
              <CodeBlock code={STARTER_HTML} label="index.html" />
            </div>
          </section>

          <section className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>Sin npm</p>
              <h2 className={s.cardTitle}>Archivos listos</h2>
              <p className={s.cardLead}>
                Si prefieres no instalar dependencias en el trámite, copia los
                archivos ya generados desde <code>apps/html-kit</code>.
              </p>
            </div>
            <ul className={s.bulletList}>
              <li>
                <code>gob-ui.css</code> — estilos
              </li>
              <li>
                <code>gob-ui.js</code> — componentes
              </li>
              <li>
                <code>index.html</code> — ejemplo
              </li>
            </ul>
            <p className={s.blockText}>Inclúyelos en tu página así:</p>
            <CodeBlock code={KIT_LINKS} label="HTML" />
            <p className={s.callout}>
              Desde este monorepo puedes regenerarlos con{' '}
              <code>pnpm kit</code> y abrir http://localhost:5173/
            </p>
          </section>

          <section className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>Verificación</p>
              <h2 className={s.cardTitle}>Ejemplo en esta página</h2>
              <p className={s.cardLead}>
                Si los botones se ven con la marca institucional, los
                componentes están cargando correctamente aquí.
              </p>
            </div>
            <div className={s.liveStage}>
              <gob-button tone="primary" appearance="solid">
                Guardar
              </gob-button>
              <gob-button tone="primary" appearance="outline">
                Cancelar
              </gob-button>
              <gob-button tone="accent" appearance="solid">
                Continuar
              </gob-button>
              <gob-button tone="primary" appearance="ghost" loading>
                Procesando
              </gob-button>
            </div>
          </section>

          <section className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>Soporte</p>
              <h2 className={s.cardTitle}>Problemas frecuentes</h2>
              <p className={s.cardLead}>
                Revisa en orden: token, instalación, CSS, script y servidor
                local.
              </p>
            </div>
            <div className={s.faqList}>
              {FAQ.map((item) => (
                <details key={item.q} className={s.faqItem}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className={s.closing}>
            <div>
              <h2 className={s.closingTitle}>Siguiente paso</h2>
              <p className={s.closingBody}>
                Revisa el catálogo y copia el HTML del componente que necesites.
              </p>
            </div>
            <Link className={s.closingBtn} href="/#componentes">
              Ir a Componentes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
