'use client';

import { useEffect, useState } from 'react';

import type { PageHeaderSurface } from '@mariasan001/ui-wc';

import type { HeaderExample } from './header-data';
import local from './header.module.css';

const STATUSES = [
  { label: 'En revision', tone: 'warn' },
  { label: 'Aprobado', tone: 'ok' },
  { label: 'Observado', tone: 'err' },
] as const;

const CRUMBS = ['Inicio', 'Expedientes', 'Detalle'] as const;

export function HeaderDemo({
  example,
  surface,
}: {
  example: HeaderExample;
  surface: PageHeaderSurface;
}) {
  const variant = example.variant;
  const [crumbIndex, setCrumbIndex] = useState(CRUMBS.length - 1);
  const [statusIndex, setStatusIndex] = useState(0);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const showCrumb = variant === 'breadcrumb' || variant === 'complete';
  const showDesc =
    variant === 'description' || variant === 'complete' || variant === 'dense';
  const showStatus = variant === 'status' || variant === 'complete';
  const showActions = variant === 'actions' || variant === 'complete';

  const title =
    showCrumb && crumbIndex < CRUMBS.length - 1
      ? CRUMBS[crumbIndex]
      : variant === 'dense'
        ? 'Cola operativa'
        : 'Expedientes';

  const description = flash
    ? flash
    : variant === 'dense'
      ? 'Turno matutino · 24 pendientes'
      : showCrumb
        ? `Ruta: ${CRUMBS.slice(0, crumbIndex + 1).join(' / ')}`
        : 'Consulta y da seguimiento a los expedientes abiertos de la direccion.';

  const status = STATUSES[statusIndex];

  return (
    <div
      className={`${local.stageInner} ${surface === 'panel' ? local.stageInnerPanel : local.stageInnerPlain}`}
    >
      <gob-page-header
        key={`${example.id}-${surface}`}
        variant={variant}
        surface={surface}
        className={`${local.header} ${surface === 'plain' ? local.headerPlain : ''}`}
      >
        {showCrumb ? (
          <nav slot="breadcrumb" className={local.crumbs} aria-label="Migas">
            {CRUMBS.slice(0, crumbIndex + 1).map((label, index) => {
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
        ) : null}

        <h1 slot="title">{title}</h1>

        {showStatus ? (
          <button
            type="button"
            slot="meta"
            className={local.status}
            data-tone={status.tone}
            onClick={() => {
              const next = (statusIndex + 1) % STATUSES.length;
              setStatusIndex(next);
              setFlash(`Estatus: ${STATUSES[next].label}`);
            }}
          >
            {status.label}
          </button>
        ) : null}

        {showDesc || flash ? (
          <p slot="description">{description}</p>
        ) : null}

        {showActions ? (
          <>
            <button
              type="button"
              className={local.btnGhost}
              onClick={() => setFlash('Listado exportado')}
            >
              Exportar
            </button>
            <button
              type="button"
              className={local.btnPrimary}
              onClick={() => setFlash('Alta de expediente')}
            >
              Nuevo
            </button>
          </>
        ) : null}
      </gob-page-header>
    </div>
  );
}
