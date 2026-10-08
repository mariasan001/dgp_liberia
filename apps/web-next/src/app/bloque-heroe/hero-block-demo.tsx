'use client';

import type { HeroBlockExample } from './hero-block-data';
import local from './hero-block.module.css';

export function HeroBlockDemo({ example }: { example: HeroBlockExample }) {
  return (
    <div className={local.stageInner}>
      <gob-hero-block
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        eyebrow={example.eyebrow}
        title={example.heroTitle}
        description={example.heroDescription}
        primary-label={example.primaryLabel}
        secondary-label={example.secondaryLabel}
      />
    </div>
  );
}
