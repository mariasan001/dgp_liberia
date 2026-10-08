'use client';

/**
 * Docs de Lista — cascarrón canónico = Botones (/botones).
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { Tone } from '@mariasan001/ui-wc';
import '@mariasan001/ui-wc';

import {
  CODE_LANGUAGES,
  COLOR_OPTIONS,
  LIST_ATTRS,
  LIST_EXAMPLES,
  buildSnippet,
  type CodeLang,
  type ListExample,
} from './list-data';
import { ListDemo } from './list-demo';
import local from './list.module.css';
import s from './page.module.css';

export default function ListaPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [tone, setTone] = useState<Tone>('primary');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    void import('@mariasan001/ui-wc');
  }, []);

  async function copyExample(example: ListExample) {
    try {
      await navigator.clipboard.writeText(buildSnippet(lang, example, tone));
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
          <h1 className={s.title}>Lista</h1>
          <p className={s.hint}>
            Funcional: selección, meta y acciones por fila. Pulsa{' '}
            <strong>Copiar</strong> para markup + patron interactivo en{' '}
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

          <div className={local.exampleList} aria-label="Ejemplos">
            {LIST_EXAMPLES.map((example) => (
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
                  <ListDemo example={example} tone={tone} />
                </div>
              </article>
            ))}
          </div>

          <section className={s.section} aria-label="Atributos">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Atributos</h2>
              <p className={s.sectionDesc}>
                API de <code>gob-list</code>. Contenido en light DOM con clases{' '}
                <code>gob-list-item</code>, <code>gob-list-avatar</code>,{' '}
                <code>gob-list-meta</code> y <code>gob-list-action</code>.
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
                  {LIST_ATTRS.map((attr) => (
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
