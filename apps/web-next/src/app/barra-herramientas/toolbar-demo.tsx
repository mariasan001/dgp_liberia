'use client';

import { useEffect, useState } from 'react';
import {
  ArrowsClockwise,
  DotsThree,
  Export,
  MagnifyingGlass,
  Printer,
  SquaresFour,
  Table,
} from '@phosphor-icons/react';

import type { Tone } from '@mariasan001/ui-wc';

import type { ToolbarExample } from './toolbar-data';
import local from './toolbar.module.css';

export function ToolbarDemo({
  example,
  tone,
}: {
  example: ToolbarExample;
  tone: Tone;
}) {
  const variant = example.variant;
  const [density, setDensity] = useState<'comodo' | 'compacto'>('comodo');
  const [view, setView] = useState<'tabla' | 'tarjetas'>('tabla');
  const [query, setQuery] = useState('');
  const [flash, setFlash] = useState('');
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const showExport = variant === 'actions' || variant === 'complete';
  const showNew =
    variant === 'basic' || variant === 'actions' || variant === 'complete';
  const showRefresh =
    variant === 'refresh' || variant === 'complete' || variant === 'icons';
  const showDensity = variant === 'density';
  const showViews = variant === 'views' || variant === 'complete';
  const showSearch = variant === 'search';
  const showPrint = variant === 'print';
  const showBulk = variant === 'bulk';
  const showIcons = variant === 'icons';

  function refresh() {
    setSpinning(true);
    setFlash('Actualizando datos…');
    window.setTimeout(() => {
      setSpinning(false);
      setFlash('Datos actualizados');
    }, 900);
  }

  return (
    <div className={local.stageInner}>
      <gob-toolbar
        key={`${example.id}-${tone}`}
        variant={variant}
        tone={tone}
        dense={
          variant === 'density' && density === 'compacto' ? true : undefined
        }
        className={local.bar}
      >
        <div slot="start" className="gob-tbx-title">
          <strong>
            {flash ||
              (showBulk
                ? '3 seleccionados'
                : showSearch && query
                  ? `Busqueda: ${query}`
                  : 'Expedientes')}
          </strong>
          <small>
            {flash
              ? 'Accion reciente'
              : showBulk
                ? 'Acciones masivas'
                : density === 'compacto'
                  ? 'Vista compacta'
                  : view === 'tarjetas'
                    ? 'Vista tarjetas'
                    : 'Consulta operativa'}
          </small>
        </div>

        {showSearch ? (
          <label className="gob-tbx-search">
            <MagnifyingGlass weight="thin" size={16} aria-hidden="true" />
            <input
              value={query}
              placeholder="Buscar en vista"
              aria-label="Buscar en vista"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setFlash(
                    query.trim()
                      ? `Filtrado: “${query.trim()}”`
                      : 'Escribe un folio',
                  );
                }
              }}
            />
          </label>
        ) : null}

        {showExport ? (
          <button
            type="button"
            className="gob-tbx-btn gob-tbx-btn-ghost"
            onClick={() => setFlash('Exportando CSV…')}
          >
            <Export weight="thin" size={16} aria-hidden="true" />
            Exportar
          </button>
        ) : null}

        {showPrint ? (
          <button
            type="button"
            className="gob-tbx-btn gob-tbx-btn-ghost"
            onClick={() => setFlash('Preparando impresion…')}
          >
            <Printer weight="thin" size={16} aria-hidden="true" />
            Imprimir
          </button>
        ) : null}

        {showNew ? (
          <button
            type="button"
            className="gob-tbx-btn gob-tbx-btn-primary"
            onClick={() => setFlash('Nuevo expediente')}
          >
            Nuevo
          </button>
        ) : null}

        {showBulk ? (
          <>
            <button
              type="button"
              className="gob-tbx-btn gob-tbx-btn-ghost"
              onClick={() => setFlash('Asignando 3 expedientes…')}
            >
              Asignar
            </button>
            <button
              type="button"
              className="gob-tbx-btn gob-tbx-btn-ghost"
              onClick={() => setFlash('Archivando seleccion…')}
            >
              Archivar
            </button>
            <button
              type="button"
              className="gob-tbx-btn gob-tbx-btn-primary"
              onClick={() => setFlash('Cerrando 3 expedientes')}
            >
              Cerrar
            </button>
          </>
        ) : null}

        {showRefresh ? (
          <button
            type="button"
            className="gob-tbx-icon-btn"
            aria-label="Refrescar"
            disabled={spinning}
            onClick={refresh}
          >
            <ArrowsClockwise
              weight="thin"
              size={18}
              aria-hidden="true"
              className={spinning ? local.spin : undefined}
            />
          </button>
        ) : null}

        {showIcons ? (
          <>
            <button
              type="button"
              className="gob-tbx-icon-btn"
              aria-label="Exportar"
              onClick={() => setFlash('Exportando CSV…')}
            >
              <Export weight="thin" size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gob-tbx-icon-btn"
              aria-label="Imprimir"
              onClick={() => setFlash('Preparando impresion…')}
            >
              <Printer weight="thin" size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gob-tbx-icon-btn"
              aria-label="Mas acciones"
              onClick={() => setFlash('Menu de vista')}
            >
              <DotsThree weight="thin" size={18} aria-hidden="true" />
            </button>
          </>
        ) : null}

        {showViews ? (
          <div slot="end" className="gob-tbx-seg" role="group" aria-label="Vista">
            <button
              type="button"
              aria-pressed={view === 'tabla'}
              onClick={() => {
                setView('tabla');
                setFlash('Vista tabla');
              }}
            >
              <Table weight="thin" size={14} aria-hidden="true" />
              Tabla
            </button>
            <button
              type="button"
              aria-pressed={view === 'tarjetas'}
              onClick={() => {
                setView('tarjetas');
                setFlash('Vista tarjetas');
              }}
            >
              <SquaresFour weight="thin" size={14} aria-hidden="true" />
              Tarjetas
            </button>
          </div>
        ) : null}

        {showDensity ? (
          <div slot="end" className="gob-tbx-seg" role="group" aria-label="Densidad">
            <button
              type="button"
              aria-pressed={density === 'comodo'}
              onClick={() => {
                setDensity('comodo');
                setFlash('Densidad comoda');
              }}
            >
              Comodo
            </button>
            <button
              type="button"
              aria-pressed={density === 'compacto'}
              onClick={() => {
                setDensity('compacto');
                setFlash('Densidad compacta');
              }}
            >
              Compacto
            </button>
          </div>
        ) : null}
      </gob-toolbar>
      {flash ? <p className={local.flash}>{flash}</p> : null}
    </div>
  );
}
