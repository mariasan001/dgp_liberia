'use client';

import type { AvatarExample } from './avatar-data';
import local from './avatar.module.css';

export function AvatarDemo({ example }: { example: AvatarExample }) {
  return (
    <div className={local.stageInner}>
      <gob-avatar
        key={example.id}
        variant={example.variant}
        size={example.size}
        tone={example.tone}
        name={example.name}
        initials={example.initials}
        status={example.status}
      />
    </div>
  );
}
