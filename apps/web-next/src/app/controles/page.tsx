'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import s from './controles.module.css';

type ChipTone = 'primary' | 'success' | 'error' | 'warning' | 'neutral';

const CHIP_ROWS: { tone: ChipTone; label: string; disabled?: boolean }[] = [
  { tone: 'primary', label: 'Primary' },
  { tone: 'success', label: 'Success' },
  { tone: 'error', label: 'Error' },
  { tone: 'warning', label: 'Warning' },
  { tone: 'neutral', label: 'Disabled', disabled: true },
];

function DismissibleChip({
  tone,
  label,
  disabled,
  onDismiss,
}: {
  tone: ChipTone;
  label: string;
  disabled?: boolean;
  onDismiss: () => void;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const handleDismiss = () => onDismiss();
    node.addEventListener('gob-dismiss', handleDismiss);
    return () => node.removeEventListener('gob-dismiss', handleDismiss);
  }, [onDismiss]);

  return (
    <gob-chip
      ref={(node) => {
        ref.current = node;
      }}
      tone={tone}
      dismissible
      disabled={disabled || undefined}
    >
      {label}
    </gob-chip>
  );
}

export default function ControlesPage() {
  const [hiddenChips, setHiddenChips] = useState<Record<string, boolean>>({});

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <div className={s.heroTop}>
          <div className={s.navChips}>
            <Link className={s.tokensChip} href="/">
              Botones
            </Link>
            <Link className={s.tokensChip} href="/controles">
              Controles
            </Link>
          </div>
          <div className={s.brand}>
            <span className={s.brandMark} aria-hidden="true" />
            <span className={s.brandName}>gob ui</span>
          </div>
        </div>

        <div className={s.heroBody}>
          <h1 className={s.title}>Controles</h1>
          <p className={s.hint}>Checkbox, radio, switch y chips del sistema Gob.</p>
          <p className={s.version}>Versión 1.0 / Librería Gob_v2</p>
        </div>
      </header>

      <section className={s.panel}>
        <div className={s.board}>
          <section className={s.column} aria-label="Checkbox">
            <h2 className={s.columnTitle}>Checkbox</h2>
            <ul className={s.rows}>
              <li className={s.row}>
                <gob-checkbox>Unselected</gob-checkbox>
              </li>
              <li className={s.row}>
                <gob-checkbox checked>Selected</gob-checkbox>
              </li>
              <li className={s.row}>
                <gob-checkbox indeterminate>Indeterminate</gob-checkbox>
              </li>
              <li className={s.row}>
                <gob-checkbox disabled>Inactive Unselected</gob-checkbox>
              </li>
              <li className={s.row}>
                <gob-checkbox checked disabled>
                  Inactive Selected
                </gob-checkbox>
              </li>
              <li className={s.row}>
                <gob-checkbox indeterminate disabled>
                  Inactive Indeterminate
                </gob-checkbox>
              </li>
            </ul>
          </section>

          <section className={s.column} aria-label="Radio button">
            <h2 className={s.columnTitle}>Radio button</h2>
            <ul className={s.rows}>
              <li className={s.row}>
                <gob-radio name="docs-radio-a" value="a">
                  Unselected
                </gob-radio>
              </li>
              <li className={s.row}>
                <gob-radio name="docs-radio-b" value="b" checked>
                  Selected
                </gob-radio>
              </li>
              <li className={s.row}>
                <gob-radio name="docs-radio-c" value="c" disabled>
                  Inactive Unselected
                </gob-radio>
              </li>
              <li className={s.row}>
                <gob-radio name="docs-radio-d" value="d" checked disabled>
                  Inactive Selected
                </gob-radio>
              </li>
            </ul>
          </section>

          <section className={s.column} aria-label="Switch">
            <h2 className={s.columnTitle}>Switch</h2>
            <ul className={s.rows}>
              <li className={s.row}>
                <gob-switch>Inactive</gob-switch>
              </li>
              <li className={s.row}>
                <gob-switch checked>Active</gob-switch>
              </li>
              <li className={s.row}>
                <gob-switch disabled>Inactive Disabled</gob-switch>
              </li>
              <li className={s.row}>
                <gob-switch checked disabled>
                  Active Disabled
                </gob-switch>
              </li>
            </ul>
          </section>

          <section className={s.column} aria-label="Chips">
            <h2 className={s.columnTitle}>Chips</h2>
            <ul className={s.rows}>
              {CHIP_ROWS.map((chip) => {
                if (hiddenChips[chip.label]) {
                  return null;
                }

                return (
                  <li key={chip.label} className={s.row}>
                    <DismissibleChip
                      tone={chip.tone}
                      label={chip.label}
                      disabled={chip.disabled}
                      onDismiss={() => {
                        setHiddenChips((prev) => ({ ...prev, [chip.label]: true }));
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
