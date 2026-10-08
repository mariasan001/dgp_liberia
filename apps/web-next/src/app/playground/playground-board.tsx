import { DownloadSimple, PushPin } from '@phosphor-icons/react';

import { playgroundRows } from './playground-data';
import s from './page.module.css';

export function PlaygroundButtonBoard() {
  return (
    <div className={s.buttonBoard}>
      {playgroundRows.map((row) => (
        <div key={row.label} className={s.buttonRow}>
          <span className={s.rowLabel}>{row.label}</span>
          <div className={s.rowCells}>
            {row.items.map((item) => (
              <gob-button key={`${row.label}-${item.text}`} tone={item.tone} appearance={item.appearance}>
                {item.text}
              </gob-button>
            ))}
          </div>
        </div>
      ))}

      <div className={s.buttonRow}>
        <span className={s.rowLabel}>Estados</span>
        <div className={s.rowCells}>
          <gob-button tone="primary" appearance="solid" loading>
            Guardando
          </gob-button>
          <gob-button tone="primary" appearance="solid" disabled>
            No disponible
          </gob-button>
          <gob-button tone="primary" appearance="solid" icon-only aria-label="Marcar expediente">
            <span slot="icon" aria-hidden="true">
              <PushPin weight="thin" size={16} />
            </span>
          </gob-button>
          <gob-button tone="accent" appearance="outline" icon-position="right">
            Descargar oficio
            <span slot="icon" aria-hidden="true">
              <DownloadSimple weight="thin" size={16} />
            </span>
          </gob-button>
        </div>
      </div>
    </div>
  );
}
