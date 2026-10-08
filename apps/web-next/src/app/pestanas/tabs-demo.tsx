'use client';

import type { TabsExample } from './tabs-data';
import local from './tabs.module.css';

export function TabsDemo({ example }: { example: TabsExample }) {
  return (
    <div className={local.stageInner}>
      <gob-tabs
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
