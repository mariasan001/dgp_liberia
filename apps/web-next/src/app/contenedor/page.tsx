'use client';

/**
 * Docs de Contenedor — cascarrón canónico = Botones (/botones).
 * Caracteristicas: radio y sombra (sin selección de color).
 */

import Link from 'next/link';
import { useEffect, useState } from 'react';

import '@mariasan001/ui-wc';

import {
  CODE_LANGUAGES,
  CONTAINER_ATTRS,
  CONTAINER_EXAMPLES,
  RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  buildSnippet,
  type CodeLang,
  type ContainerExample,
} from './container-data';
import { ContainerDemo } from './container-demo';
import local from './container.module.css';
import s from './page.module.css';

export default function ContenedorPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [radius, setRadius] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    void import('@mariasan001/ui-wc');
  }, []);

  async function copyExample(example: ContainerExample) {
    try {
      await navigator.clipboard.writeText(buildSnippet(lang, example, radius, shadow));
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
          <h1 className={s.title}>Contenedor</h1>
          <p className={s.hint}>
            Anchos y márgenes consistentes de página. Pasa el mouse y pulsa{' '}
            <strong>Copiar</strong> para el código en <strong>{lang.toUpperCase()}</strong>.
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
              <p className={s.filterLabel}>Radio</p>
              <div className={s.langRow}>
                {RADIUS_OPTIONS.map((option) => {
                  const active = option.id === radius;
                  return (
                    <button
                      key={String(option.id)}
                      type="button"
                      className={`${s.langChip} ${active ? s.langChipActive : ''}`}
                      aria-pressed={active}
                      onClick={() => setRadius(option.id)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={s.filterBlock}>
              <p className={s.filterLabel}>Sombra</p>
              <div className={s.langRow}>
                {SHADOW_OPTIONS.map((option) => {
                  const active = option.id === shadow;
                  return (
                    <button
                      key={String(option.id)}
                      type="button"
                      className={`${s.langChip} ${active ? s.langChipActive : ''}`}
                      aria-pressed={active}
                      onClick={() => setShadow(option.id)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={local.exampleList} aria-label="Ejemplos">
            {CONTAINER_EXAMPLES.map((example) => (
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
                <ContainerDemo example={example} radius={radius} shadow={shadow} />
              </article>
            ))}
          </div>

          <section className={s.section} aria-label="Atributos">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Atributos</h2>
              <p className={s.sectionDesc}>
                API de <code>gob-container</code>. El contenido va en el slot por defecto.
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
                  {CONTAINER_ATTRS.map((attr) => (
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
