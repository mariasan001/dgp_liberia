'use client';

import type { SwitchExample } from './switch-data';
import local from './switch.module.css';

export function SwitchDemo({ example }: { example: SwitchExample }) {
  return (
    <div className={local.stageInner}>
      <gob-switch
        key={example.id}
        variant={example.variant}
        label={example.label}
        description={example.descriptionText}
        helper={example.helper}
        status={example.status}
        size={example.size}
        {...(example.checked ? { checked: true } : {})}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.switch}
      >
        {example.children}
      </gob-switch>
    </div>
  );
}
