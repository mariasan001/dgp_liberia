'use client';

import type { SplitButtonExample } from './split-button-data';
import local from './split-button.module.css';

export function SplitButtonDemo({ example }: { example: SplitButtonExample }) {
  return (
    <div className={local.stageInner}>
      <gob-split-button
        key={example.id}
        variant={example.variant}
        size={example.size}
        label={example.label ?? 'Guardar'}
        items={example.items}
        {...(example.open ? { open: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
      />
    </div>
  );
}
