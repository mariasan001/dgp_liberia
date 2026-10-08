'use client';

import type { BannerExample } from './banner-data';
import local from './banner.module.css';

export function BannerDemo({ example }: { example: BannerExample }) {
  return (
    <div className={local.stageInner}>
      <gob-banner
        key={example.id}
        variant={example.variant}
        tone={example.tone}
        title={example.bannerTitle}
        description={example.bannerDescription}
        action={example.action}
        {...(example.dismissible ? { dismissible: true } : {})}
        className={local.tabs}
      />
    </div>
  );
}
