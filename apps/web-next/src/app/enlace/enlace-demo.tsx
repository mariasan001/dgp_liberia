'use client';

import type { EnlaceExample } from './enlace-data';
import local from './link.module.css';

export function EnlaceDemo({ example }: { example: EnlaceExample }) {
  return (
    <div className={local.stageInner}>
      <gob-link
        key={example.id}
        variant={example.variant}
        tone={example.tone}
        size={example.size}
        href={example.href ?? '#'}
        label={example.label ?? 'Enlace'}
        {...(example.external ? { external: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
      />
    </div>
  );
}
