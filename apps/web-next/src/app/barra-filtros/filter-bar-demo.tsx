'use client';

import { useEffect, useState } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

import type { Tone } from '@mariasan001/ui-wc';

import type { FilterBarExample } from './filter-bar-data';
import local from './filter-bar.module.css';

const PERIODS = [
  { id: 'hoy', label: 'Hoy' },
  { id: 'semana', label: 'Semana' },
  { id: 'mes', label: 'Mes' },
] as const;

const INITIAL_TAGS = ['Salud', 'En revision', 'Hoy'] as const;

export function FilterBarDemo({
  example,
  tone,
}: {
  example: FilterBarExample;
  tone: Tone;
}) {
  const variant = example.variant;
  const [query, setQuery] = useState('');
  const [dep, setDep] = useState('');
  const [status, setStatus] = useState('');
  const [from, setFrom] = useState('2026-07-01');
  const [to, setTo] = useState('2026-07-31');
  const [entidad, setEntidad] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [period, setPeriod] = useState<(typeof PERIODS)[number]['id']>('hoy');
  const [tags, setTags] = useState<string[]>([...INITIAL_TAGS]);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const showSearch =
    variant === 'search' ||
    variant === 'complete' ||
    variant === 'dense' ||
    variant === 'advanced' ||
    variant === 'count';
  const showChips = variant === 'chips' || variant === 'complete';
  const showTags = variant === 'tags';
  const showDates = variant === 'dates' || variant === 'advanced';
  const showRegion = variant === 'region' || variant === 'advanced';
  const showSelects =
    variant === 'basic' ||
    variant === 'with-actions' ||
    variant === 'complete' ||
    variant === 'dense' ||
    variant === 'count';
  const showActions =
    variant === 'with-actions' ||
    variant === 'complete' ||
    variant === 'advanced' ||
    variant === 'dates' ||
    variant === 'region';
  const showCount = variant === 'count';
  const showClearTags = variant === 'tags';

  const resultCount = 128 - tags.length * 7 - (dep ? 12 : 0) - (query.trim() ? 5 : 0);

  function applyFilters() {
    const bits = [
      showChips ? `periodo=${period}` : '',
      showTags && tags.length ? `tags=${tags.join(',')}` : '',
      showDates ? `desde=${from} · hasta=${to}` : '',
      showRegion && entidad ? `entidad=${entidad}` : '',
      showRegion && municipio ? `mun=${municipio}` : '',
      dep ? `dep=${dep}` : '',
      status ? `estatus=${status}` : '',
      query.trim() ? `q=${query.trim()}` : '',
    ].filter(Boolean);
    setFlash(bits.length ? `Filtros: ${bits.join(' · ')}` : 'Sin filtros activos');
  }

  function clearFilters() {
    setQuery('');
    setDep('');
    setStatus('');
    setFrom('2026-07-01');
    setTo('2026-07-31');
    setEntidad('');
    setMunicipio('');
    setPeriod('hoy');
    setTags([...INITIAL_TAGS]);
    setFlash('Filtros limpiados');
  }

  return (
    <div className={local.stageInner}>
      <gob-filter-bar
        key={`${example.id}-${tone}`}
        variant={variant}
        tone={tone}
        className={local.bar}
      >
        {showSearch ? (
          <label slot="search" className="gob-fb-search">
            <MagnifyingGlass weight="thin" size={16} aria-hidden="true" />
            <input
              value={query}
              placeholder="Folio o CURP"
              aria-label="Buscar folio o CURP"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') applyFilters();
              }}
            />
          </label>
        ) : null}

        {showChips
          ? PERIODS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="gob-fb-chip"
                aria-pressed={period === item.id}
                onClick={() => {
                  setPeriod(item.id);
                  setFlash(`Periodo: ${item.label}`);
                }}
              >
                {item.label}
              </button>
            ))
          : null}

        {showTags
          ? tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="gob-fb-tag"
                onClick={() => {
                  setTags((prev) => prev.filter((t) => t !== tag));
                  setFlash(`Quitado: ${tag}`);
                }}
              >
                {tag}
                <X weight="thin" size={12} aria-hidden="true" />
              </button>
            ))
          : null}

        {showDates ? (
          <>
            <label className="gob-fb-field">
              <span>Desde</span>
              <select
                className="gob-fb-select"
                aria-label="Desde"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setFlash(`Desde: ${e.target.value}`);
                }}
              >
                <option value="2026-07-01">01/07/2026</option>
                <option value="2026-06-01">01/06/2026</option>
                <option value="2026-01-01">01/01/2026</option>
              </select>
            </label>
            <label className="gob-fb-field">
              <span>Hasta</span>
              <select
                className="gob-fb-select"
                aria-label="Hasta"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setFlash(`Hasta: ${e.target.value}`);
                }}
              >
                <option value="2026-07-31">31/07/2026</option>
                <option value="hoy">Hoy</option>
              </select>
            </label>
          </>
        ) : null}

        {showRegion ? (
          <>
            <select
              className="gob-fb-select"
              aria-label="Entidad"
              value={entidad}
              onChange={(e) => {
                setEntidad(e.target.value);
                setMunicipio('');
                setFlash(
                  e.target.value
                    ? `Entidad: ${e.target.selectedOptions[0]?.text}`
                    : 'Todas las entidades',
                );
              }}
            >
              <option value="">Todas las entidades</option>
              <option value="cdmx">CDMX</option>
              <option value="jalisco">Jalisco</option>
              <option value="nl">Nuevo Leon</option>
            </select>
            <select
              className="gob-fb-select"
              aria-label="Municipio"
              value={municipio}
              onChange={(e) => {
                setMunicipio(e.target.value);
                setFlash(
                  e.target.value
                    ? `Municipio: ${e.target.selectedOptions[0]?.text}`
                    : 'Todos los municipios',
                );
              }}
            >
              <option value="">Todos los municipios</option>
              <option value="gdl">Guadalajara</option>
              <option value="zap">Zapopan</option>
              <option value="mty">Monterrey</option>
            </select>
          </>
        ) : null}

        {showSelects ? (
          <>
            <select
              className="gob-fb-select"
              aria-label="Dependencia"
              value={dep}
              onChange={(e) => {
                setDep(e.target.value);
                setFlash(
                  e.target.value
                    ? `Dependencia: ${e.target.selectedOptions[0]?.text}`
                    : 'Todas las dependencias',
                );
              }}
            >
              <option value="">Todas las dependencias</option>
              <option value="salud">Salud</option>
              <option value="educacion">Educacion</option>
              <option value="finanzas">Finanzas</option>
            </select>
            <select
              className="gob-fb-select"
              aria-label="Estatus"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setFlash(
                  e.target.value
                    ? `Estatus: ${e.target.selectedOptions[0]?.text}`
                    : 'Cualquier estatus',
                );
              }}
            >
              <option value="">Cualquier estatus</option>
              <option value="revision">En revision</option>
              <option value="cerrado">Cerrado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </>
        ) : null}

        {showCount ? (
          <span slot="actions" className="gob-fb-count">
            {Math.max(resultCount, 3)} resultados
          </span>
        ) : null}

        {showClearTags ? (
          <button
            slot="actions"
            type="button"
            className="gob-fb-btn"
            onClick={() => {
              setTags([]);
              setFlash('Todas las etiquetas quitadas');
            }}
          >
            Limpiar todo
          </button>
        ) : null}

        {showActions ? (
          <>
            <button
              slot="actions"
              type="button"
              className="gob-fb-btn"
              onClick={clearFilters}
            >
              Limpiar
            </button>
            <button
              slot="actions"
              type="button"
              className="gob-fb-btn gob-fb-btn-primary"
              onClick={applyFilters}
            >
              Aplicar
            </button>
          </>
        ) : null}
      </gob-filter-bar>
      {flash ? <p className={local.flash}>{flash}</p> : null}
    </div>
  );
}
