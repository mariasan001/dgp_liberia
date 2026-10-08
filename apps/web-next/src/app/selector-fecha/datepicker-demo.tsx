'use client';

import type { DatepickerExample } from './datepicker-data';
import local from './datepicker.module.css';

export function DatepickerDemo({ example }: { example: DatepickerExample }) {
  return (
    <div className={local.stageInner}>
      <gob-datepicker
        key={example.id}
        variant={example.variant}
        label={example.label}
        placeholder={example.placeholder}
        helper={example.helper}
        value={example.value}
        status={example.status}
        size={example.size}
        mode={example.mode}
        min={example.min}
        max={example.max}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        {...(example.readonly ? { readonly: true } : {})}
        className={local.datepicker}
      />
    </div>
  );
}
