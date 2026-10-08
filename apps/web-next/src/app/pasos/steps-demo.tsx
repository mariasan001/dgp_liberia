'use client';

import type { StepsExample } from './steps-data';
import local from './steps.module.css';

export function StepsDemo({ example }: { example: StepsExample }) {
  return (
    <div className={local.stageInner}>
      <gob-steps
        key={example.id}
        variant={example.variant}
        items={example.items}
        value={example.value}
        size={example.size}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.tabs}
      />
    </div>
  );
}
