'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
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

/** Listo para copiar: solo cambia TU_GITHUB_PACKAGES_TOKEN. */
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

const STARTER_HTML = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gob UI · ejemplo</title>
    <link rel="stylesheet" href="node_modules/@mariasan001/styles/fonts.css" />
    <link rel="stylesheet" href="node_modules/@mariasan001/styles/theme.css" />
    <link rel="stylesheet" href="node_modules/@mariasan001/styles/base.css" />
    <link rel="stylesheet" href="node_modules/@mariasan001/styles/utilities.css" />
  </head>
  <body>
    <main class="gob-container gob-stack" style="padding: 32px; max-width: 640px;">
      <gob-alert
        tone="info"
        title="Trámite de ejemplo"
        description="Formulario simple con componentes Gob UI."
      ></gob-alert>

      <gob-form
        title="Datos del solicitante"
        description="Completa los campos y guarda."
      >
        <gob-form-field variant="labeled" label="Nombre completo">
          <gob-input variant="basic" placeholder="Nombre y apellidos"></gob-input>
        </gob-form-field>

        <gob-form-field variant="labeled" label="Correo">
          <gob-input
            variant="basic"
            type="email"
            placeholder="correo@ejemplo.gob.mx"
          ></gob-input>
        </gob-form-field>

        <gob-form-field variant="labeled" label="Comentarios">
          <gob-textarea
            variant="basic"
            placeholder="Escribe una nota breve"
            rows="3"
          ></gob-textarea>
        </gob-form-field>

        <gob-checkbox label="Acepto el aviso de privacidad"></gob-checkbox>

        <gob-button slot="actions" tone="primary" appearance="outline">
          Cancelar
        </gob-button>
        <gob-button slot="actions" tone="primary" appearance="solid">
          Guardar
        </gob-button>
      </gob-form>
    </main>

    <script type="module">
      import '@mariasan001/ui-wc';
    </script>
  </body>
