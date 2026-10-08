'use client';

import { useEffect, useRef, useState } from 'react';

import {
  resolveFabNotice,
  type FabExample,
  type FabNotice,
} from './fab-data';
import local from './fab.module.css';

type FabEventDetail = {
  action?: string;
  value?: string;
  label?: string;
  icon?: string;
  item?: { id?: string; label?: string; icon?: string };
};

export function FabDemo({ example }: { example: FabExample }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [notice, setNotice] = useState<FabNotice | null>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const onFab = (event: Event) => {
      // Speed dial: el FAB principal solo abre/cierra, no muestra aviso repetido.
      const detail = (event as CustomEvent<FabEventDetail>).detail || {};
      if (example.variant === 'actions' && detail.action !== 'menu') {
        return;
      }
      setNotice(resolveFabNotice(example.id, detail));
    };

    root.addEventListener('gob-fab', onFab);
    return () => root.removeEventListener('gob-fab', onFab);
  }, [example.id, example.variant]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  return (
    <div
      ref={wrapRef}
      className={`${local.stageInner} ${example.tall ? local.stageTall : ''}`.trim()}
    >
      {notice ? (
        <gob-toast
          key={`${notice.title}-${notice.description}`}
          className={local.notice}
          variant="soft"
          tone={notice.tone}
          title={notice.title}
          description={notice.description}
          dismissible
          open
        />
      ) : null}
      <gob-fab
        key={example.id}
        variant={example.variant}
        size={example.size}
        icon={example.icon ?? 'plus'}
        label={example.label ?? 'Accion'}
        actions={example.actions}
        {...(example.open ? { open: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
      />
    </div>
  );
}
