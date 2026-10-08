'use client';

import { useEffect, useState } from 'react';
import { CaretRight, DotsThree, FileText } from '@phosphor-icons/react';

import type { Tone } from '@mariasan001/ui-wc';

import { SAMPLE_ROWS, type ListExample } from './list-data';
import local from './list.module.css';

export function ListDemo({
  example,
  tone,
}: {
  example: ListExample;
  tone: Tone;
}) {
  const variant = example.variant;
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [flash, setFlash] = useState('');

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const showAvatar =
    variant === 'avatar' || variant === 'complete' || variant === 'dense';
  const showIcon = variant === 'icon';
  const showMeta = variant === 'meta' || variant === 'complete';
  const showStatus = variant === 'status';
  const showAction = variant === 'actions' || variant === 'complete';
  const showCheck = variant === 'selectable' || variant === 'complete';
  const showNav = variant === 'nav';
  const showGrouped = variant === 'grouped';
  const showEmpty = variant === 'empty';

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setFlash(
        next.size
          ? `${next.size} seleccionado${next.size === 1 ? '' : 's'}`
          : 'Sin seleccion',
      );
      return next;
    });
  }

  function renderRow(row: (typeof SAMPLE_ROWS)[number]) {
    const isSelected = selected.has(row.id);
    return (
      <div
        key={row.id}
        className="gob-list-item"
        role="listitem"
        data-selected={isSelected ? 'true' : undefined}
        data-interactive={showNav ? 'true' : undefined}
        aria-selected={showCheck ? isSelected : undefined}
        onClick={
          showNav
            ? () => setFlash(`Abrir detalle: ${row.name}`)
            : undefined
        }
      >
        {showCheck ? (
          <input
            className="gob-list-check"
            type="checkbox"
            checked={isSelected}
            aria-label={`Seleccionar ${row.name}`}
            onChange={() => toggle(row.id)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : null}

        {showAvatar ? (
          <span className="gob-list-avatar">{row.initials}</span>
        ) : null}

        {showIcon ? (
          <span className="gob-list-icon">
            <FileText weight="thin" size={18} aria-hidden="true" />
          </span>
        ) : null}

        <div className="gob-list-body">
          <p className="gob-list-primary">{row.name}</p>
          <p className="gob-list-secondary">{row.detail}</p>
        </div>

        {showMeta ? (
          <div className="gob-list-meta">
            <span>{row.meta}</span>
            <span className="gob-list-pill">{row.status}</span>
          </div>
        ) : null}

        {showStatus ? (
          <span className="gob-list-pill">{row.status}</span>
        ) : null}

        {showAction ? (
          <button
            type="button"
            className="gob-list-action"
            aria-label={`Acciones de ${row.name}`}
            onClick={(e) => {
              e.stopPropagation();
              setFlash(`Menu: ${row.name}`);
            }}
          >
            <DotsThree weight="thin" size={18} aria-hidden="true" />
          </button>
        ) : null}

        {showNav ? (
          <span className="gob-list-chevron" aria-hidden="true">
            <CaretRight weight="thin" size={16} />
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={local.stageInner}>
      <gob-list
        key={`${example.id}-${tone}`}
        variant={variant}
        tone={tone}
        className={local.list}
      >
        {showEmpty ? (
          <div className="gob-list-empty">
            <strong>Sin resultados</strong>
            <p>Ajusta los filtros o crea un nuevo expediente.</p>
          </div>
        ) : showGrouped ? (
          (['Hoy', 'Ayer'] as const).map((group) => (
            <div key={group}>
              <div className="gob-list-group">{group}</div>
              {SAMPLE_ROWS.filter((r) => r.group === group).map(renderRow)}
            </div>
          ))
        ) : (
          SAMPLE_ROWS.map(renderRow)
        )}
      </gob-list>
      {flash ? <p className={local.flash}>{flash}</p> : null}
    </div>
  );
}
