'use client';

import type { FooterExample } from './footer-data';
import local from './footer.module.css';

export function FooterDemo({ example }: { example: FooterExample }) {
  return (
    <div className={local.stageInner}>
      <gob-footer
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        brand={example.brand}
        tagline={example.tagline}
        links={example.links}
        legal={example.legal}
      />
    </div>
  );
}
