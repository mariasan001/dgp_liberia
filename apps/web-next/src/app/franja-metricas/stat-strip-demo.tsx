'use client';

import type { StatStripExample } from './stat-strip-data';
import local from './stat-strip.module.css';

export function StatStripDemo({ example }: { example: StatStripExample }) {
  return (
    <div className={local.stageInner}>
      <gob-stat-strip
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        items={example.items}
      />
    </div>
  );
}
