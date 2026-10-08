'use client';

/**
 * Docs de Encabezado de página — cascarrón canónico = Botones (/botones).
 * Filtro de superficie: con fondo / sin fondo (sin selección de color).
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { PageHeaderSurface } from '@mariasan001/ui-wc';
import '@mariasan001/ui-wc';

import {
  CODE_LANGUAGES,
  HEADER_ATTRS,
  HEADER_EXAMPLES,
  SURFACE_OPTIONS,
  buildSnippet,
  type CodeLang,
  type HeaderExample,
} from './header-data';
import { HeaderDemo } from './header-demo';
import local from './header.module.css';
import s from './page.module.css';

export default function EncabezadoPaginaPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [surface, setSurface] = useState<PageHeaderSurface>('plain');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    void import('@mariasan001/ui-wc');
  }, []);

  async function copyExample(example: HeaderExample) {
    try {
      await navigator.clipboard.writeText(buildSnippet(lang, example, surface));
      setCopiedKey(example.id);
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
          <h1 className={s.title}>Encabezado de página</h1>
          <p className={s.hint}>
            Funcional: migas, estatus y acciones. Pulsa <strong>Copiar</strong>{' '}
            para markup + patron interactivo en <strong>{lang.toUpperCase()}</strong>.
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
              <p className={s.filterLabel}>Fondo</p>
              <div className={s.langRow}>
                {SURFACE_OPTIONS.map((option) => {
                  const active = option.id === surface;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`${s.langChip} ${active ? s.langChipActive : ''}`}
                      aria-pressed={active}
                      onClick={() => setSurface(option.id)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={local.exampleList} aria-label="Ejemplos">
            {HEADER_EXAMPLES.map((example) => (
              <article key={example.id} className={local.exampleCard}>
                <button
                  type="button"
                  className={local.copyBtn}
                  onClick={() => void copyExample(example)}
                >
                  {copiedKey === example.id ? 'Copiado' : 'Copiar'}
                </button>
                <div className={local.exampleMeta}>
                  <h3 className={local.exampleTitle}>{example.title}</h3>
                  <p className={local.exampleDesc}>{example.description}</p>
                </div>
                <div className={local.stage}>
                  <HeaderDemo example={example} surface={surface} />
                </div>
              </article>
            ))}
          </div>

          <section className={s.section} aria-label="Atributos">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Atributos</h2>
              <p className={s.sectionDesc}>
                API de <code>gob-page-header</code>. Slots: <code>breadcrumb</code>,{' '}
                <code>title</code>, <code>meta</code>, <code>description</code> y default
                (acciones).
              </p>
            </div>
            <div className={local.tableWrap}>
              <table className={local.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Default</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {HEADER_ATTRS.map((attr) => (
                    <tr key={attr.name}>
                      <td>
                        <code>{attr.name}</code>
                      </td>
                      <td>{attr.type}</td>
                      <td>
                        <code>{attr.defaultValue}</code>
                      </td>
                      <td>{attr.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
