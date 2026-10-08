'use client';

import { useEffect, useState } from 'react';
import {
  Bell,
  CheckCircle,
  FolderOpen,
  Lock,
  MagnifyingGlass,
  UploadSimple,
  WarningCircle,
} from '@phosphor-icons/react';

import {
  copyFor,
  iconNameFor,
  type EmptyExample,
} from './empty-data';
import local from './empty.module.css';

const ICONS = {
  FolderOpen,
  MagnifyingGlass,
  WarningCircle,
  Lock,
  CheckCircle,
  UploadSimple,
  Bell,
} as const;

export function EmptyDemo({ example }: { example: EmptyExample }) {
  const variant = example.variant;
  const [flash, setFlash] = useState('');
  const copy = copyFor(example);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const showIcon =
    variant === 'icon' ||
    variant === 'complete' ||
    variant === 'search' ||
    variant === 'error' ||
    variant === 'dense' ||
    variant === 'filter' ||
    variant === 'permission' ||
    variant === 'success' ||
    variant === 'upload' ||
    variant === 'inline';
  const showActions =
    variant === 'actions' ||
    variant === 'complete' ||
    variant === 'error' ||
    variant === 'filter' ||
    variant === 'permission' ||
    variant === 'success' ||
    variant === 'upload' ||
    variant === 'inline' ||
    variant === 'search';
  const showSecondary =
    Boolean(copy.secondaryLabel) ||
    variant === 'actions' ||
    variant === 'complete';

  const iconKey = iconNameFor(variant) as keyof typeof ICONS;
  const Icon = ICONS[iconKey] ?? FolderOpen;
  const iconSize = variant === 'inline' || variant === 'dense' ? 20 : 24;

  return (
    <div className={local.stageInner}>
      <gob-empty-state
        key={example.id}
        variant={variant}
        tone="primary"
        className={local.empty}
      >
        <div className="gob-es-inner">
          {showIcon ? (
            <span className="gob-es-icon">
              <Icon weight="thin" size={iconSize} aria-hidden="true" />
            </span>
          ) : null}
          {copy.pill && copy.pillTone ? (
            <span className="gob-es-pill" data-tone={copy.pillTone}>
              {copy.pill}
            </span>
          ) : null}
          <p className="gob-es-title">{copy.title}</p>
          <p className="gob-es-desc">{copy.desc}</p>
          {copy.hints?.length ? (
            <div className="gob-es-hints">
              {copy.hints.map((hint) => (
                <span key={hint} className="gob-es-hint">
                  {hint}
                </span>
              ))}
            </div>
          ) : null}
          {showActions ? (
            <div className="gob-es-actions">
              {showSecondary && copy.secondaryLabel ? (
                <button
                  type="button"
                  className="gob-es-btn"
                  onClick={() => setFlash(copy.secondaryLabel ?? 'Accion')}
                >
                  {copy.secondaryLabel}
                </button>
              ) : showSecondary &&
                (variant === 'actions' || variant === 'complete') ? (
                <button
                  type="button"
                  className="gob-es-btn"
                  onClick={() => setFlash('Filtros limpiados')}
                >
                  Limpiar filtros
                </button>
              ) : null}
              <button
                type="button"
                className="gob-es-btn gob-es-btn-primary"
                onClick={() =>
                  setFlash(copy.primaryLabel ?? 'Nuevo expediente')
                }
              >
                {copy.primaryLabel ?? 'Nuevo expediente'}
              </button>
            </div>
          ) : null}
        </div>
      </gob-empty-state>
      {flash ? <p className={local.flash}>{flash}</p> : null}
    </div>
  );
}
