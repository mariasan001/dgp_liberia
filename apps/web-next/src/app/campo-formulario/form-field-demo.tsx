'use client';

import type { FormFieldExample } from './form-field-data';
import local from './form-field.module.css';

export function FormFieldDemo({ example }: { example: FormFieldExample }) {
  return (
    <div className={local.stageInner}>
      <gob-form-field
        key={example.id}
        variant={example.variant}
        label={example.label}
        helper={example.helper}
        hint={example.hint}
        status={example.status}
        size={example.size}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.field}
      >
        <gob-input
          variant={example.variant === 'soft' ? 'soft' : 'basic'}
          placeholder={example.controlPlaceholder || 'Escribe aqui…'}
          value={example.controlValue}
          {...(example.disabled ? { disabled: true } : {})}
        />
        {example.variant === 'inline' ? (
          <gob-button slot="end" tone="primary" size="sm">
            Validar
          </gob-button>
        ) : null}
      </gob-form-field>
    </div>
  );
}
