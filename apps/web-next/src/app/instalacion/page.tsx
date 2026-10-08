'use client';

import Link from 'next/link';
import { useState } from 'react';

import s from './page.module.css';

type CodeLang = 'html' | 'react' | 'vue' | 'angular';

const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

const INSTALL: Record<
  CodeLang,
  { title: string; packageName: string; steps: string[]; snippet: string }
> = {
  html: {
    title: 'Instalacion HTML',
    packageName: '@mariasan001/ui-wc',
    steps: [
      'Carga el paquete de web components Gob UI.',
      'Importa el theme CSS para tokens y tipografia.',
      'Usa las etiquetas gob-* directamente en el markup.',
    ],
    snippet: `<!-- Estilos Gob UI -->
<link rel="stylesheet" href="path/to/@mariasan001/styles/theme.css" />

<script type="module">
  import '@mariasan001/ui-wc';
</script>

<gob-button tone="primary" appearance="solid">Aceptar</gob-button>`,
  },
  react: {
    title: 'Instalacion React',
    packageName: '@mariasan001/ui-wc',
    steps: [
      'Instala ui-wc y styles en el monorepo o desde el registry.',
      'Importa theme/base una vez en el layout.',
      'Renderiza gob-button y demas CE en JSX.',
    ],
    snippet: `pnpm add @mariasan001/ui-wc @mariasan001/styles

import '@mariasan001/styles/theme.css';
import '@mariasan001/ui-wc';

export function Accion() {
  return (
    <gob-button tone="primary" appearance="solid">
      Aceptar
    </gob-button>
  );
}`,
  },
  vue: {
    title: 'Instalacion Vue',
    packageName: '@mariasan001/ui-wc',
    steps: [
      'Instala el paquete de web components.',
      'Registra custom elements en compilerOptions.',
      'Importa el theme globalmente.',
    ],
    snippet: `pnpm add @mariasan001/ui-wc @mariasan001/styles

// main.ts
import '@mariasan001/styles/theme.css';
import '@mariasan001/ui-wc';

// En template
<gob-button tone="primary" appearance="solid">Aceptar</gob-button>`,
  },
  angular: {
    title: 'Instalacion Angular',
    packageName: '@mariasan001/ui-wc',
    steps: [
      'Instala ui-wc como dependencia.',
      'Activa CUSTOM_ELEMENTS_SCHEMA en el modulo/standalone.',
      'Importa el theme en styles globales.',
    ],
    snippet: `pnpm add @mariasan001/ui-wc @mariasan001/styles

// app.config / module
schemas: [CUSTOM_ELEMENTS_SCHEMA]

import '@mariasan001/ui-wc';

<gob-button tone="primary" appearance="solid">Aceptar</gob-button>`,
  },
};

export default function InstalacionPage() {
  const [lang, setLang] = useState<CodeLang>('react');
  const [copied, setCopied] = useState(false);
  const install = INSTALL[lang];

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(install.snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={s.page}>
      <header className={s.hero}>
        <div className={s.heroInner}>
          <Link className={s.back} href="/">
            ← Componentes
          </Link>
          <h1 className={s.title}>Instalacion</h1>
          <p className={s.hint}>
            Como meter <strong>Gob UI</strong> en tu stack. Cambia el lenguaje y copia el snippet.
          </p>
          <p className={s.version}>Version 0.1 / Libreria Gob_v2</p>
        </div>
      </header>

      <div className={s.panelWrap}>
        <section className={s.panel}>
          <div className={s.filters}>
            <div className={s.filterBlock}>
              <p className={s.filterLabel}>Lenguaje</p>
              <div className={s.langRow}>
                {CODE_LANGUAGES.map((option) => {
                  const active = option.id === lang;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${s.langChip} ${active ? s.langChipActive : ''}`}
                      aria-pressed={active}
                      onClick={() => setLang(option.id)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <section className={s.section} aria-label={install.title}>
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>{install.title}</h2>
              <p className={s.sectionDesc}>
                Paquete <code>{install.packageName}</code> + styles para tokens.
              </p>
            </div>

            <ol style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 8, color: '#6b665f', fontSize: 14 }}>
              {install.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className={s.copyBtn}
                style={{ position: 'absolute', top: 12, right: 12, opacity: 1 }}
                onClick={() => void copySnippet()}
              >
                {copied ? 'Copiado' : 'Copiar'}
              </button>
              <pre
                style={{
                  margin: 0,
                  padding: 18,
                  borderRadius: 14,
                  border: '1px solid #ebebeb',
                  background: '#f6f6f6',
                  overflowX: 'auto',
                }}
              >
                <code style={{ fontFamily: 'var(--gob-font-mono, ui-monospace, Menlo, monospace)', fontSize: 12, lineHeight: 1.6, color: '#181511', whiteSpace: 'pre' }}>
                  {install.snippet}
                </code>
              </pre>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
