'use client';

import type { TocExample } from './toc-data';
import local from './toc.module.css';

export function TocDemo({ example }: { example: TocExample }) {
  return (
    <div className={local.stageInner}>
      <gob-table-of-contents
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        title={example.tocTitle}
        items={example.items}
        active={example.active !== undefined ? String(example.active) : undefined}
      />
    </div>
  );
}
