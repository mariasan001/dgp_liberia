'use client';

import { useEffect, useMemo, useState } from 'react';
import { DownloadSimple, Funnel } from '@phosphor-icons/react';

import type { TableTone } from '@mariasan001/ui-wc';

import {
  DEMO_ROWS,
  DEMO_ROWS_LONG,
  type DemoRow,
  type TableExample,
} from './table-data';
import local from './table.module.css';

type SortKey = 'folio' | 'ciudadano' | 'dependencia' | 'fecha' | 'monto';
type SortState = { key: SortKey; dir: 'asc' | 'desc' };

function parseMoney(value: string): number {
  return Number(value.replace(/[^0-9.-]/g, '')) || 0;
}

function toggleSort(current: SortState | null, key: SortKey): SortState | null {
  if (!current || current.key !== key) return { key, dir: 'asc' };
  if (current.dir === 'asc') return { key, dir: 'desc' };
  return null;
}

function sortRows(rows: DemoRow[], sort: SortState | null): DemoRow[] {
  if (!sort) return rows;
  const copy = [...rows];
  copy.sort((a, b) => {
    const av = sort.key === 'monto' ? parseMoney(a.monto) : a[sort.key];
    const bv = sort.key === 'monto' ? parseMoney(b.monto) : b[sort.key];
    let cmp = 0;
    if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
    else cmp = String(av).localeCompare(String(bv), 'es', { sensitivity: 'base' });
    return sort.dir === 'asc' ? cmp : -cmp;
  });
  return copy;
}

function SortTh({
  label,
  sortKey,
  sort,
  onSort,
  align = 'left',
}: {
  label: string;
  sortKey: SortKey;
  sort: SortState | null;
  onSort: (key: SortKey) => void;
  align?: 'left' | 'right';
}) {
  const dir = sort?.key === sortKey ? sort.dir : undefined;
  return (
    <th className={align === 'right' ? 'num' : undefined}>
      <button
        type="button"
        className="gob-tb-sort"
        data-dir={dir}
        onClick={() => onSort(sortKey)}
      >
        {label}
      </button>
    </th>
  );
}