</html>`;

const TOKEN_GUIDE = [
  {
    title: '1. Abre Settings',
    text: 'En GitHub, clic en tu avatar (arriba a la derecha) y elige Settings.',
    src: '/instalacion/token/01-settings.png',
    alt: 'Perfil de GitHub con el menú abierto y Settings marcado',
    width: 1024,
    height: 513,
  },
  {
    title: '2. Developer settings',
    text: 'Al final del menú izquierdo entra a Developer settings.',
    src: '/instalacion/token/02-developer-settings.png',
    alt: 'Menú de Settings con Developer settings marcado',
    width: 1024,
    height: 524,
  },
  {
    title: '3. Tokens (classic)',
    text: 'En Personal access tokens elige Tokens (classic).',
    src: '/instalacion/token/03-tokens-classic.png',
    alt: 'Developer settings con Tokens classic marcado',
    width: 1024,
    height: 418,
  },
  {
    title: '4. Generate new token (classic)',
    text: 'Clic en Generate new token y elige la opción classic.',
    src: '/instalacion/token/04-generate-classic.png',
    alt: 'Menú Generate new token classic',
    width: 1024,
    height: 137,
  },
  {
    title: '5. Ponle un nombre',
    text: 'En Note escribe algo claro, por ejemplo gob-ui install.',
    src: '/instalacion/token/05-note-name.png',
    alt: 'Campo Note con gob-ui install',
    width: 1024,
    height: 510,
  },
  {
    title: '6. Marca read:packages',
    text: 'En Select scopes activa solo read:packages (para instalar).',
    src: '/instalacion/token/06-read-packages.png',
    alt: 'Scope read packages marcado',
    width: 1024,
    height: 505,
  },
  {
    title: '7. Generate token',
    text: 'Baja y pulsa Generate token. Copia el valor al momento; GitHub no lo vuelve a mostrar completo.',
    src: '/instalacion/token/07-generate-button.png',
    alt: 'Botón Generate token',
    width: 1024,
    height: 700,
  },
] as const;

const FAQ = [
  {
    q: '¿Por qué hace falta un token si el paquete es público?',
    a: 'GitHub Packages exige autenticación en npm aunque el paquete sea público. Sin token en .npmrc, el install falla con 401.',
  },
  {
    q: '¿Puedo compartir mi token con el equipo?',
    a: 'No. Cada persona genera el suyo. Si alguien lo ve o se sube a un repo, revócalo en GitHub y crea uno nuevo.',
  },
  {
    q: '¿Qué permiso debe tener el token?',
    a: 'Para instalar basta read:packages. No actives write:packages ni otros scopes si solo vas a consumir la librería.',
  },
  {
    q: '¿Tokens (classic) o fine-grained?',
    a: 'Usa Tokens (classic) como en la guía. Con fine-grained a veces falla el acceso a GitHub Packages npm; classic + read:packages es el camino estable.',
  },
  {
    q: '¿Dónde va el archivo .npmrc?',
    a: 'En la raíz del proyecto (junto a package.json). Ahí npm/pnpm/yarn lo leen al instalar.',
  },
  {
    q: '¿Hay que instalar los dos paquetes?',
    a: 'Sí. @mariasan001/styles trae tipografía y tema; @mariasan001/ui-wc trae las etiquetas gob-*. Sin uno de los dos, la UI queda incompleta.',
  },
  {
    q: 'npm install falla con 401 o ENEEDAUTH',
    a: 'Revisa .npmrc: scope @mariasan001, registry https://npm.pkg.github.com y _authToken= pegado sin espacios ni comillas. Guarda el archivo y vuelve a instalar.',
  },
  {
    q: 'El install dice que no encuentra @mariasan001/...',
    a: 'Casi siempre falta el .npmrc o el scope está mal escrito. Sin esa línea, npm busca en el registro público y no encuentra el paquete.',
  },
  {
    q: 'Uso pnpm o yarn: ¿cambia algo?',
    a: 'El .npmrc es el mismo. Solo cambia el comando: pnpm add … o yarn add … con las mismas versiones de styles y ui-wc.',
  },
  {
    q: 'Los componentes no se ven o salen sin estilo',
    a: 'Carga los 4 CSS de styles en ese orden, importa @mariasan001/ui-wc, y abre la página con un servidor local. Con doble clic al HTML (file://) suele fallar.',
  },
  {
    q: 'Veo el HTML crudo o etiquetas gob-* sin pintar',
    a: 'El script de ui-wc no está cargando. Revisa la ruta del import y la consola del navegador (errores 404 o de módulo).',
  },
  {
    q: '¿Puedo pegar el token en el código o en el repo?',
    a: 'No. El token va solo en .npmrc local (o en secretos de CI). Agrégalo a .gitignore si hace falta. Nunca lo subas a GitHub.',
  },
  {
    q: '¿El .npmrc se sube al repositorio?',
    a: 'Puedes subir un .npmrc de ejemplo con TU_GITHUB_PACKAGES_TOKEN. No subas uno con el token real. Cada desarrollador pone el suyo en local.',
  },
  {
    q: 'Mi token expiró o dejó de funcionar',
    a: 'En GitHub → Settings → Developer settings → Tokens (classic) revoca el viejo, genera otro con read:packages y actualiza _authToken en .npmrc.',
  },
  {
    q: '¿Cómo actualizo a una versión nueva?',
    a: 'Cambia la versión en el comando de install (o en package.json) y vuelve a instalar. Mantén styles y ui-wc alineados con las versiones de esta guía.',
  },
  {
    q: '¿Sirve en React, Next o solo HTML?',
    a: 'Los componentes son Web Components: funcionan en HTML, React, Next, Vue, etc. En frameworks, importa ui-wc una vez y usa las etiquetas gob-* en el JSX/HTML.',
  },
  {
    q: 'En CI/CD también pide token',
    a: 'Sí. Configura un secreto (por ejemplo NODE_AUTH_TOKEN) y genera el .npmrc en el pipeline con el mismo formato de esta guía.',
  },
  {
    q: 'Instalé bien pero el formulario no se ve como en la demo',
    a: 'Compara tu HTML con el ejemplo: orden de CSS, import de ui-wc y atributos de cada gob-*. Luego revisa Componentes para copiar el markup de cada pieza.',
  },
];

type CodeLang = 'plain' | 'npmrc' | 'shell' | 'html';

function highlightNpmrc(code: string) {
  const lines = code.split('\n');
  return lines.map((line, index) => {
    const eol = index < lines.length - 1 ? '\n' : '';
    const trimmed = line.trim();

    if (trimmed.startsWith('#') || trimmed === '') {
      return (
        <span key={index} className={s.tokCmt}>
          {line}
          {eol}
        </span>
      );
    }

    const eq = line.indexOf('=');
    if (eq === -1) {
      return (
        <span key={index}>
          {line}
          {eol}
        </span>
      );
    }

    const key = line.slice(0, eq);
    const val = line.slice(eq + 1);
    const isToken =
      /TOKEN|CREDENCIAL|ghp_/i.test(val) || val.includes('••••');

    return (
      <span key={index}>
        <span className={s.tokKey}>{key}</span>
        <span className={s.tokOp}>=</span>
        <span className={isToken ? s.tokToken : s.tokVal}>{val}</span>
        {eol}
      </span>
    );
  });
}

function highlightShell(code: string) {
  const lines = code.split('\n');
  return lines.map((line, lineIndex) => {
    const eol = lineIndex < lines.length - 1 ? '\n' : '';
    const parts: ReactNode[] = [];
    const re =
      /(\s+)|(npm|pnpm|yarn)|(install|add|run|dlx)|(@[\w.-]+\/[\w.-]+(?:@[\w.-]+)?)|([^\s]+)/g;
    let match: RegExpExecArray | null;
    let key = 0;
    while ((match = re.exec(line)) !== null) {
      const [, space, mgr, cmd, pkg, other] = match;
      if (space) {
        parts.push(space);
      } else if (mgr) {
        parts.push(
          <span key={key++} className={s.tokCmd}>
            {mgr}
          </span>,
        );
      } else if (cmd) {
        parts.push(
          <span key={key++} className={s.tokKeyword}>
            {cmd}
          </span>,
        );
      } else if (pkg) {
        parts.push(
          <span key={key++} className={s.tokPkg}>
            {pkg}
          </span>,
        );
      } else {
        parts.push(
          <span key={key++} className={s.tokArg}>
            {other}
          </span>,
        );
      }
    }
    return (
      <span key={lineIndex}>
        {parts}
        {eol}
      </span>
    );
  });
}

function highlightHtml(code: string) {
  const nodes: ReactNode[] = [];
  let key = 0;
  let i = 0;

  const push = (className: string | undefined, value: string) => {
    if (!value) return;
    nodes.push(
      className ? (
        <span key={key++} className={className}>
          {value}
        </span>
      ) : (
        <span key={key++}>{value}</span>
      ),
    );
  };

  while (i < code.length) {
    if (code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4);
      const close = end === -1 ? code.length : end + 3;
      push(s.tokCmt, code.slice(i, close));
      i = close;
      continue;
    }

    if (code[i] === '<') {
      const close = code.indexOf('>', i + 1);
      if (close === -1) {
        push(undefined, code.slice(i));
        break;
      }

      const raw = code.slice(i, close + 1);
      if (/^<!doctype/i.test(raw)) {
        push(s.tokTag, raw);
        i = close + 1;
        continue;
      }

      const m = raw.match(/^(<\/?[a-zA-Z][\w:-]*)([\s\S]*?)(\/?>)$/);
      if (!m) {
        push(s.tokTag, raw);
        i = close + 1;
        continue;
      }

      push(s.tokTag, m[1]);
      const mid = m[2];
      const midRe =
        /(\s+)|([a-zA-Z_:][\w:.-]*)|(=)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\/)/g;
      let am: RegExpExecArray | null;
      while ((am = midRe.exec(mid)) !== null) {
        if (am[1]) push(undefined, am[1]);
        else if (am[2]) push(s.tokAttr, am[2]);
        else if (am[3]) push(s.tokOp, am[3]);
        else if (am[4]) push(s.tokStr, am[4]);
        else if (am[5]) push(s.tokTag, am[5]);
      }
      push(s.tokTag, m[3]);
      i = close + 1;
      continue;
    }

    const next = code.indexOf('<', i);
    const end = next === -1 ? code.length : next;
    push(undefined, code.slice(i, end));
    i = end;
  }

  return nodes;
}

function highlightCode(code: string, lang: CodeLang) {
  if (lang === 'npmrc') return highlightNpmrc(code);
  if (lang === 'shell') return highlightShell(code);
  if (lang === 'html') return highlightHtml(code);
  return code;
}

function CodeBlock({
  code,
  label,
  filename,
  lang = 'plain',
  accent,
}: {
  code: string;
  label?: string;
  filename?: string;
  lang?: CodeLang;
  accent?: string;
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
    <div className={s.codeWindow}>
      <div className={s.codeWindowBar}>
        <span className={s.codeDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <div className={s.codeWindowMeta}>
          <span className={s.codeFilename}>{filename ?? label ?? 'code'}</span>
          {accent ? <span className={s.codeAccent}>{accent}</span> : null}
        </div>
        <button type="button" className={s.copyBtn} onClick={() => void onCopy()}>
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className={s.codeWindowBody}>
        <code>{highlightCode(code, lang)}</code>
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

type ExampleView = 'vista' | 'codigo';

export default function InstalacionPage() {
  const [manager, setManager] = useState<Manager>('npm');
  const [exampleView, setExampleView] = useState<ExampleView>('codigo');

  return (
    <div className={s.page}>
      <SiteNav active="instalacion" />

      <header className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.eyebrow}>Documentación</p>
          <h1 className={s.title}>Instalación</h1>
          <p className={s.hint}>
            Empieza por el <strong>token</strong>: cómo obtenerlo, cómo
            configurarlo en <code>.npmrc</code> y cómo instalar Gob UI.
          </p>
        </div>
      </header>

      <div className={s.panelWrap}>
        <div className={s.mainSolo}>
          <section className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>Paso 0 · Acceso</p>
              <h2 className={s.cardTitle}>Obtener un token</h2>
              <p className={s.cardLead}>
                Sin token, <code>npm install</code> no puede bajar los paquetes
                desde GitHub Packages. Cada desarrollador crea el suyo.
              </p>
            </div>

            <div className={s.guideSteps}>
              {TOKEN_GUIDE.map((step) => (
                <article key={step.src} className={s.guideStep}>
                  <h3 className={s.guideStepTitle}>{step.title}</h3>
                  <p className={s.guideStepText}>{step.text}</p>
                  <figure className={s.guideFigure}>
                    <Image
                      className={s.guideImg}
                      src={step.src}
                      alt={step.alt}
                      width={step.width}
                      height={step.height}
                      quality={100}
                      unoptimized
                      priority={step.src.endsWith('01-settings.png')}
                    />
                    <figcaption className={s.guideCaption}>{step.title}</figcaption>
                  </figure>
                </article>
              ))}
            </div>

            <aside className={s.tipBox} aria-label="Importante sobre el token">
              <div className={s.tipHead}>
                <p className={s.tipEyebrow}>Después de Generate token</p>
                <h3 className={s.tipTitle}>Así se ve el token (ejemplo)</h3>
                <p className={s.tipLead}>
                  GitHub lo muestra una sola vez. Cópialo y pégalo en tu{' '}
                  <code>.npmrc</code>. Este valor es ficticio: no lo uses.
                </p>
              </div>

              <div className={s.tipTerminal}>
                <div className={s.tipTerminalBar}>
                  <span className={s.tipTerminalDots} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <p className={s.tipTerminalLabel}>github.com / personal access token</p>
                  <span className={s.tipBadge}>Ejemplo</span>
                </div>
                <div className={s.tipTerminalBody}>
                  <div className={s.tipTokenRow}>
                    <span className={s.tipCheck} aria-hidden="true">
                      ✓
                    </span>
                    <p className={s.tipTokenSample}>
                      <em>ghp_</em>
                      <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                    </p>
                  </div>
                  <pre className={s.tipNpmrcPreview}>
                    <span className={s.cmt}># En tu .npmrc queda así:</span>
                    {'\n'}
                    <span className={s.key}>@mariasan001:registry</span>=
                    <span className={s.val}>https://npm.pkg.github.com</span>
                    {'\n'}
                    <span className={s.key}>//npm.pkg.github.com/:_authToken</span>=
                    <span className={s.val}>ghp_••••••••••••••••••••••••••••••••</span>
                    {'\n'}
                    <span className={s.key}>always-auth</span>=
                    <span className={s.val}>true</span>
                  </pre>
                </div>
              </div>

              <div className={s.tipGrid}>
                <article className={s.tipItem}>
                  <span className={s.tipItemIndex}>01</span>
                  <p className={s.tipItemTitle}>Una sola vez</p>
                  <p className={s.tipItemBody}>
                    Si sales de la página, no lo vuelves a ver completo.
                  </p>
                </article>
                <article className={s.tipItem}>
                  <span className={s.tipItemIndex}>02</span>
                  <p className={s.tipItemTitle}>Va en <code>.npmrc</code></p>
                  <p className={s.tipItemBody}>
                    Sustituye el valor en <code>_authToken</code> (paso
                    siguiente).
                  </p>
                </article>
                <article className={s.tipItem}>
                  <span className={s.tipItemIndex}>03</span>
                  <p className={s.tipItemTitle}>No lo compartas</p>
                  <p className={s.tipItemBody}>
                    Ni en el repo, ni en chats, ni en capturas públicas.
                  </p>
                </article>
                <article className={s.tipItem}>
                  <span className={s.tipItemIndex}>04</span>
                  <p className={s.tipItemTitle}>Si se filtra</p>
                  <p className={s.tipItemBody}>
                    Revócalo en GitHub y genera uno nuevo al instante.
                  </p>
                </article>
              </div>
            </aside>
          </section>

          <section className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>Paso 1 · Configurar</p>
              <h2 className={s.cardTitle}>Cómo se enseña en el proyecto</h2>
              <p className={s.cardLead}>
                Crea un archivo <code>.npmrc</code> en la raíz del proyecto.
                Copia el bloque, pégalo y solo sustituye{' '}
                <code>TU_GITHUB_PACKAGES_TOKEN</code> por tu token.
              </p>
            </div>

            <CodeBlock
              code={NPMRC}
              filename=".npmrc"
              lang="npmrc"
              accent="Copiar y pegar"
            />
          </section>

          <section className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>Paso 2 · Usar</p>
              <h2 className={s.cardTitle}>Instalar y usar la librería</h2>
              <p className={s.cardLead}>
                Con el <code>.npmrc</code> listo, instalas los dos paquetes y
                los enlazas en tu HTML. Copia cada bloque tal cual.
              </p>
            </div>

            <div className={s.usePanel}>
              <div className={s.pkgStrip}>
                <article className={s.pkgChip}>
                  <div className={s.pkgChipTop}>
                    <span className={s.pkgChipRole}>Estilos</span>
                    <span className={s.pkgChipVer}>v{STYLES_VERSION}</span>
                  </div>
                  <code>@mariasan001/styles</code>
                  <p className={s.pkgChipHint}>Tipografía, tema y base</p>
                </article>
                <article className={s.pkgChip}>
                  <div className={s.pkgChipTop}>
                    <span className={s.pkgChipRole}>Componentes</span>
                    <span className={s.pkgChipVer}>v{UI_VERSION}</span>
                  </div>
                  <code>@mariasan001/ui-wc</code>
                  <p className={s.pkgChipHint}>Etiquetas gob-* listas</p>
                </article>
              </div>

              <div className={s.useStep}>
                <div className={s.useStepHead}>
                  <p className={s.useStepNum} aria-hidden="true">
                    2.1
                  </p>
                  <div>
                    <h3 className={s.useStepTitle}>Instalar</h3>
                    <p className={s.useStepText}>
                      Elige el gestor del equipo y copia el comando:
                    </p>
                  </div>
                </div>
                <ManagerTabs value={manager} onChange={setManager} />
                <CodeBlock
                  code={INSTALL_CMDS[manager]}
                  filename="terminal"
                  lang="shell"
                  accent="Copiar"
                />
              </div>

              <div className={s.useStep}>
                <div className={s.useStepHead}>
                  <p className={s.useStepNum} aria-hidden="true">
                    2.2
                  </p>
                  <div>
                    <h3 className={s.useStepTitle}>Enlazar en el HTML</h3>
                    <p className={s.useStepText}>
                      Carga los estilos en este orden y el script de
                      componentes:
                    </p>
                  </div>
                </div>
                <CodeBlock
                  code={IMPORT_CSS}
                  filename="head.html"
                  lang="html"
                  accent="CSS"
                />
                <CodeBlock
                  code={IMPORT_JS}
                  filename="script.html"
                  lang="html"
                  accent="JS"
                />
  <p className={s.useStepText}>
                  Ejemplo corto en el body (alerta + botón):
                </p>
                <CodeBlock
                  code={`<gob-alert
  tone="info"
  title="Listo"
  description="Los componentes ya cargan."
