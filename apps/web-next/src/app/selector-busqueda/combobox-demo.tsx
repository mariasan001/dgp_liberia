'use client';

import type { ComboboxExample } from './combobox-data';
import local from './combobox.module.css';

export function ComboboxDemo({ example }: { example: ComboboxExample }) {
  return (
    <div className={local.stageInner}>
      <gob-combobox
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
        className={local.combobox}
      />
    </div>
  );
}
