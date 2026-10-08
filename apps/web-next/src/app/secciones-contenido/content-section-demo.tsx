'use client';

import type { ContentSectionExample } from './content-section-data';
import local from './content-section.module.css';

export function ContentSectionDemo({
  example,
}: {
  example: ContentSectionExample;
}) {
  return (
    <div className={local.stageInner}>
      <gob-content-section
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        eyebrow={example.eyebrow}
        title={example.sectionTitle}
        description={example.sectionDescription}
        body={example.body}
        action-label={example.actionLabel}
      />
    </div>
  );
}
