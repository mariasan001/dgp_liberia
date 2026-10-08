'use client';

import type { DividerTone } from '@mariasan001/ui-wc';

import type { DividerExample } from './divider-data';
import local from './divider.module.css';

export function DividerDemo({
  example,
  tone,
}: {
  example: DividerExample;
  tone: DividerTone;
}) {
  const vertical = example.variant === 'vertical';

  return (
    <div className={vertical ? local.stageInnerVertical : local.stageInner}>
      {vertical ? (
        <>
          <span className={local.sample}>Exportar</span>
          <gob-divider
            key={`${example.id}-${tone}`}
            variant={example.variant}
            tone={tone}
          />
          <span className={local.sample}>Compartir</span>
        </>
      ) : (
        <>
          <span className={local.sample}>Seccion superior</span>
          <gob-divider
            key={`${example.id}-${tone}`}
            variant={example.variant}
            tone={tone}
          >
            {example.variant === 'label' ? 'O continua con' : null}
          </gob-divider>
          <span className={local.sample}>Seccion inferior</span>
        </>
      )}
    </div>
  );
}
