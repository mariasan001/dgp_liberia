'use client';

import Link from 'next/link';
import { useState } from 'react';
import '@mariasan001/ui-wc';

import { SiteNav } from '../site-nav';
import s from './page.module.css';

type SnippetId =
  | 'npmrc'
  | 'install'
  | 'styles'
  | 'register'
  | 'first'
  | 'theme'
  | 'full';

const STEPS: {
  id: SnippetId;
  step: string;
  title: string;
  description: string;
  why: string;
  code: string;
}[] = [
  {
    id: 'npmrc',
    step: '01',
    title: 'Configura el registry',
    description:
      'Los paquetes se publican en GitHub Packages bajo el scope @mariasan001. Sin este archivo, pnpm/npm no encuentran la librería.',
    why: 'Decisión: un solo registry privado institucional, no npmjs público.',
    code: `@mariasan001:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TU_GITHUB_PACKAGES_TOKEN
always-auth=true`,
  },
  {
    id: 'install',
    step: '02',
    title: 'Instala los dos paquetes',
    description:
      'Siempre instala styles + ui-wc juntos. El primero trae tokens, tipografía y base; el segundo trae las etiquetas gob-*.',
    why: 'Decisión: separar CSS publicable de comportamiento Web Component.',
    code: `pnpm add @mariasan001/styles @mariasan001/ui-wc

# equivalente con npm
npm install @mariasan001/styles @mariasan001/ui-wc`,
  },
  {
    id: 'styles',
    step: '03',
    title: 'Carga los estilos en orden',
    description:
      'El orden importa: fuentes → tokens → base del documento → utilidades. Así el sistema hereda --gob-* de forma estable.',
    why: 'Decisión: CSS variables en :root; los componentes leen tokens, no colores hardcode.',
    code: `<link rel="stylesheet" href="node_modules/@mariasan001/styles/fonts.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/theme.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/base.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/utilities.css" />`,
  },
  {
    id: 'register',
    step: '04',
    title: 'Registra los Web Components',
    description:
      'Un único import define todo el catálogo básico. No registres cada etiqueta a mano.',
    why: 'Decisión: side-effect import; DX simple para equipos HTML.',
    code: `<script type="module">
  import '@mariasan001/ui-wc';
</script>`,
  },
  {
    id: 'first',
    step: '05',
    title: 'Escribe HTML normal',
    description:
      'Usa etiquetas gob-* como cualquier otra. Los atributos controlan variante y estado. No inventes clases de color propias.',
    why: 'Decisión: API por atributos (tone, appearance, size, loading, disabled).',
    code: `<gob-button tone="primary" appearance="solid">Guardar</gob-button>
<gob-button tone="primary" appearance="outline">Cancelar</gob-button>
<gob-button tone="primary" appearance="ghost" loading>Procesando</gob-button>`,
  },
  {
    id: 'theme',
    step: '06',
    title: 'Activa tema claro u oscuro',
    description:
      'Claro es el default. Oscuro se enciende con data-gob-theme="dark" en html o un contenedor padre.',
    why: 'Decisión: un atributo de documento, sin JS obligatorio.',
    code: `<!-- Claro (default) -->
<html lang="es">...</html>

<!-- Oscuro -->
<html lang="es" data-gob-theme="dark">...</html>`,
  },
  {
    id: 'full',
    step: '07',
    title: 'Plantilla HTML lista',
    description:
      'Copia, ajusta rutas a node_modules y sirve con un servidor estático (no abras con file://).',
    why: 'Decisión: página mínima reproducible para validar consumo real.',
    code: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gob UI · HTML</title>
    <link rel="stylesheet" href="./node_modules/@mariasan001/styles/fonts.css" />
    <link rel="stylesheet" href="./node_modules/@mariasan001/styles/theme.css" />
    <link rel="stylesheet" href="./node_modules/@mariasan001/styles/base.css" />
    <link rel="stylesheet" href="./node_modules/@mariasan001/styles/utilities.css" />
  </head>
  <body>
    <main class="gob-container gob-stack" style="padding: 32px;">
      <h1>Gob UI</h1>
      <p class="gob-muted">Sistema institucional · consumo HTML</p>
      <div class="gob-row">
        <gob-button tone="primary" appearance="solid">Aceptar</gob-button>
        <gob-button tone="primary" appearance="outline">Cancelar</gob-button>
      </div>
    </main>
    <script type="module">
      import '@mariasan001/ui-wc';
    </script>
  </body>
</html>`,
  },
];

const DECISIONS = [
  {
    title: 'Solo HTML',
    body: 'Esta copia documenta un único camino: Web Components en HTML. Sin wrappers React/Vue/Angular. Menos superficie, más claridad.',
  },
  {
    title: '50 piezas básicas',
    body: 'Se quitaron capas avanzadas (command palette, data-grid, charts, FAB, sheets…). El núcleo cubre trámites y tableros tipicos.',
  },
  {
    title: 'Tokens primero',
    body: 'Los colores, tipografía y densidades viven en CSS variables (--gob-*). Los componentes no inventan una marca paralela.',
  },
  {
    title: 'Atributos estables',
    body: 'tone, appearance, size, loading, disabled. Misma gramática en botón, alerta, badge y formularios.',
  },
];

const PACKAGES = [
  {
    name: '@mariasan001/styles',
    version: '0.1.2',
    role: 'Estilos',
    body: 'fonts.css · theme.css · base.css · utilities.css',
  },
  {
    name: '@mariasan001/ui-wc',
    version: '0.2.0',
    role: 'Componentes',
    body: 'Catálogo gob-* registrado con un import',
  },
];

const RULES = [
  {
    index: '01',
    title: 'Instala siempre los dos paquetes',
    body: 'styles sin ui-wc = solo tokens. ui-wc sin styles = componentes sin marca.',
  },
  {
    index: '02',
    title: 'Sirve por HTTP',
    body: 'ES modules y fuentes locales fallan con file://. Usa Vite, Live Server o cualquier static server.',
  },
  {
    index: '03',
    title: 'No pintes colores a mano',
    body: 'Cambia tone / appearance o variables --gob-*. Evita CSS que rompa contraste institucional.',
  },
  {
    index: '04',
    title: 'Iconos en slot',
    body: 'Phosphor thin en slot="icon". En botones solo-icono agrega aria-label.',
  },
  {
    index: '05',
    title: 'Un tema por documento',
    body: 'data-gob-theme="dark" en html. No mezcles modos por sección sin necesidad.',
  },
  {
    index: '06',
    title: 'Copia el snippet del catálogo',
    body: 'Cada componente en Componentes trae HTML listo. Parte de ahí, no reescribas la API.',
  },
];

const FAQ = [
  {
    q: '¿Por qué no hay guía de React / Vue / Angular?',
    a: 'Esta edición se acotó a HTML a propósito: menos deuda, una sola verdad de documentación y consumo predecible en trámites web.',
  },
  {
    q: 'gob-button se ve como etiqueta desconocida',
    a: 'Falta el import de @mariasan001/ui-wc o el script no es type="module". También revisa que la página se sirva por HTTP.',
  },
  {
    q: 'Se ve sin tipografía / colores raros',
    a: 'Carga fonts.css y theme.css antes de base.css. Confirma rutas a node_modules/@mariasan001/styles/.',
  },
  {
    q: 'pnpm no encuentra @mariasan001/*',
    a: 'El .npmrc debe apuntar a GitHub Packages y el token necesita permiso read:packages. No subas el token al repo.',
  },
  {
    q: 'El tema oscuro no cambia',
    a: 'Usa exactamente data-gob-theme="dark" en un ancestro. Cualquier otro valor no activa el override.',
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

export default function InstalacionPage() {
  return (
    <div className={s.page}>
      <SiteNav active="instalacion" />

      <header className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.eyebrow}>Guía de consumo</p>
          <h1 className={s.title}>Instalación</h1>
          <p className={s.hint}>
            Cómo instalar, decidir y usar <strong>Gob UI</strong> en HTML:
            registry, paquetes, estilos, registro y primer componente.
          </p>
          <div className={s.heroMeta}>
            <span>Solo HTML</span>
            <span>50 componentes</span>
            <span>Web Components</span>
          </div>
        </div>
      </header>

      <div className={s.panelWrap}>
        <div className={s.layout}>
          <aside className={s.side} aria-label="Índice">
            <p className={s.sideLabel}>Índice</p>
            <nav className={s.sideNav}>
              <a href="#decision">Decisión de producto</a>
              <a href="#paquetes">Paquetes</a>
              <a href="#pasos">Pasos</a>
              {STEPS.map((step) => (
                <a key={step.id} href={`#${step.id}`} className={s.sideSub}>
                  {step.step}. {step.title}
                </a>
              ))}
              <a href="#vivo">Vista en vivo</a>
              <a href="#reglas">Buenas prácticas</a>
              <a href="#faq">Problemas comunes</a>
            </nav>
            <Link className={s.sideCta} href="/#componentes">
              Ver componentes →
            </Link>
          </aside>

          <div className={s.main}>
            <section className={s.card} id="decisión">
              <div className={s.cardHead}>
                <p className={s.kicker}>Por qué así</p>
                <h2 className={s.cardTitle}>Decisión de producto</h2>
                <p className={s.cardLead}>
                  Esta copia no es un megakit. Es un núcleo institucional
                  deliberadamente pequeño, con una sola forma oficial de
                  instalarlo y usarlo.
                </p>
              </div>
              <div className={s.decisionGrid}>
                {DECISIONS.map((item) => (
                  <article key={item.title} className={s.decisionCard}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={s.card} id="paquetes">
              <div className={s.cardHead}>
                <p className={s.kicker}>Dependencias</p>
                <h2 className={s.cardTitle}>Paquetes que instalas</h2>
                <p className={s.cardLead}>
                  Dos artefactos publicables. Nada más es obligatorio para
                  arrancar en HTML.
                </p>
              </div>
              <div className={s.packageGrid}>
                {PACKAGES.map((pkg) => (
                  <article key={pkg.name} className={s.packageCard}>
                    <span className={s.packageRole}>{pkg.role}</span>
                    <p className={s.packageName}>{pkg.name}</p>
                    <p className={s.packageVersion}>v{pkg.version}</p>
                    <p className={s.packageBody}>{pkg.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={s.card} id="pasos">
              <div className={s.cardHead}>
                <p className={s.kicker}>Flujo</p>
                <h2 className={s.cardTitle}>Instalación paso a paso</h2>
                <p className={s.cardLead}>
                  Sigue el orden. Cada bloque explica el <em>qué</em>, el{' '}
                  <em>por qué</em> y el código listo para copiar.
                </p>
              </div>

              <ol className={s.timeline}>
                {STEPS.map((item) => (
                  <li key={item.id} id={item.id} className={s.timelineItem}>
                    <div className={s.timelineIndex} aria-hidden="true">
                      {item.step}
                    </div>
                    <div className={s.timelineBody}>
                      <h3 className={s.stepTitle}>{item.title}</h3>
                      <p className={s.stepDesc}>{item.description}</p>
                      <p className={s.stepWhy}>{item.why}</p>
                      <CodeBlock
                        code={item.code}
                        label={item.id === 'install' ? 'Terminal' : 'HTML'}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className={s.card} id="vivo">
              <div className={s.cardHead}>
                <p className={s.kicker}>Comprobación</p>
                <h2 className={s.cardTitle}>Vista en vivo</h2>
                <p className={s.cardLead}>
                  Si ves estos botones con la marca Gob UI, el runtime de
                  Web Components está cargando bien en esta demo.
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

            <section className={s.card} id="reglas">
              <div className={s.cardHead}>
                <p className={s.kicker}>Calidad</p>
                <h2 className={s.cardTitle}>Buenas prácticas</h2>
                <p className={s.cardLead}>
                  Reglas cortas para que el sistema se vea igual en todos los
                  trámites.
                </p>
              </div>
              <div className={s.rulesPanel}>
                {RULES.map((rule) => (
                  <article key={rule.index} className={s.ruleRow}>
                    <span className={s.ruleIndex}>{rule.index}</span>
                    <div>
                      <p className={s.ruleTitle}>{rule.title}</p>
                      <p className={s.ruleBody}>{rule.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={s.card} id="faq">
              <div className={s.cardHead}>
                <p className={s.kicker}>Soporte</p>
                <h2 className={s.cardTitle}>Problemas comunes</h2>
                <p className={s.cardLead}>
                  Orden de revisión: token → CSS → script module → servidor HTTP.
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
                  Abre el catálogo, elige un componente y copia su snippet HTML.
                </p>
              </div>
              <Link className={s.closingBtn} href="/#componentes">
                Ir a Componentes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
