'use client';

import type { CheckboxExample } from './checkbox-data';
import local from './checkbox.module.css';

export function CheckboxDemo({ example }: { example: CheckboxExample }) {
  return (
    <div className={local.stageInner}>
      <gob-checkbox
        key={example.id}
        variant={example.variant}
        label={example.label}
        description={example.descriptionText}
        helper={example.helper}
        status={example.status}
        size={example.size}
        {...(example.checked ? { checked: true } : {})}
        {...(example.indeterminate ? { indeterminate: true } : {})}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.checkbox}
      >
        {example.children}
      </gob-checkbox>
    </div>
  );
}
