'use client';

import { useEffect, useState } from 'react';
import { Bell, MagnifyingGlass } from '@phosphor-icons/react';

import type { Tone } from '@mariasan001/ui-wc';

import type { TopbarExample } from './topbar-data';
import { TOPBAR_THEME_VARS } from './topbar-themes';
import local from './topbar.module.css';

const CRUMB_PATH = ['Inicio', 'Expedientes', 'Detalle'] as const;

export function TopbarDemo({
  example,
  tone,
}: {
  example: TopbarExample;
  tone: Tone;
}) {
  const variant = example.variant;
  const [query, setQuery] = useState('');
  const [unread, setUnread] = useState(3);
  const [crumbIndex, setCrumbIndex] = useState(CRUMB_PATH.length - 1);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const showSearch = variant === 'search' || variant === 'complete';
  const showActions = variant === 'actions' || variant === 'complete';
  const showBell =
    variant === 'notifications' ||
    variant === 'complete' ||
    variant === 'search' ||
    variant === 'basic' ||
    variant === 'dense' ||
    variant === 'breadcrumb' ||
    variant === 'actions';

  const currentCrumb = CRUMB_PATH[crumbIndex];

  return (
    <div className={local.stageInner}>
      <gob-topbar
        key={`${example.id}-${tone}`}
        variant={variant}
        tone={tone}
        className={`${local.topbar} ${variant === 'dense' ? local.topbarDense : ''}`}
        style={TOPBAR_THEME_VARS[tone]}
      >
        {variant === 'breadcrumb' ? (
          <nav slot="start" className={local.crumbs} aria-label="Migas">
            {CRUMB_PATH.slice(0, crumbIndex + 1).map((label, index) => {
              const isLast = index === crumbIndex;
              return (
                <span key={label} className={local.crumbItem}>
                  {index > 0 ? <span>/</span> : null}
                  {isLast ? (
                    <strong>{label}</strong>
                  ) : (
                    <button
                      type="button"
                      className={local.crumbBtn}
                      onClick={() => {
                        setCrumbIndex(index);
                        setFlash(`Navegaste a ${label}`);
                      }}
                    >
                      {label}
                    </button>
                  )}
                </span>
              );
            })}
          </nav>
        ) : (
          <div slot="start" className={local.titleBlock}>
            <strong>
              {variant === 'dense' ? 'Cola operativa' : flash || 'Inicio'}
            </strong>
            <small>
              {flash
                ? 'Accion reciente'
                : variant === 'dense'
                  ? 'Turno matutino'
                  : 'Direccion de Operaciones'}
            </small>
          </div>
        )}

        {showSearch ? (
          <label slot="center" className={local.search}>
            <MagnifyingGlass weight="thin" size={16} aria-hidden="true" />
            <input
              value={query}
              placeholder="Buscar expediente"
              aria-label="Buscar expediente"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setFlash(
                    query.trim()
                      ? `Busqueda: “${query.trim()}”`
                      : 'Escribe un folio o CURP',
                  );
                }
              }}
            />
          </label>
        ) : (
          <div slot="center" />
        )}

        {showActions ? (
          <button
            type="button"
            className={local.btnGhost}
            onClick={() => setFlash('Exportando listado…')}
          >
            Exportar
          </button>
        ) : null}
        {showActions ? (
          <button
            type="button"
            className={local.btnPrimary}
            onClick={() => setFlash('Nuevo expediente')}
          >
            Nuevo
          </button>
        ) : null}
        {showBell ? (
          <button
            type="button"
            className={local.iconBtn}
            aria-label="Notificaciones"
            onClick={() => {
              if (unread > 0) {
                setUnread(0);
                setFlash('3 avisos leidos');
              } else {
                setUnread(3);
                setFlash('3 avisos nuevos');
              }
            }}
          >
            <Bell weight="thin" size={18} />
            {unread > 0 ? <i className={local.dot} /> : null}
          </button>
        ) : null}
        <button
          type="button"
          className={local.avatar}
          aria-label="Perfil"
          onClick={() => setFlash('Perfil · Maria Gomez')}
        >
          MG
        </button>
      </gob-topbar>
      {flash || (variant === 'breadcrumb' && currentCrumb) ? (
        <p className={local.flash} role="status">
          {flash || `Ruta: ${CRUMB_PATH.slice(0, crumbIndex + 1).join(' / ')}`}
        </p>
      ) : null}
    </div>
  );
}
