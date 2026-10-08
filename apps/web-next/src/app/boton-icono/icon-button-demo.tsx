'use client';

import type { IconButtonExample } from './icon-button-data';
import local from './icon-button.module.css';

export function IconButtonDemo({ example }: { example: IconButtonExample }) {
  return (
    <div className={local.stageInner}>
      <gob-icon-button
        key={example.id}
        variant={example.variant}
        size={example.size}
        icon={example.icon ?? 'plus'}
        label={example.label ?? 'Accion'}
        {...(example.disabled ? { disabled: true } : {})}
        {...(example.loading ? { loading: true } : {})}
      />
    </div>
  );
}
