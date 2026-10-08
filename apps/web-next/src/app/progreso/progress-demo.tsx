'use client';

import type { ProgressExample } from './progress-data';
import local from './progress.module.css';

export function ProgressDemo({ example }: { example: ProgressExample }) {
  return (
    <div className={local.stageInner}>
      <gob-progress
        key={example.id}
        variant={example.variant}
        value={example.value != null ? String(example.value) : undefined}
        label={example.label}
        status={example.status}
        steps={example.steps != null ? String(example.steps) : undefined}
        className={local.progress}
      />
    </div>
  );
}
