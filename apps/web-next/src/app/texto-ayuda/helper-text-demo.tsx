'use client';

import type { HelperTextExample } from './helper-text-data';
import local from './helper-text.module.css';

export function HelperTextDemo({ example }: { example: HelperTextExample }) {
  return (
    <div className={local.stageInner}>
      <gob-helper-text
        key={example.id}
        variant={example.variant}
        tone={example.tone}
        label={example.label}
        count={example.count}
        max={example.max}
        className={local.tabs}
      />
    </div>
  );
}
