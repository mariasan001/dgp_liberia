'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  CODE_LANGUAGES,
  ICON_CATEGORIES,
  ICON_RULES,
  INSTALL_BY_LANG,
  buildIconSnippet,
  type CodeLang,
  type IconItem,
} from './iconografia-data';
import s from './page.module.css';

export default function IconografiaPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const install = INSTALL_BY_LANG[lang];

  const totalIcons = useMemo(
    () => ICON_CATEGORIES.reduce((sum, category) => sum + category.icons.length, 0),
    [],
  );

  async function copyText(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      setCopiedKey(null);
    }
  }

  function copyIcon(icon: IconItem) {
    void copyText(icon.id, buildIconSnippet(lang, icon));
  }

  return (
    <div className={s.page}>
      <header className={s.hero}>
        <div className={s.heroInner}>
          <Link className={s.back} href="/">
            ← Componentes
          </Link>
          <h1 className={s.title}>Iconografia</h1>
          <p className={s.hint}>
            <strong>Phosphor</strong> en peso <strong>thin</strong>. Cambia el lenguaje para ver su
            instalacion y copia cada icono en <strong>{lang.toUpperCase()}</strong>.
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

          <section className={s.install} aria-label={install.title}>
            <div className={s.installHead}>
              <div className={s.installCopy}>
                <h2 className={s.installTitle}>{install.title}</h2>
                <p className={s.installLead}>
                  Paquete oficial Phosphor thin para {lang.toUpperCase()}.
                </p>
              </div>
              <code className={s.installPkg}>{install.packageName}</code>
            </div>
            <ol className={s.installSteps}>
              {install.steps.map((step, index) => (
                <li key={step} className={s.installStep}>
                  <span className={s.installStepIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className={s.installCodeWrap}>
              <button
                type="button"
                className={s.copyBtn}
                onClick={() => copyText(`install-${lang}`, install.snippet)}
              >
                {copiedKey === `install-${lang}` ? 'Copiado' : 'Copiar'}
              </button>
              <pre className={s.installCode}>
                <code>{install.snippet}</code>
              </pre>
            </div>
          </section>

          <p className={s.note}>
            Catalogo curado Gob UI ({totalIcons} iconos). La libreria completa Phosphor esta en{' '}
            <a href="https://phosphoricons.com" target="_blank" rel="noreferrer">
              phosphoricons.com
            </a>
            . Siempre <strong>weight thin</strong>.
          </p>

          {ICON_CATEGORIES.map((category) => (
            <section key={category.id} className={s.section} aria-label={category.title}>
              <div className={s.sectionHead}>
                <h2 className={s.sectionTitle}>{category.title}</h2>
                <p className={s.sectionDesc}>{category.description}</p>
              </div>
              <div className={s.iconGrid}>
                {category.icons.map((icon) => {
                  const IconComp = icon.Icon;
                  return (
                    <article key={icon.id} className={s.iconCard}>
                      <button type="button" className={s.copyBtn} onClick={() => copyIcon(icon)}>
                        {copiedKey === icon.id ? 'Copiado' : 'Copiar'}
                      </button>
                      <div className={s.iconPreview}>
                        <IconComp weight="thin" size={28} />
                      </div>
                      <p className={s.iconName}>{icon.name}</p>
                      <p className={s.iconMeta}>
                        {lang === 'html' ? icon.webClass : icon.reactName}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}

          <section className={s.section} aria-label="Reglas de iconografia">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Reglas</h2>
              <p className={s.sectionDesc}>
                Criterios para mantener iconos delgados, legibles y coherentes con Gob UI.
              </p>
            </div>
            <div className={s.rulesPanel}>
              {ICON_RULES.map((rule) => (
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
