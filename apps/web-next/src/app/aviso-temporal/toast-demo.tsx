'use client';

import type { ToastExample } from './toast-data';
import local from './toast.module.css';

export function ToastDemo({ example }: { example: ToastExample }) {
  return (
    <div className={local.stageInner}>
      <gob-toast
        key={example.id}
        variant={example.variant}
        tone={example.tone}
        title={example.toastTitle}
        description={example.toastDescription}
        action={example.action}
        duration={example.duration}
        open
        {...(example.dismissible ? { dismissible: true } : {})}
      />
    </div>
  );
}
