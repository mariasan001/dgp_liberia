'use client';

/**
 * DOCS SHELL REFERENCE — formato canonico de documentacion Gob UI.
 * No modificar layout, espaciado ni cascaron de esta pagina.
 * Otros componentes (Paginacion, etc.) deben copiar este mismo shell.
 */

import Link from 'next/link';
import { Plus } from '@phosphor-icons/react';
import { Fragment, useEffect, useState } from 'react';

import type { Appearance, Tone } from '@mariasan001/ui-wc';
import '@mariasan001/ui-wc';

import {
  ANATOMY_SAMPLES,
  CODE_LANGUAGES,
  COLOR_OPTIONS,
  CONTENT_SECTIONS,
  MATRIX_COLUMNS,
  MATRIX_ROWS,
  buildSnippet,
  type ButtonState,
  type CodeLang,
  type ContentMode,
} from './botones-data';
import s from './page.module.css';

function PlusIcon() {
  return (
    <span slot="icon" aria-hidden="true">
      <Plus weight="thin" size={16} />
    </span>
  );
}

function MatrixButton({
  tone,
  appearance,
  mode,
  state,
  label = 'Aceptar',
  onPress,
}: {
  tone: Tone;
  appearance: Appearance;
  mode: ContentMode;
  state: ButtonState;
  label?: string;
  onPress?: () => void;
}) {
  const loading = state === 'loading' || undefined;
  const disabled = state === 'disabled' || undefined;
  const demoState = state === 'hover' || state === 'pressed' ? state : undefined;
  const showIcon = mode !== 'basic' && state !== 'loading';
  const interactive = state === 'enabled' && onPress;

  if (mode === 'icon-only') {
    return (
      <gob-button
        tone={tone}
        appearance={appearance}
        icon-only
        aria-label={label}
        loading={loading}
        disabled={disabled}
        demo-state={demoState}
        onClick={interactive ? onPress : undefined}
      >
        {showIcon ? <PlusIcon /> : null}
      </gob-button>
    );
  }

  if (mode === 'with-icon') {
    return (
      <gob-button
        tone={tone}
        appearance={appearance}
        icon-position={state === 'loading' ? undefined : 'left'}
        loading={loading}
        disabled={disabled}
        demo-state={demoState}
        onClick={interactive ? onPress : undefined}
      >
        {showIcon ? <PlusIcon /> : null}
        {label}
      </gob-button>
    );
  }

  return (
    <gob-button
      tone={tone}
      appearance={appearance}
      loading={loading}
      disabled={disabled}
      demo-state={demoState}
      onClick={interactive ? onPress : undefined}
    >
      {label}
    </gob-button>
  );
}

export default function BotonesPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [tone, setTone] = useState<Tone>('primary');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    void import('@mariasan001/ui-wc');
  }, []);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 1800);
    return () => window.clearTimeout(t);
  }, [flash]);

  async function copyCell(mode: ContentMode, appearance: Appearance, state: ButtonState) {
    const key = `${mode}-${appearance}-${state}`;
    const snippet = buildSnippet({ lang, tone, appearance, mode, state });

    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      setCopiedKey(null);
    }
  }

  return (
    <div className={s.page}>
      <header className={s.hero}>
        <div className={s.heroInner}>
          <Link className={s.back} href="/">
            ← Componentes
          </Link>
          <h1 className={s.title}>Botones</h1>
          <p className={s.hint}>
            Clic en un boton habilitado para probarlo. Pulsa <strong>Copiar</strong>{' '}
            para el codigo en <strong>{lang.toUpperCase()}</strong>
            {flash ? ` · ${flash}` : ''}.
          </p>
          <p className={s.version}>Version 1.0 / Libreria Gob_v2</p>
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

            <div className={s.filterBlock}>
              <p className={s.filterLabel}>Color</p>
              <div className={s.colorRow}>
                {COLOR_OPTIONS.map((option) => {
                  const active = option.id === tone;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${s.colorSwatch} ${active ? s.colorSwatchActive : ''}`}
                      style={{ background: option.swatch }}
                      data-tone={option.id}
                      aria-label={option.label}
                      aria-pressed={active}
                      title={option.label}
                      onClick={() => setTone(option.id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={s.spec}>
            <h2 className={s.specTitle}>Anatomia del boton</h2>
            <p className={s.specDesc}>
              Tamano mediano del sistema. Altura, padding y borde alineados para uso real.
            </p>
          </div>

          <div className={s.anatomyGrid}>
            {ANATOMY_SAMPLES.map((sample) => (
              <article key={sample.id} className={s.anatomyCard}>
                <div className={s.anatomyHead}>
                  <h3 className={s.anatomyTitle}>{sample.title}</h3>
                  <p className={s.anatomyCaption}>{sample.caption}</p>
                </div>
                <div className={s.anatomyStage}>
                  <MatrixButton
                    tone={tone}
                    appearance={sample.appearance}
                    mode={sample.mode}
                    state="enabled"
                    label="Habilitado"
                    onPress={() => setFlash(`Clic · ${sample.title}`)}
                  />
                </div>
                <ul className={s.anatomyMetrics}>
                  {sample.metrics.map((metric) => (
                    <li key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {CONTENT_SECTIONS.map((section) => (
            <section key={section.id} className={s.section} aria-label={section.title}>
              <div className={s.sectionHead}>
                <h2 className={s.sectionTitle}>{section.title}</h2>
                <p className={s.sectionDesc}>{section.description}</p>
              </div>

              <div className={s.matrix}>
                <div className={s.matrixCorner} />
                {MATRIX_COLUMNS.map((column) => (
                  <div key={column.id} className={s.matrixColHead}>
                    {column.title}
                  </div>
                ))}

                {MATRIX_ROWS.map((row) => (
                  <Fragment key={`${section.id}-${row.id}`}>
                    <div className={s.matrixRowHead}>{row.title}</div>
                    {MATRIX_COLUMNS.map((column) => {
                      const key = `${section.id}-${column.appearance}-${row.id}`;
                      return (
                        <div key={key} className={s.matrixCell}>
                          <button
                            type="button"
                            className={s.copyBtn}
                            onClick={() => copyCell(section.id, column.appearance, row.id)}
                          >
                            {copiedKey === key ? 'Copiado' : 'Copiar'}
                          </button>
                          <MatrixButton
                            tone={tone}
                            appearance={column.appearance}
                            mode={section.id}
                            state={row.id}
                            onPress={
                              row.id === 'enabled'
                                ? () =>
                                    setFlash(
                                      `Clic · ${section.title} / ${column.title}`,
                                    )
                                : undefined
                            }
                          />
                        </div>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
            </section>
          ))}
        </section>
      </div>
    </div>
  );
}
