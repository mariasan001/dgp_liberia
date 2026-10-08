'use client';

import Link from 'next/link';
import { createElement, useState } from 'react';

import {
  BODY_SCALE,
  CODE_LANGUAGES,
  HEADING_SCALE,
  RULES,
  TONE_OPTIONS,
  buildSnippet,
  type CodeLang,
  type TypeLevel,
  type TypeTone,
} from './tipografia-data';
import s from './page.module.css';

function TypeSample({
  level,
  color,
  className,
}: {
  level: TypeLevel;
  color: string;
  className?: string;
}) {
  return createElement(
    level.tag,
    {
      className,
      style: {
        fontSize: level.size,
        fontWeight: Number(level.weight),
        lineHeight: level.line,
        letterSpacing: level.tracking,
        color,
        textTransform: level.id === 'h6' ? 'uppercase' : undefined,
      },
    },
    level.sample,
  );
}

export default function TipografiaPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [tone, setTone] = useState<TypeTone>('ink');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const color = TONE_OPTIONS.find((item) => item.id === tone)?.color ?? '#181511';

  async function copyLevel(level: TypeLevel) {
    const snippet = buildSnippet({ lang, level, tone });
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedKey(level.id);
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
          <h1 className={s.title}>Tipografía</h1>
          <p className={s.hint}>
            Reglas de <strong>Gotham</strong> para titulos y texto. Pasa el mouse y pulsa{' '}
            <strong>Copiar</strong> para obtener el código en <strong>{lang.toUpperCase()}</strong>.
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
                {TONE_OPTIONS.map((option) => {
                  const active = option.id === tone;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${s.colorSwatch} ${active ? s.colorSwatchActive : ''}`}
                      style={{ background: option.swatch }}
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

          <div className={s.fontNote}>
            <div className={s.fontNoteSpecimen} aria-hidden="true">
              <span className={s.fontNoteAa}>Aa</span>
              <span className={s.fontNoteName}>Gotham</span>
            </div>
            <div className={s.fontNoteContent}>
              <p className={s.fontNoteEyebrow}>Familia tipografica</p>
              <p className={s.fontNoteBody}>
                La interfaz usa Gotham con trazo delgado. Si la fuente licenciada no esta cargada,
                el sistema cae a Raleway para no romper la lectura.
              </p>
              <pre className={s.fontNoteCode}>
                <code>font-family: Gotham, Raleway, ui-sans-serif, system-ui, sans-serif;</code>
              </pre>
            </div>
          </div>

          <section className={s.section} aria-label="Escala de titulos">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Titulos H1–H6</h2>
              <p className={s.sectionDesc}>
                Jerarquia completa. Un H1 por vista; el resto ordena secciones sin gritar.
              </p>
            </div>

            <div className={s.scaleList}>
              {HEADING_SCALE.map((level) => (
                <div key={level.id} className={s.scaleRow}>
                  <button type="button" className={s.copyBtn} onClick={() => copyLevel(level)}>
                    {copiedKey === level.id ? 'Copiado' : 'Copiar'}
                  </button>
                  <div className={s.scaleMeta}>
                    <div>
                      <p className={s.scaleTag}>{level.title}</p>
                      <p className={s.scaleCaption}>{level.caption}</p>
                    </div>
                    <p className={s.scaleMetrics}>
                      {level.size} · {level.weight} · lh {level.line}
                    </p>
                  </div>
                  <div className={s.scaleStage}>
                    <TypeSample level={level} color={color} className={s.scaleSample} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={s.section} aria-label="Texto de cuerpo">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Parrafo y apoyo</h2>
              <p className={s.sectionDesc}>
                Lead, body, small y caption para lectura continua y metadatos.
              </p>
            </div>

            <div className={s.scaleList}>
              {BODY_SCALE.map((level) => (
                <div key={level.id} className={s.scaleRow}>
                  <button type="button" className={s.copyBtn} onClick={() => copyLevel(level)}>
                    {copiedKey === level.id ? 'Copiado' : 'Copiar'}
                  </button>
                  <div className={s.scaleMeta}>
                    <div>
                      <p className={s.scaleTag}>{level.title}</p>
                      <p className={s.scaleCaption}>{level.caption}</p>
                    </div>
                    <p className={s.scaleMetrics}>
                      {level.size} · {level.weight} · lh {level.line}
                    </p>
                  </div>
                  <div className={s.scaleStage}>
                    <TypeSample level={level} color={color} className={s.scaleSample} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={s.section} aria-label="Reglas de uso">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Reglas</h2>
              <p className={s.sectionDesc}>
                Criterios para mantener la tipografía delgada, clara y coherente en todo Gob UI.
              </p>
            </div>

            <div className={s.rulesPanel}>
              {RULES.map((rule) => (
                <article key={rule.id} className={s.ruleRow}>
                  <span className={s.ruleIndex}>{rule.index}</span>
                  <div className={s.ruleCopy}>
                    <h3 className={s.ruleTitle}>{rule.title}</h3>
                    <p className={s.ruleBody}>{rule.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
