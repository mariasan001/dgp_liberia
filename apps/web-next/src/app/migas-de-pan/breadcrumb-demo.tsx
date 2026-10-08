'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, House } from '@phosphor-icons/react';

import type { BreadcrumbVariant } from '@mariasan001/ui-wc';

import type { BreadcrumbExample, BreadcrumbTone } from './breadcrumb-data';
import { BREADCRUMB_THEME_VARS } from './breadcrumb-themes';
import local from './breadcrumb.module.css';

type Crumb = { id: string; label: string };

const TRAILS: Record<string, Crumb[]> = {
  default: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'exp', label: 'Expedientes' },
    { id: 'det', label: 'Detalle' },
  ],
  complete: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'ops', label: 'Operaciones' },
    { id: 'exp', label: 'Expedientes' },
    { id: 'y2026', label: '2026' },
    { id: 'folio', label: 'EXP-1842' },
  ],
  back: [
    { id: 'exp', label: 'Expedientes' },
    { id: 'det', label: 'Detalle' },
  ],
};

function Sep({ variant }: { variant: BreadcrumbVariant }) {
  const mark =
    variant === 'chevron'
      ? '›'
      : variant === 'dot'
        ? '·'
        : variant === 'arrow'
          ? '→'
          : '/';
  return (
    <span className={local.sep} data-sep aria-hidden="true">
      {mark}
    </span>
  );
}

function initialTrail(variant: BreadcrumbVariant): Crumb[] {
  if (variant === 'complete' || variant === 'collapsed') return TRAILS.complete;
  if (variant === 'back') return TRAILS.back;
  return TRAILS.default;
}

export function BreadcrumbDemo({
  example,
  tone,
}: {
  example: BreadcrumbExample;
  tone: BreadcrumbTone;
}) {
  const variant = example.variant;
  const fullTrail = useMemo(() => initialTrail(variant), [variant]);
  const [index, setIndex] = useState(fullTrail.length - 1);
  const [expanded, setExpanded] = useState(false);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    setIndex(fullTrail.length - 1);
    setExpanded(false);
  }, [fullTrail]);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const trail = fullTrail.slice(0, index + 1);
  const showIcons = variant === 'icons' || variant === 'complete';
  const collapse = variant === 'collapsed' && !expanded && trail.length > 3;

  const nodes: Array<{ kind: 'crumb'; crumb: Crumb; realIndex: number } | { kind: 'ellipsis' }> =
    collapse
      ? [
          { kind: 'crumb', crumb: trail[0], realIndex: 0 },
          { kind: 'ellipsis' },
          {
            kind: 'crumb',
            crumb: trail[trail.length - 2],
            realIndex: index - 1,
          },
          {
            kind: 'crumb',
            crumb: trail[trail.length - 1],
            realIndex: index,
          },
        ]
      : trail.map((crumb, realIndex) => ({
          kind: 'crumb' as const,
          crumb,
          realIndex,
        }));

  const goTo = (i: number) => {
    setIndex(i);
    setFlash(
      `Ruta: ${fullTrail
        .slice(0, i + 1)
        .map((c) => c.label)
        .join(' / ')}`,
    );
  };

  const goBack = () => {
    if (index <= 0) {
      setFlash('Ya estas en el nivel superior');
      return;
    }
    goTo(index - 1);
  };

  return (
    <div className={local.stageInner} style={BREADCRUMB_THEME_VARS[tone]}>
      <gob-breadcrumb
        key={`${example.id}-${tone}`}
        variant={variant}
        tone={tone}
        className={variant === 'underline' ? local.underline : undefined}
      >
        {variant === 'back' ? (
          <>
            <button
              type="button"
              className={`${local.crumb} ${local.crumbBack}`}
              onClick={goBack}
            >
              <ArrowLeft weight="thin" size={14} aria-hidden="true" />
              Volver
            </button>
            <Sep variant={variant} />
          </>
        ) : null}

        {nodes.map((node, i) => {
          if (node.kind === 'ellipsis') {
            return (
              <span key="ellipsis" className={local.crumbItem}>
                {i > 0 ? <Sep variant={variant} /> : null}
                <button
                  type="button"
                  className={local.ellipsisBtn}
                  aria-label="Expandir ruta"
                  onClick={() => {
                    setExpanded(true);
                    setFlash('Ruta expandida');
                  }}
                >
                  …
                </button>
              </span>
            );
          }

          const { crumb, realIndex } = node;
          const isLast = realIndex === index;
          const isFirst = realIndex === 0;

          return (
            <span key={crumb.id} className={local.crumbItem}>
              {i > 0 ? <Sep variant={variant} /> : null}
              {isLast ? (
                <strong className={local.current} aria-current="page">
                  {crumb.label}
                </strong>
              ) : (
                <button
                  type="button"
                  className={`${local.crumb} ${showIcons && isFirst ? local.crumbIcon : ''}`}
                  onClick={() => goTo(realIndex)}
                >
                  {showIcons && isFirst ? (
                    <House weight="thin" size={14} aria-hidden="true" />
                  ) : null}
                  {crumb.label}
                </button>
              )}
            </span>
          );
        })}
      </gob-breadcrumb>
      <p className={local.flash} role="status">
        {flash || `Ruta: ${trail.map((c) => c.label).join(' / ')}`}
      </p>
    </div>
  );
}
