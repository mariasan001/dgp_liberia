'use client';

import { useEffect, useRef, useState } from 'react';

import type { DrawerExample } from './drawer-data';
import local from './drawer.module.css';

export function DrawerDemo({ example }: { example: DrawerExample }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const onDrawer = (event: Event) => {
      const detail = (event as CustomEvent<{ action?: string }>).detail;
      if (detail?.action) setOpen(false);
    };
    root.addEventListener('gob-drawer', onDrawer);
    return () => root.removeEventListener('gob-drawer', onDrawer);
  }, []);

  const shared = {
    variant: example.variant,
    side: example.side,
    size: example.size,
    title: example.drawerTitle,
    description: example.drawerDescription,
    body: example.body,
    'confirm-label': example.confirmLabel,
    'cancel-label': example.cancelLabel,
  } as const;

  return (
    <div ref={wrapRef} className={local.stageInner}>
      <gob-drawer key={`preview-${example.id}`} preview open {...shared} />
      <button
        type="button"
        className={local.openBtn}
        onClick={() => setOpen(true)}
      >
        Probar overlay
      </button>
      <gob-drawer
        key={`overlay-${example.id}-${open ? 'open' : 'closed'}`}
        {...shared}
        {...(open ? { open: true } : {})}
      />
    </div>
  );
}
