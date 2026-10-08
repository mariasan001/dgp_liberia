'use client';

import type { PaginationBarExample } from './pagination-bar-data';
import local from './pagination-bar.module.css';

export function PaginationBarDemo({ example }: { example: PaginationBarExample }) {
  return (
    <div className={local.stageInner}>
      <gob-pagination-bar
        key={example.id}
        variant={example.variant}
        page={example.page}
        total={example.total}
        page-size={example.pageSize}
        summary={example.summary}
        size={example.size}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.tabs}
      />
    </div>
  );
}
