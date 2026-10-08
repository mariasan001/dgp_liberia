'use client';

import type { BadgeExample } from './badge-data';
import local from './badge.module.css';

export function BadgeDemo({ example }: { example: BadgeExample }) {
  return (
    <div className={local.stageInner}>
      <gob-badge
        key={example.id}
        variant={example.variant}
        tone={example.tone}
        size={example.size}
        label={example.label}
        count={example.count}
        max={example.max}
      />
    </div>
  );
}
