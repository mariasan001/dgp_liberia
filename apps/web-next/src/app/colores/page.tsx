'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  BRAND_COLORS,
  CODE_LANGUAGES,
  COLOR_RULES,
  SEMAPHORE_COLORS,
  SURFACE_COLORS,
  TEXT_COLORS,
  buildColorSnippet,
  type CodeLang,
  type ColorSwatch,
  type SemaphoreColor,
} from './colores-data';
import s from './page.module.css';

function ColorRow({
  color,
  copied,
  onCopy,
}: {
  color: ColorSwatch;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <article className={s.colorRow}>
      <button type="button" className={s.copyBtn} onClick={onCopy}>
        {copied ? 'Copiado' : 'Copiar'}
      </button>
      <div className={s.colorBlock} style={{ background: color.hex }} aria-hidden="true" />
      <div className={s.colorCopy}>
        <div className={s.colorTitles}>
          <h3 className={s.colorName}>{color.name}</h3>
          <p className={s.colorRole}>{color.role}</p>
        </div>
        <div className={s.colorCodes}>
          <code className={s.colorHex}>{color.hex}</code>
          <code className={s.colorToken}>{color.token}</code>
        </div>
      </div>
    </article>
  );
}

function SemaphoreRow({
  color,
  copied,
  onCopy,
}: {
  color: SemaphoreColor;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <article className={s.semRow}>
      <button type="button" className={s.copyBtn} onClick={onCopy}>
        {copied ? 'Copiado' : 'Copiar'}
      </button>
      <div className={s.semVisual}>
        <div className={s.semSolid} style={{ background: color.hex }}>
          <span>Solido</span>
        </div>
        <div className={s.semSoft} style={{ background: color.bgHex }}>
          <span>Soft</span>
        </div>
      </div>
      <div className={s.semCopy}>
        <div className={s.semTitles}>
          <p className={s.semEyebrow}>{color.role}</p>
          <h3 className={s.semName}>{color.name}</h3>
          <p className={s.semMeaning}>{color.meaning}</p>
        </div>
        <div className={s.semCodes}>
          <div className={s.semCodeItem}>
            <span>Solido</span>
            <code>{color.hex}</code>
            <code>{color.token}</code>
          </div>
          <div className={s.semCodeItem}>
            <span>Soft</span>
            <code>{color.bgHex}</code>
            <code>{color.bgToken}</code>
          </div>
        </div>
        <div className={s.semGuide}>
          <p>
            <strong>Usar</strong> {color.doUse}
          </p>
          <p>
            <strong>Evitar</strong> {color.dontUse}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ColoresPage() {
  const [lang, setLang] = useState<CodeLang>('html');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copyColor(color: ColorSwatch) {
    const snippet = buildColorSnippet({ lang, token: color.token, hex: color.hex });
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedKey(color.id);
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
          <h1 className={s.title}>Colores</h1>
          <p className={s.hint}>
            Escala de marca, superficies y <strong>semaforizacion</strong>. Pasa el mouse y pulsa{' '}
            <strong>Copiar</strong> para obtener el token en <strong>{lang.toUpperCase()}</strong>.
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

          <div className={s.ramp} aria-hidden="true">
            {[...BRAND_COLORS.slice(0, 5), ...SEMAPHORE_COLORS.map((c) => ({ hex: c.hex }))].map(
              (item, index) => (
                <span key={`${item.hex}-${index}`} style={{ background: item.hex }} />
              ),
            )}
          </div>

          <section className={s.section} aria-label="Marca">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Marca</h2>
              <p className={s.sectionDesc}>
                Escala institucional: vino primary, acento dorado y neutros de apoyo.
              </p>
            </div>
            <div className={s.colorPanel}>
              {BRAND_COLORS.map((color) => (
                <ColorRow
                  key={color.id}
                  color={color}
                  copied={copiedKey === color.id}
                  onCopy={() => copyColor(color)}
                />
              ))}
            </div>
          </section>

          <section className={s.section} aria-label="Superficies">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Superficies</h2>
              <p className={s.sectionDesc}>
                Fondos de página, paneles y bordes para construir layouts sin inventar grises.
              </p>
            </div>
            <div className={s.colorPanel}>
              {SURFACE_COLORS.map((color) => (
                <ColorRow
                  key={color.id}
                  color={color}
                  copied={copiedKey === color.id}
                  onCopy={() => copyColor(color)}
                />
              ))}
            </div>
          </section>

          <section className={s.section} aria-label="Texto">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Texto</h2>
              <p className={s.sectionDesc}>
                Jerarquia de lectura. En tipografía de contenido, preferir negro y gris claro.
              </p>
            </div>
            <div className={s.colorPanel}>
              {TEXT_COLORS.map((color) => (
                <ColorRow
                  key={color.id}
                  color={color}
                  copied={copiedKey === color.id}
                  onCopy={() => copyColor(color)}
                />
              ))}
            </div>
          </section>

          <section className={s.section} aria-label="Semaforizacion">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Semaforizacion</h2>
              <p className={s.sectionDesc}>
                Estados semanticos: éxito, atencion, critico e informativo. Cada uno trae color
                solido y fondo soft.
              </p>
            </div>
            <div className={s.semPanel}>
              {SEMAPHORE_COLORS.map((color) => (
                <SemaphoreRow
                  key={color.id}
                  color={color}
                  copied={copiedKey === color.id}
                  onCopy={() => copyColor(color)}
                />
              ))}
            </div>
          </section>

          <section className={s.section} aria-label="Reglas de color">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Reglas</h2>
              <p className={s.sectionDesc}>
                Criterios para aplicar la escala sin romper marca ni semáforo.
              </p>
            </div>
            <div className={s.rulesPanel}>
              {COLOR_RULES.map((rule) => (
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
