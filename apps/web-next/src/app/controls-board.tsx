'use client';

import { useEffect, useRef, useState } from 'react';

import type { ChipTone } from '@mariasan001/ui-wc';
import '@mariasan001/ui-wc';

import s from './controls-board.module.css';

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

export function ControlsBoard() {
  const [hiddenChips, setHiddenChips] = useState<Record<string, boolean>>({});

  return (
    <section className={s.section} aria-label="Controles">
      <div className={s.head}>
        <p className={s.eyebrow}>Controles</p>
        <h2 className={s.title}>Checkbox, radio, switch y chips</h2>
        <p className={s.desc}>
          Estados activos e inactivos para formularios y filtros del sistema.
        </p>
      </div>

      <div className={s.board}>
        <div className={s.column}>
          <h3 className={s.columnTitle}>Checkbox</h3>
          <ul className={s.rows}>
            <li>
              <gob-checkbox>Unselected</gob-checkbox>
            </li>
            <li>
              <gob-checkbox checked>Selected</gob-checkbox>
            </li>
            <li>
              <gob-checkbox indeterminate>Indeterminate</gob-checkbox>
            </li>
            <li>
              <gob-checkbox disabled>Inactive Unselected</gob-checkbox>
            </li>
            <li>
              <gob-checkbox checked disabled>
                Inactive Selected
              </gob-checkbox>
            </li>
            <li>
              <gob-checkbox indeterminate disabled>
                Inactive Indeterminate
              </gob-checkbox>
            </li>
          </ul>
        </div>

        <div className={s.column}>
          <h3 className={s.columnTitle}>Radio button</h3>
          <ul className={s.rows}>
            <li>
              <gob-radio name="home-radio-a" value="a">
                Unselected
              </gob-radio>
            </li>
            <li>
              <gob-radio name="home-radio-b" value="b" checked>
                Selected
              </gob-radio>
            </li>
            <li>
              <gob-radio name="home-radio-c" value="c" disabled>
                Inactive Unselected
              </gob-radio>
            </li>
            <li>
              <gob-radio name="home-radio-d" value="d" checked disabled>
                Inactive Selected
              </gob-radio>
            </li>
          </ul>
        </div>

        <div className={s.column}>
          <h3 className={s.columnTitle}>Switch</h3>
          <ul className={s.rows}>
            <li>
              <gob-switch>Inactive</gob-switch>
            </li>
            <li>
              <gob-switch checked>Active</gob-switch>
            </li>
            <li>
              <gob-switch disabled>Inactive Disabled</gob-switch>
            </li>
            <li>
              <gob-switch checked disabled>
                Active Disabled
              </gob-switch>
            </li>
          </ul>
        </div>

        <div className={s.column}>
          <h3 className={s.columnTitle}>Chips</h3>
          <ul className={s.rows}>
            {CHIP_ROWS.map((chip) => {
              if (hiddenChips[chip.label]) {
                return null;
              }

              return (
                <li key={chip.label}>
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
        </div>
      </div>
    </section>
  );
}
