'use client';

import type { SpinnerExample } from './spinner-data';
import local from './spinner.module.css';

export function SpinnerDemo({ example }: { example: SpinnerExample }) {
  return (
    <div className={local.stageInner}>
      <gob-spinner
        key={example.id}
        variant={example.variant}
        label={example.label}
        size={example.size}
        status={example.status}
        className={local.spinner}
      />
    </div>
  );
}
