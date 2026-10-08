'use client';

import type { RadioExample } from './radio-data';
import local from './radio.module.css';

export function RadioDemo({ example }: { example: RadioExample }) {
  return (
    <div className={local.stageInner} role="radiogroup" aria-label={example.title}>
      {example.items.map((item, index) => {
        const isLast = index === example.items.length - 1;
        return (
          <gob-radio
            key={`${example.id}-${item.value}`}
            variant={example.variant}
            name={example.name}
            value={item.value}
            label={item.label}
            description={item.description}
            helper={isLast ? example.helper : undefined}
            status={isLast ? example.status : undefined}
            size={example.size}
            {...(item.checked ? { checked: true } : {})}
            {...(item.disabled ? { disabled: true } : {})}
            {...(example.required && isLast ? { required: true } : {})}
            className={local.radio}
          >
            {item.children}
          </gob-radio>
        );
      })}
    </div>
  );
}
