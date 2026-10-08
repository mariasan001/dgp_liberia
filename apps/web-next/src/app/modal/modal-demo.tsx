'use client';

import { useEffect, useRef, useState } from 'react';

import type { ModalExample } from './modal-data';
import local from './modal.module.css';

export function ModalDemo({ example }: { example: ModalExample }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const onModal = (event: Event) => {
      const detail = (event as CustomEvent<{ action?: string }>).detail;
      if (detail?.action) setOpen(false);
    };
    root.addEventListener('gob-modal', onModal);
    return () => root.removeEventListener('gob-modal', onModal);
  }, []);

  const shared = {
    variant: example.variant,
    size: example.size,
    title: example.modalTitle,
    description: example.modalDescription,
    body: example.body,
    'confirm-label': example.confirmLabel,
    'cancel-label': example.cancelLabel,
  } as const;

  return (
    <div ref={wrapRef} className={local.stageInner}>
      <gob-modal key={`preview-${example.id}`} preview open {...shared} />
      <button
        type="button"
        className={local.openBtn}
        onClick={() => setOpen(true)}
      >
        Probar overlay
      </button>
      <gob-modal
        key={`overlay-${example.id}-${open ? 'open' : 'closed'}`}
        {...shared}
        {...(open ? { open: true } : {})}
      />
    </div>
  );
}