></gob-alert>
<div class="gob-row">
  <gob-button tone="primary" appearance="solid">Guardar</gob-button>
</div>`}
                  filename="body.html"
                  lang="html"
                  accent="Snippet"
                />
              </div>

              <div className={s.useStep}>
                <div className={s.useStepHead}>
                  <p className={s.useStepNum} aria-hidden="true">
                    2.3
                  </p>
                  <div>
                    <h3 className={s.useStepTitle}>Ejemplo completo</h3>
                    <p className={s.useStepText}>
                      Copia el <code>index.html</code> o pasa a{' '}
                      <strong>Vista</strong> para ver cómo se ve. Ábrelo con un
                      servidor local (Vite, Live Server u otro).
                    </p>
                  </div>
                </div>

                <div className={s.tabs} role="tablist" aria-label="Código o vista">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={exampleView === 'codigo'}
                    className={`${s.tab} ${exampleView === 'codigo' ? s.tabActive : ''}`}
                    onClick={() => setExampleView('codigo')}
                  >
                    Código
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={exampleView === 'vista'}
                    className={`${s.tab} ${exampleView === 'vista' ? s.tabActive : ''}`}
                    onClick={() => setExampleView('vista')}
                  >
                    Vista
                  </button>
                </div>

                {exampleView === 'vista' ? (
                  <div className={s.livePreview}>
                    <div className={s.livePreviewBar}>
                      <span className={s.livePreviewDots} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </span>
                      <span className={s.livePreviewLabel}>Vista previa</span>
                    </div>
                    <div className={s.liveStage}>
                      <gob-alert
                        tone="info"
                        title="Trámite de ejemplo"
                        description="Formulario simple con componentes Gob UI."
                      />
                      <gob-form
                        title="Datos del solicitante"
                        description="Completa los campos y guarda."
                      >
                        <gob-form-field
                          variant="labeled"
                          label="Nombre completo"
                        >
                          <gob-input
                            variant="basic"
                            placeholder="Nombre y apellidos"
                          />
                        </gob-form-field>
                        <gob-form-field variant="labeled" label="Correo">
                          <gob-input
                            variant="basic"
                            type="email"
                            placeholder="correo@ejemplo.gob.mx"
                          />
                        </gob-form-field>
                        <gob-form-field variant="labeled" label="Comentarios">
                          <gob-textarea
                            variant="basic"
                            placeholder="Escribe una nota breve"
                            rows={3}
                          />
                        </gob-form-field>
                        <gob-checkbox label="Acepto el aviso de privacidad" />
                        <gob-button
                          slot="actions"
                          tone="primary"
                          appearance="outline"
                        >
                          Cancelar
                        </gob-button>
                        <gob-button
                          slot="actions"
                          tone="primary"
                          appearance="solid"
                        >
                          Guardar
                        </gob-button>
                      </gob-form>
                    </div>
                  </div>
                ) : (
                  <CodeBlock
                    code={STARTER_HTML}
                    filename="index.html"
                    lang="html"
                    accent="Plantilla"
                  />
                )}
              </div>
            </div>
          </section>

          <section className={s.card}>
            <div className={s.cardHead}>
              <p className={s.kicker}>Soporte</p>
              <h2 className={s.cardTitle}>Preguntas frecuentes</h2>
              <p className={s.cardLead}>
                Si algo falla, revisa en este orden: token →{' '}
                <code>.npmrc</code> → install → CSS → script → servidor local.
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
            <div className={s.closingCopy}>
              <p className={s.closingKicker}>Siguiente paso</p>
              <h2 className={s.closingTitle}>Explora el catálogo</h2>
              <p className={s.closingBody}>
                Abre Componentes, elige el que necesites y copia el HTML de la
                demo a tu página.
              </p>
            </div>
            <div className={s.closingActions}>
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
