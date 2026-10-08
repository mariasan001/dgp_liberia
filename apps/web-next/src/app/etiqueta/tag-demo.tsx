'use client';

import type { TagExample } from './tag-data';
import local from './tag.module.css';

export function TagDemo({ example }: { example: TagExample }) {
  return (
    <div className={local.stageInner}>
      <gob-tag
        key={example.id}
        variant={example.variant}
        tone={example.tone}
        size={example.size}
        label={example.label ?? 'Etiqueta'}
        icon={example.icon}
        {...(example.removable ? { removable: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
      />
    </div>
  );
}
