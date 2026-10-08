'use client';

import type { CardExample } from './card-data';
import local from './card.module.css';

export function CardDemo({ example }: { example: CardExample }) {
  return (
    <div className={local.stageInner}>
      <gob-card
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        title={example.cardTitle}
        description={example.cardDescription}
        body={example.body}
        meta={example.meta}
        action-label={example.actionLabel}
      />
    </div>
  );
}
