'use client';

import type { SliderExample } from './slider-data';
import local from './slider.module.css';

export function SliderDemo({ example }: { example: SliderExample }) {
  return (
    <div className={local.stageInner}>
      <gob-slider
        key={example.id}
        variant={example.variant}
        label={example.label}
        helper={example.helper}
        status={example.status}
        size={example.size}
        min={example.min}
        max={example.max}
        step={example.step}
        value={example.value}
        unit={example.unit}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        {...(example.readonly ? { readonly: true } : {})}
        className={local.slider}
      />
    </div>
  );
}
