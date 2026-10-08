'use client';

import type { SegmentedExample } from './segmented-data';
import local from './segmented.module.css';

export function SegmentedDemo({ example }: { example: SegmentedExample }) {
  return (
    <div className={local.stageInner}>
      <gob-segmented
        key={example.id}
        variant={example.variant}
        size={example.size}
        value={example.value}
        items={example.items}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.tabs}
      />
    </div>
  );
}
