'use client';

import type { FormExample } from './form-data';
import local from './form.module.css';

export function FormDemo({ example }: { example: FormExample }) {
  return (
    <div className={local.stageInner}>
      <gob-form
        key={example.id}
        variant={example.variant}
        title={example.formTitle}
        description={example.formDescription}
        gap={example.gap}
        columns={example.columns}
        className={local.form}
      >
        {example.fields.map((field) => (
          <gob-form-field
            key={`${example.id}-${field.label}`}
            variant="labeled"
            label={field.label}
          >
            <gob-input variant="basic" placeholder={field.placeholder} />
          </gob-form-field>
        ))}
        {example.showActions ? (
          <>
            <gob-button slot="actions" tone="neutral" appearance="outline" size="sm">
              {example.variant === 'toolbar' || example.variant === 'dashboard'
                ? 'Limpiar'
                : 'Cancelar'}
            </gob-button>
            <gob-button slot="actions" tone="primary" size="sm">
              {example.variant === 'toolbar' || example.variant === 'dashboard'
                ? 'Filtrar'
                : 'Guardar'}
            </gob-button>
          </>
        ) : null}
      </gob-form>
    </div>
  );
}
