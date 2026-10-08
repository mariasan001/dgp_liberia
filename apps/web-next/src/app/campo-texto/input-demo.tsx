'use client';

import type { InputExample } from './input-data';
import local from './input.module.css';

export function InputDemo({ example }: { example: InputExample }) {
  return (
    <div className={local.stageInner}>
      <gob-input
        key={example.id}
        variant={example.variant}
        label={example.label}
        placeholder={example.placeholder}
        helper={example.helper}
        value={example.value}
        status={example.status}
        size={example.size}
        lead={example.lead}
        suffix={example.suffix}
        type={example.type}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        {...(example.readonly ? { readonly: true } : {})}
        className={local.input}
      />
    </div>
  );
}
