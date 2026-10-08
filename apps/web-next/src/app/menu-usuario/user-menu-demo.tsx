'use client';

import type { UserMenuExample } from './user-menu-data';
import local from './user-menu.module.css';

export function UserMenuDemo({ example }: { example: UserMenuExample }) {
  return (
    <div className={local.stageInner}>
      <gob-user-menu
        key={example.id}
        variant={example.variant}
        name={example.name}
        role={example.role}
        email={example.email}
        initials={example.initials}
        {...(example.open ? { open: true } : {})}
      />
    </div>
  );
}
