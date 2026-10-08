'use client';

import { useCallback, useState } from 'react';

import type { Appearance, Tone } from '@mariasan001/ui-wc';

import {
  APPEARANCE_COLUMNS,
  STATE_ROWS,
  buildSnippet,
  type ContentMode,
  type CodeLanguage,
} from './button-data';
import s from './page.module.css';

type ButtonMatrixProps = {
  tone: Tone;
  language: CodeLanguage;
  contentMode: ContentMode;
};

type CellProps = {
  tone: Tone;
  language: CodeLanguage;
  contentMode: ContentMode;
  appearance: Appearance;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  demo?: 'hover' | 'pressed';
};

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  document.body.removeChild(area);
}

function ButtonCell({
  tone,
  language,
  contentMode,
  appearance,
  label,
  disabled,
  loading,
  demo,
}: CellProps) {
  const [copied, setCopied] = useState(false);

  const snippet = buildSnippet({
    tone,
    appearance,
    label,
    contentMode,
    disabled,
    loading,
    language,
  });

  const onCopy = useCallback(async () => {
    try {
      await copyText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }, [snippet]);

  const showIcon =
    !loading && (contentMode === 'icon' || contentMode === 'icon-only');
  const showText = contentMode !== 'icon-only';
  const iconOnly = contentMode === 'icon-only';

  return (
    <div className={s.cell}>
      <gob-button
        tone={tone}
        appearance={appearance}
        disabled={disabled || undefined}
        loading={loading || undefined}
        data-preview={demo}
        icon-only={iconOnly || undefined}
        icon-position={contentMode === 'icon' || contentMode === 'icon-only' ? 'left' : undefined}
        aria-label={iconOnly ? label : undefined}
      >
        {showIcon ? (
          <span slot="icon" aria-hidden="true">
            +
          </span>
        ) : null}
        {showText ? label : null}
      </gob-button>

      <button type="button" className={s.copyBtn} onClick={onCopy} aria-label="Copiar codigo">
        {copied ? 'Listo' : 'Copiar'}
      </button>
    </div>
  );
}

export function ButtonMatrix({ tone, language, contentMode }: ButtonMatrixProps) {
  return (
    <div className={s.matrix} role="table" aria-label="Matriz de variantes del boton">
      <div className={s.matrixHead} role="row">
        <span className={s.corner} role="columnheader" />
        {APPEARANCE_COLUMNS.map((col) => (
          <span key={col.id} className={s.colLabel} role="columnheader">
            {col.label}
          </span>
        ))}
      </div>

      {STATE_ROWS.map((row) => (
        <div key={row.id} className={s.matrixRow} role="row">
          <span className={s.rowLabel} role="rowheader">
            {row.label}
          </span>
          {APPEARANCE_COLUMNS.map((col) => (
            <div key={`${row.id}-${col.id}`} className={s.matrixCell} role="cell">
              <ButtonCell
                tone={tone}
                language={language}
                contentMode={contentMode}
                appearance={col.appearance}
                label="Aceptar"
                disabled={row.disabled}
                loading={row.loading}
                demo={row.demo}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
