'use client';

import type { TooltipExample } from './tooltip-data';
import local from './tooltip.module.css';

export function TooltipDemo({ example }: { example: TooltipExample }) {
  return (
    <div className={local.stageInner}>
      <gob-tooltip
        key={example.id}
        variant={example.variant}
        placement={example.placement ?? 'top'}
        label={example.label}
        trigger={example.trigger ?? 'Pasa el cursor'}
        {...(example.open ? { open: true } : {})}
      />
    </div>
  );
}
