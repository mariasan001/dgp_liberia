'use client';

import type { ButtonGroupExample } from './button-group-data';
import local from './button-group.module.css';

export function ButtonGroupDemo({ example }: { example: ButtonGroupExample }) {
  return (
    <div className={local.stageInner}>
      <gob-button-group
        key={example.id}
        variant={example.variant}
        size={example.size}
        items={example.items}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.tabs}
      />
    </div>
  );
}
