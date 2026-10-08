'use client';

import { useEffect, useRef, useState } from 'react';

import type { SheetExample } from './sheet-data';
import local from './sheet.module.css';

export function SheetDemo({ example }: { example: SheetExample }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const onSheet = (event: Event) => {
      const detail = (event as CustomEvent<{ action?: string }>).detail;
      if (detail?.action) setOpen(false);
    };
    root.addEventListener('gob-sheet', onSheet);
    return () => root.removeEventListener('gob-sheet', onSheet);
  }, []);

  const shared = {
    variant: example.variant,
    title: example.sheetTitle,
    description: example.sheetDescription,
    body: example.body,
    'confirm-label': example.confirmLabel,
    'cancel-label': example.cancelLabel,
  } as const;

  return (
    <div ref={wrapRef} className={local.stageInner}>
      <gob-sheet key={`preview-${example.id}`} preview open {...shared} />
      <button
        type="button"
        className={local.openBtn}
        onClick={() => setOpen(true)}
      >
        Probar overlay
      </button>
      <gob-sheet
        key={`overlay-${example.id}-${open ? 'open' : 'closed'}`}
        {...shared}
        {...(open ? { open: true } : {})}
      />
    </div>
  );
}
