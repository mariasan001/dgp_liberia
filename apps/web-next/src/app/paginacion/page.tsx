'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { PaginationVariant, Tone } from '@mariasan001/ui-wc';
import '@mariasan001/ui-wc';

import {
  ANATOMY_SAMPLES,
  CODE_LANGUAGES,
  COLOR_OPTIONS,
  CONTENT_SECTIONS,
  buildSnippet,
  getVariant,
  type CodeLang,
} from './pagination-data';
import { PaginationPreview } from './pagination-preview';
import s from './page.module.css';

export default function PaginacionPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [tone, setTone] = useState<Tone>('primary');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [pages, setPages] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      [...ANATOMY_SAMPLES, ...CONTENT_SECTIONS.flatMap((section) => section.variants.map(getVariant))].map(
        (item) => [item.id, item.page],
      ),
    ),
  );

  useEffect(() => {
    void import('@mariasan001/ui-wc');
  }, []);

  async function copyVariant(variant: PaginationVariant) {
    const demo = getVariant(variant);
    const page = pages[variant] ?? demo.page;
    const snippet = buildSnippet({ lang, tone, variant, page, total: demo.total });

    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedKey(variant);
      window.setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      setCopiedKey(null);
    }
  }

  function renderPreview(variant: PaginationVariant) {
    const demo = getVariant(variant);
    return (
      <PaginationPreview
        variant={variant}
        tone={tone}
        lang="es"
        page={pages[variant] ?? demo.page}
        total={demo.total}
        onPageChange={(nextPage) => {
          setPages((current) => ({ ...current, [variant]: nextPage }));
        }}
      />
    );
  }

  return (
    <div className={s.page}>
      <header className={s.hero}>
        <div className={s.heroInner}>
          <Link className={s.back} href="/">
            ← Componentes
          </Link>
          <h1 className={s.title}>Paginación</h1>
          <p className={s.hint}>
            Pasa el mouse sobre una variante y pulsa <strong>Copiar</strong> para obtener el código en{' '}
            <strong>{lang.toUpperCase()}</strong>.
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
            <h2 className={s.specTitle}>Anatomia de la paginación</h2>
            <p className={s.specDesc}>
              Tres formas base del sistema. Altura, gap y controles alineados para listados reales.
            </p>
          </div>

          <div className={s.anatomyGrid}>
            {ANATOMY_SAMPLES.map((sample) => (
              <article key={sample.id} className={s.anatomyCard}>
                <div className={s.anatomyHead}>
                  <h3 className={s.anatomyTitle}>{sample.title}</h3>
                  <p className={s.anatomyCaption}>{sample.caption}</p>
                </div>
                <div className={s.anatomyStage}>{renderPreview(sample.id)}</div>
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

              <div className={s.variantList}>
                {section.variants.map((variantId) => {
                  const variant = getVariant(variantId);
                  return (
                    <div key={variant.id} className={s.variantRow}>
                      <button
                        type="button"
                        className={s.copyBtn}
                        onClick={() => copyVariant(variant.id)}
                      >
                        {copiedKey === variant.id ? 'Copiado' : 'Copiar'}
                      </button>
                      <div className={s.variantMeta}>
                        <h3 className={s.variantName}>{variant.title}</h3>
                        <p className={s.variantCaption}>{variant.description}</p>
                      </div>
                      <div className={s.variantStage}>{renderPreview(variant.id)}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </section>
      </div>
    </div>
  );
}
