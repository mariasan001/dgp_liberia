'use client';

import type { DropdownMenuExample } from './dropdown-menu-data';
import local from './dropdown-menu.module.css';

export function DropdownMenuDemo({ example }: { example: DropdownMenuExample }) {
  return (
    <div className={local.stageInner}>
      <gob-dropdown-menu
        key={example.id}
        variant={example.variant}
        size={example.size}
        label={example.label ?? 'Acciones'}
        items={example.items}
        {...(example.open ? { open: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
      />
    </div>
  );
}
