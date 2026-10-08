'use client';

import { useEffect, useRef, useState } from 'react';

import type { ConfirmDialogExample } from './confirm-dialog-data';
import local from './confirm-dialog.module.css';

export function ConfirmDialogDemo({
  example,
}: {
  example: ConfirmDialogExample;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const onConfirm = (event: Event) => {
      const detail = (event as CustomEvent<{ action?: string }>).detail;
      if (detail?.action) setOpen(false);
    };
    root.addEventListener('gob-confirm-dialog', onConfirm);
    return () => root.removeEventListener('gob-confirm-dialog', onConfirm);
  }, []);

  const shared = {
    variant: example.variant,
    title: example.dialogTitle,
    description: example.dialogDescription,
    body: example.body,
    'confirm-label': example.confirmLabel,
    'cancel-label': example.cancelLabel,
  } as const;

  return (
    <div ref={wrapRef} className={local.stageInner}>
      <gob-confirm-dialog
        key={`preview-${example.id}`}
        preview
        open
        {...shared}
      />
      <button
        type="button"
        className={local.openBtn}
        onClick={() => setOpen(true)}
      >
        Probar overlay
      </button>
      <gob-confirm-dialog
        key={`overlay-${example.id}-${open ? 'open' : 'closed'}`}
        {...shared}
        {...(open ? { open: true } : {})}
      />
    </div>
  );
}
