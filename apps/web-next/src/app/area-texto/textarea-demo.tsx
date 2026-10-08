'use client';

import type { TextareaExample } from './textarea-data';
import local from './textarea.module.css';

export function TextareaDemo({ example }: { example: TextareaExample }) {
  return (
    <div className={local.stageInner}>
      <gob-textarea
        key={example.id}
        variant={example.variant}
        label={example.label}
        placeholder={example.placeholder}
        helper={example.helper}
        value={example.value}
        status={example.status}
        size={example.size}
        rows={example.rows}
        maxlength={example.maxlength}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        {...(example.readonly ? { readonly: true } : {})}
        className={local.textarea}
      />
    </div>
  );
}
