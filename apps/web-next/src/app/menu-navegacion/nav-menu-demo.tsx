'use client';

import type { NavMenuExample } from './nav-menu-data';
import local from './nav-menu.module.css';

export function NavMenuDemo({ example }: { example: NavMenuExample }) {
  return (
    <div className={local.stageInner}>
      <gob-nav-menu
        key={example.id}
        variant={example.variant}
        items={example.items}
        value={example.value}
        size={example.size}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.tabs}
      />
    </div>
  );
}
