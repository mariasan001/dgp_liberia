'use client';

import type { GridGap } from '@mariasan001/ui-wc';

import type { GridExample } from './grid-data';
import local from './grid.module.css';

export function GridDemo({
  example,
  gap,
}: {
  example: GridExample;
  gap: GridGap;
}) {
  return (
    <div className={local.stageInner}>
      <gob-grid
        key={`${example.id}-${gap}`}
        variant={example.variant}
        gap={gap}
      >
        {Array.from({ length: example.cells }, (_, index) => (
          <div key={index} className={local.cell}>
            Celda {index + 1}
          </div>
        ))}
      </gob-grid>
    </div>
  );
}