export function TableDemo({
  example,
  tone,
}: {
  example: TableExample;
  tone: TableTone;
}) {
  const source =
    example.variant === 'sticky' || example.variant === 'dense'
      ? DEMO_ROWS_LONG
      : DEMO_ROWS;

  const [sort, setSort] = useState<SortState | null>(
    example.variant === 'sortable' ? { key: 'folio', dir: 'asc' } : null,
  );
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [query, setQuery] = useState('');
  const [flash, setFlash] = useState('');
  const [menuFor, setMenuFor] = useState<string | null>(null);

  const showCheck = example.variant === 'selectable';
  const showSort = example.variant === 'sortable';
  const showStatus =
    example.variant === 'status' || example.variant === 'actions';
  const showRowActions = example.variant === 'actions';
  const rich =
    example.variant === 'basic' ||
    example.variant === 'status' ||
    example.variant === 'actions' ||
    example.variant === 'selectable' ||
    example.variant === 'sortable';

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return source;
    return source.filter(
      (row) =>
        row.folio.toLowerCase().includes(q) ||
        row.ciudadano.toLowerCase().includes(q) ||
        row.curp.toLowerCase().includes(q) ||
        row.dependencia.toLowerCase().includes(q),
    );
  }, [source, query]);

  const rows = useMemo(
    () => (showSort ? sortRows(filtered, sort) : filtered),
    [filtered, showSort, sort],
  );

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.folio));
  const someSelected = rows.some((r) => selected.has(r.folio));

  const onSort = (key: SortKey) => setSort((s) => toggleSort(s, key));

  const toggleOne = (folio: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(folio)) next.delete(folio);
      else next.add(folio);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) rows.forEach((r) => next.delete(r.folio));
      else rows.forEach((r) => next.add(r.folio));
      return next;
    });
  };

  const footerText = flash
    ? flash
    : showCheck
      ? `${selected.size} seleccionado${selected.size === 1 ? '' : 's'} de ${rows.length}`
      : example.footer
        ? example.footer.replace(/\d.*/, `${rows.length} registros`)
        : `${rows.length} registros`;

  if (example.variant === 'empty') {
    return (
      <div className={local.stageInner}>
        <gob-table
          key={`${example.id}-${tone}`}
          variant={example.variant}
          tone={tone}
        >
          <span slot="title">{example.cardTitle}</span>
          {example.subtitle ? (
            <span slot="subtitle">{example.subtitle}</span>
          ) : null}
          <div slot="empty" className={local.emptyBox}>
            <p className={local.emptyTitle}>Sin resultados</p>
            <p className={local.emptyDesc}>
              No hay expedientes con ese folio, CURP o RFC. Ajusta filtros o
              limpia la busqueda.
            </p>
          </div>
        </gob-table>
      </div>
    );
  }

  return (
    <div className={local.stageInner}>
      <gob-table
        key={`${example.id}-${tone}`}
        variant={example.variant}
        tone={tone}
      >
        <span slot="title">{example.cardTitle}</span>
        {example.subtitle ? (
          <span slot="subtitle">{example.subtitle}</span>
        ) : null}
        {example.showActions ? (
          <span slot="actions" className={local.toolbar}>
            <label className={local.miniSearch}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filtrar…"
                aria-label="Filtrar filas"
              />
            </label>
            <button
              type="button"
              className={local.toolBtn}
              onClick={() => {
                setQuery((q) => (q ? '' : 'Salud'));
                setFlash(query ? 'Filtro limpiado' : 'Filtrado: Salud');
              }}
            >
              <Funnel weight="bold" size={13} />
              Filtrar
            </button>
            <button
              type="button"
              className={local.toolBtn}
              onClick={() =>
                setFlash(
                  selected.size
                    ? `Exportados ${selected.size}`
                    : `Exportados ${rows.length}`,
                )
              }
            >
              <DownloadSimple weight="bold" size={13} />
              Exportar
            </button>
          </span>
        ) : null}

        <table>
          <thead>
            <tr>
              {showCheck ? (
                <th style={{ width: 36 }}>
                  <input
                    className="gob-tb-check"
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected && !allSelected;
                    }}
                    onChange={toggleAll}
                    aria-label="Seleccionar todo"
                  />
                </th>
              ) : null}
              {showSort ? (
                <>
                  <SortTh label="Expediente" sortKey="folio" sort={sort} onSort={onSort} />
                  <SortTh label="Ciudadano" sortKey="ciudadano" sort={sort} onSort={onSort} />
                  <SortTh label="Dependencia" sortKey="dependencia" sort={sort} onSort={onSort} />
                  <SortTh label="Fecha" sortKey="fecha" sort={sort} onSort={onSort} />
                  <SortTh
                    label="Monto"
                    sortKey="monto"
                    sort={sort}
                    onSort={onSort}
                    align="right"
                  />
                </>
              ) : (
                <>
                  <th>Expediente</th>
                  <th>Ciudadano</th>
                  <th>Dependencia</th>
                  <th>Fecha</th>
                  <th className="num">Monto</th>
                </>
              )}
              {showStatus ? <th>Estatus</th> : null}
              {showRowActions ? <th style={{ width: 48 }} /> : null}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={showCheck || showRowActions ? 7 : 6}>
                  <span className="gob-tb-secondary">Sin coincidencias.</span>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.folio}>
                  {showCheck ? (
                    <td>
                      <input
                        className="gob-tb-check"
                        type="checkbox"
                        checked={selected.has(row.folio)}
                        onChange={() => toggleOne(row.folio)}
                        aria-label={`Seleccionar ${row.folio}`}
                      />
                    </td>
                  ) : null}
                  <td>
                    {rich ? (
                      <span className="gob-tb-stack">
                        <span className="gob-tb-primary">{row.folio}</span>
                        <span className="gob-tb-secondary">
                          Creado: {row.fecha}
                        </span>
                      </span>
                    ) : (
                      <code className={local.folio}>{row.folio}</code>
                    )}
                  </td>
                  <td>
                    {rich ? (
                      <span className="gob-tb-cell">
                        <span className="gob-tb-avatar" data-hue={row.hue}>
                          {row.initials}
                        </span>
                        <span className="gob-tb-stack">
                          <span className="gob-tb-primary">{row.ciudadano}</span>
                          <span className="gob-tb-secondary">{row.curp}</span>
                        </span>
                      </span>
                    ) : (
                      row.ciudadano
                    )}
                  </td>
                  <td>{row.dependencia}</td>
                  <td>
                    <span className="gob-tb-secondary">{row.fecha}</span>
                  </td>
                  <td className="num">{row.monto}</td>
                  {showStatus ? (
                    <td>
                      <span className="gob-tb-status" data-tone={row.estatus}>
                        <span className="gob-tb-dot" />
                        {row.estatusLabel}
                      </span>
                    </td>
                  ) : null}
                  {showRowActions ? (
                    <td className={local.actionCell}>
                      <button
                        type="button"
                        className="gob-tb-kebab"
                        aria-label="Mas acciones"
                        aria-expanded={menuFor === row.folio}
                        onClick={() =>
                          setMenuFor((m) =>
                            m === row.folio ? null : row.folio,
                          )
                        }
                      >
                        ⋮
                      </button>
                      {menuFor === row.folio ? (
                        <div className={local.menu} role="menu">
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setFlash(`Ver ${row.folio}`);
                              setMenuFor(null);
                            }}
                          >
                            Ver
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setFlash(`PDF de ${row.folio}`);
                              setMenuFor(null);
                            }}
                          >
                            Descargar PDF
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setFlash(`Reasignar ${row.folio}`);
                              setMenuFor(null);
                            }}
                          >
                            Reasignar
                          </button>
                        </div>
                      ) : null}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <span slot="footer" className={local.footerSlot}>
          <span>{footerText}</span>
        </span>
      </gob-table>
    </div>
  );
}
