'use client';

import type { SelectExample } from './select-data';
import local from './select.module.css';

export function SelectDemo({ example }: { example: SelectExample }) {
  return (
    <div className={local.stageInner}>
      <gob-select
        key={example.id}
        variant={example.variant}
        label={example.label}
        placeholder={example.placeholder}
        helper={example.helper}
        value={example.value}
        status={example.status}
        size={example.size}
        options={example.options}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.select}
      />
    </div>
  );
}
