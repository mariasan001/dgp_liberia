'use client';

import type { PopoverExample } from './popover-data';
import local from './popover.module.css';

export function PopoverDemo({ example }: { example: PopoverExample }) {
  return (
    <div className={local.stageInner}>
      <gob-popover
        key={example.id}
        variant={example.variant}
        placement={example.placement ?? 'bottom'}
        title={example.popoverTitle}
        description={example.popoverDescription}
        trigger={example.trigger ?? 'Abrir'}
        {...(example.open ? { open: true } : {})}
      />
    </div>
  );
}
