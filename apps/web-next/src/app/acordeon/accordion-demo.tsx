'use client';

import type { AccordionExample } from './accordion-data';
import local from './accordion.module.css';

export function AccordionDemo({ example }: { example: AccordionExample }) {
  return (
    <div className={local.stageInner}>
      <gob-accordion
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        items={JSON.stringify(example.items ?? [])}
        open-index={example.openIndex ?? 0}
      />
    </div>
  );
}
