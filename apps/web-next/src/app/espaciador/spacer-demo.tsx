'use client';

import type { SpacerExample } from './spacer-data';
import local from './spacer.module.css';

export function SpacerDemo({ example }: { example: SpacerExample }) {
  const horizontal = example.variant === 'horizontal';

  return (
    <div className={horizontal ? local.stageInnerHorizontal : local.stageInner}>
      {horizontal ? (
        <>
          <span className={local.sample}>Inicio</span>
          <gob-spacer key={example.id} variant={example.variant} />
          <span className={local.sample}>Fin</span>
        </>
      ) : (
        <>
          <span className={local.sample}>Bloque superior</span>
          <gob-spacer key={example.id} variant={example.variant} />
          <span className={local.sample}>Bloque inferior</span>
        </>
      )}
    </div>
  );
}
