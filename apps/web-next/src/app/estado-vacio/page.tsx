'use client';

/**
 * Docs de Estado vacio — cascaron canonico = Botones (/botones).
 * Color de marca fijo (vino + dorado); sin selector de tone.
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';

import '@mariasan001/ui-wc';

import {
  CODE_LANGUAGES,
  EMPTY_ATTRS,
  EMPTY_EXAMPLES,
  buildSnippet,
  type CodeLang,
  type EmptyExample,
} from './empty-data';
import { EmptyDemo } from './empty-demo';
import local from './empty.module.css';
import s from './page.module.css';

const BRAND_TONE = 'primary' as const;

export default function EstadoVacioPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    void import('@mariasan001/ui-wc');
  }, []);

  async function copyExample(example: EmptyExample) {
    try {
      await navigator.clipboard.writeText(
        buildSnippet(lang, example, BRAND_TONE),
      );
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
          <h1 className={s.title}>Estado vacio</h1>
          <p className={s.hint}>
            Funcional: vacios utiles con CTA y semaforo. Pulsa{' '}
            <strong>Copiar</strong> para markup en <strong>{lang.toUpperCase()}</strong>.
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
          </div>

          <div className={local.exampleList} aria-label="Ejemplos">
            {EMPTY_EXAMPLES.map((example) => (
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
                  <EmptyDemo example={example} />
                </div>
              </article>
            ))}
          </div>

          <section className={s.section} aria-label="Atributos">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Atributos</h2>
              <p className={s.sectionDesc}>
                API de <code>gob-empty-state</code>. Contenido con clases{' '}
                <code>gob-es-inner</code>, <code>gob-es-icon</code>,{' '}
                <code>gob-es-pill</code>, <code>gob-es-btn</code>.
              </p>
            </div>
            <div className={local.tableWrap}>
              <table className={local.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Default</th>
                    <th>Descripcion</th>
                  </tr>
                </thead>
                <tbody>
                  {EMPTY_ATTRS.map((attr) => (
                    <tr key={attr.name}>
                      <td>
                        <code>{attr.name}</code>
                      </td>
                      <td>{attr.type}</td>
                      <td>{attr.defaultValue}</td>
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
