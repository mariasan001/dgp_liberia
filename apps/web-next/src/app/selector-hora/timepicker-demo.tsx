'use client';

import type { TimepickerExample } from './timepicker-data';
import local from './timepicker.module.css';

export function TimepickerDemo({ example }: { example: TimepickerExample }) {
  return (
    <div className={local.stageInner}>
      <gob-timepicker
        key={example.id}
        variant={example.variant}
        label={example.label}
        placeholder={example.placeholder}
        helper={example.helper}
        value={example.value}
        status={example.status}
        size={example.size}
        step={example.step}
        min={example.min}
        max={example.max}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        {...(example.readonly ? { readonly: true } : {})}
        className={local.timepicker}
      />
    </div>
  );
}
