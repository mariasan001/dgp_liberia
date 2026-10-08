'use client';

import type { CommandPaletteExample } from './command-palette-data';
import local from './command-palette.module.css';

export function CommandPaletteDemo({
  example,
}: {
  example: CommandPaletteExample;
}) {
  return (
    <div className={local.stageInner}>
      <gob-command-palette
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        placeholder={example.placeholder}
        query={example.query}
        items={example.items}
      />
    </div>
  );
}
