'use client';

import type { SearchExample } from './search-data';
import local from './search.module.css';

export function SearchDemo({ example }: { example: SearchExample }) {
  return (
    <div className={local.stageInner}>
      <gob-search-field
        key={example.id}
        variant={example.variant}
        label={example.label}
        placeholder={example.placeholder}
        helper={example.helper}
        value={example.value}
        status={example.status}
        size={example.size}
        shortcut={example.shortcut}
        {...(example.loading ? { loading: true } : {})}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        {...(example.readonly ? { readonly: true } : {})}
        className={local.search}
      />
    </div>
  );
}
