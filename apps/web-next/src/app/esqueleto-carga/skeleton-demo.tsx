'use client';

import type { SkeletonExample } from './skeleton-data';
import local from './skeleton.module.css';

export function SkeletonDemo({ example }: { example: SkeletonExample }) {
  return (
    <div className={local.stageInner}>
      <gob-skeleton
        key={example.id}
        variant={example.variant}
        rows={example.rows != null ? String(example.rows) : undefined}
        className={local.skeleton}
      />
    </div>
  );
}
