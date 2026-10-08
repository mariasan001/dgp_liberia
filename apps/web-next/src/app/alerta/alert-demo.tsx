'use client';

import type { AlertExample } from './alert-data';
import local from './alert.module.css';

export function AlertDemo({ example }: { example: AlertExample }) {
  return (
    <div className={local.stageInner}>
      <gob-alert
        key={example.id}
        variant={example.variant}
        tone={example.tone}
        title={example.alertTitle}
        description={example.alertDescription}
        action={example.action}
        {...(example.dismissible ? { dismissible: true } : {})}
        className={local.tabs}
      />
    </div>
  );
}
