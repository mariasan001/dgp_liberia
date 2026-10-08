'use client';

import {
  Fragment,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  ArrowsClockwise,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  DownloadSimple,
  Funnel,
  MagnifyingGlass,
  SortAscending,
} from '@phosphor-icons/react';

import type { DataGridTone } from '@mariasan001/ui-wc';

import { DEMO_ROWS, STATUS_TABS, type DemoRow, type GridExample } from './grid-data';
import {
  EMPTY_COL_FILTERS,
  expandRows,
  filterPipeline,
  pageWindow,
  paginate,
  parseMoney,
  sortRows,
  tabCounts,
  toggleSort,
  type ColFilters,
  type SortKey,
  type SortState,
  type TabId,
} from './grid-logic';
import local from './grid.module.css';

const ALL_ROWS = expandRows(DEMO_ROWS, 24);

const PAGER_VARIANTS = new Set([
  'paginated',
  'filters',
  'toolbar',
  'wide',
  'card-rows',
  'assignees',
  'progress',
  'tags',
  'live',
  'financial',
  'alert',
]);

const SPECIAL = new Set([
  'assignees',
  'progress',
  'tags',
  'live',
  'financial',
  'alert',
  'skeleton',
]);

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove?: () => void;
}) {
  return (
    <span className={local.filterChip}>
      {label}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Quitar ${label}`}
          className={local.chipX}
          onClick={onRemove}
        >
          ×
        </button>
      ) : null}
    </span>
  );
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
        className="gob-dg-sort"
        data-dir={dir}
        onClick={() => onSort(sortKey)}
      >
        {label}
      </button>
    </th>
  );
}

function PersonCell({ row }: { row: DemoRow }) {
  return (
    <span className="gob-dg-cell">
      <span className="gob-dg-avatar" data-hue={row.hue}>
        {row.initials}
      </span>
      <span className="gob-dg-stack">
        <span className="gob-dg-primary gob-dg-link">{row.ciudadano}</span>
        <span className="gob-dg-secondary">{row.curp}</span>
      </span>
    </span>
  );
}

function FolioCell({ row }: { row: DemoRow }) {
  return (
    <span className="gob-dg-stack">
      <span className="gob-dg-primary">
        {row.folio}
        {row.isNew ? <span className="gob-dg-badge-new">NUEVO</span> : null}
      </span>
      <span className="gob-dg-secondary">Creado: {row.fecha}</span>
    </span>
  );
}

function StatusPill({ row }: { row: DemoRow }) {
  return (
    <span className="gob-dg-status" data-tone={row.estatus}>
      <span className="gob-dg-dot" />
      {row.estatusLabel}
    </span>
  );
}

function Kebab({ onClick }: { onClick: () => void }) {
  return (
    <div className="gob-dg-actions">
      <button
        type="button"
        className="gob-dg-kebab"
        aria-label="Mas acciones"
        onClick={onClick}
      >
        ⋮
      </button>
    </div>
  );
}

function progressTone(value: number): 'ok' | 'warn' | 'err' {
  if (value >= 70) return 'ok';
  if (value >= 40) return 'warn';
  return 'err';
}

function notice(message: string, setFlash: (v: string) => void) {
  setFlash(message);
}

export function GridDemo({
  example,
  tone,
}: {
  example: GridExample;
  tone: DataGridTone;
}) {
  const [tab, setTab] = useState<TabId>('all');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [dep, setDep] = useState<string | null>(null);
  const [pago, setPago] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [sort, setSort] = useState<SortState | null>({
    key: 'folio',
    dir: 'desc',
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [colFilters, setColFilters] = useState<ColFilters>(EMPTY_COL_FILTERS);
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  const [flash, setFlash] = useState('');

  const wide = example.variant === 'wide';
  const frozenLeft = example.variant === 'frozen-left';
  const frozenRight = example.variant === 'frozen-right';
  const withExpand = example.variant === 'expandable';
  const withColFilter = example.variant === 'column-filter';
  const grouped = example.variant === 'grouped';
  const isBulk = example.variant === 'bulk';
  const isSkeleton = example.variant === 'skeleton';
  const special = SPECIAL.has(example.variant);
  const usePager = PAGER_VARIANTS.has(example.variant);

  useEffect(() => {
    setPage(1);
  }, [tab, deferredQuery, dep, pago, colFilters, pageSize, example.id]);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const filtered = useMemo(
    () =>
      filterPipeline(ALL_ROWS, {
        tab,
        query: deferredQuery,
        dep,
        pago,
        colFilters: withColFilter ? colFilters : EMPTY_COL_FILTERS,
      }),
    [tab, deferredQuery, dep, pago, colFilters, withColFilter],
  );

  const sorted = useMemo(() => sortRows(filtered, sort), [filtered, sort]);

  const counts = useMemo(() => {
    const base = filterPipeline(ALL_ROWS, {
      tab: 'all',
      query: deferredQuery,
      dep,
      pago,
      colFilters: withColFilter ? colFilters : EMPTY_COL_FILTERS,
    });
    return tabCounts(base);
  }, [deferredQuery, dep, pago, colFilters, withColFilter]);

  const pager = useMemo(() => {
    if (!usePager) {
      return {
        pageRows: sorted,
        page: 1,
        totalPages: 1,
        from: sorted.length ? 1 : 0,
        to: sorted.length,
      };
    }
    return paginate(sorted, page, pageSize);
  }, [sorted, page, pageSize, usePager]);

  const pageRows = pager.pageRows;
  const pageIds = pageRows.map((r) => r.folio);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const somePageSelected = pageIds.some((id) => selected.has(id));

  const showRowActions =
    frozenRight ||
    usePager ||
    withExpand ||
    isSkeleton ||
    example.variant === 'toolbar';

  const onSort = (key: SortKey) => setSort((s) => toggleSort(s, key));

  const toggleSelect = (folio: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(folio)) next.delete(folio);
      else next.add(folio);
      return next;
    });
  };

  const toggleSelectAllPage = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const toggleExpand = (folio: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(folio)) next.delete(folio);
      else next.add(folio);
      return next;
    });
  };

  const toggleGroup = (name: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const colSpan =
    (withExpand ? 1 : 0) +
    (isBulk ? 1 : 0) +
    5 +
    (wide ? 3 : 0) +
    (showRowActions || frozenRight ? 1 : 0);

  let body: ReactNode = null;

  if (isSkeleton) {
    body = Array.from({ length: 5 }).map((_, index) => (
      <tr key={index}>
        <td>
          <span className="gob-dg-stack">
            <span className="gob-dg-skel" style={{ width: '70%' }} />
            <span className="gob-dg-skel" style={{ width: '45%' }} />
          </span>
        </td>
        <td>
          <span className="gob-dg-cell">
            <span className="gob-dg-skel" data-size="lg" />
            <span className="gob-dg-stack">
              <span className="gob-dg-skel" style={{ width: 120 }} />
              <span className="gob-dg-skel" style={{ width: 90 }} />
            </span>
          </span>
        </td>
        <td>
          <span className="gob-dg-skel" style={{ width: 72 }} />
        </td>
        <td>
          <span className="gob-dg-skel" data-size="pill" />
        </td>
        <td>
          <span className="gob-dg-skel" style={{ width: 18, height: 18 }} />
        </td>
      </tr>
    ));
  } else if (grouped) {
    const groups = ['Salud', 'Educacion', 'Movilidad', 'Hacienda', 'Seguridad'];
    body = groups.flatMap((name) => {
      const rows = sorted.filter((r) => r.dependencia === name);
      if (!rows.length) return [];
      const isCollapsed = collapsed.has(name);
      return [
        <tr key={`g-${name}`} className="gob-dg-group">
          <td colSpan={6}>
            <button
              type="button"
              className={local.groupToggle}
              onClick={() => toggleGroup(name)}
            >
              {isCollapsed ? '▸' : '▾'} {name} · {rows.length} expedientes
            </button>
          </td>
        </tr>,
        ...(isCollapsed
          ? []
          : rows.map((row) => (
              <tr key={row.folio}>
                <td>
                  <FolioCell row={row} />
                </td>
                <td>
                  <PersonCell row={row} />
                </td>
                <td>
                  <span className="gob-dg-tag">{row.dependencia}</span>
                </td>
                <td>
                  <span className="gob-dg-secondary">{row.relative}</span>
                </td>
                <td className="num">{row.monto}</td>
                <td>
                  <StatusPill row={row} />
                </td>
              </tr>
            ))),
      ];
    });
  } else if (special && example.variant !== 'skeleton') {
    body = pageRows.map((row) => {
      if (example.variant === 'assignees') {
        return (
          <tr key={row.folio}>
            <td>
              <FolioCell row={row} />
            </td>
            <td>
              <PersonCell row={row} />
            </td>
            <td>
              <span className="gob-dg-avatars">
                {row.assignees.map((person) => (
                  <span
                    key={`${row.folio}-${person.initials}`}
                    className="gob-dg-avatar"
                    data-hue={person.hue}
                  >
                    {person.initials}
                  </span>
                ))}
                {row.assigneeExtra > 0 ? (
                  <span className="gob-dg-more">+{row.assigneeExtra}</span>
                ) : null}
              </span>
            </td>
            <td>
              <StatusPill row={row} />
            </td>
            <td>
              <Kebab
                onClick={() =>
                  notice(`Acciones de ${row.folio}`, setFlash)
                }
              />
            </td>
          </tr>
        );
      }
      if (example.variant === 'progress') {
        const toneP = progressTone(row.progress);
        const toneS = progressTone(row.score * 10);
        return (
          <tr key={row.folio}>
            <td>
              <FolioCell row={row} />
            </td>
            <td>
              <PersonCell row={row} />
            </td>
            <td>
              <span className="gob-dg-progress">
                <span className="gob-dg-secondary">{row.progress}% · docs</span>
                <span className="gob-dg-progress-track">
                  <span
                    className="gob-dg-progress-fill"
                    data-tone={toneP}
                    style={{ width: `${row.progress}%` }}
                  />
                </span>
              </span>
            </td>
            <td>
              <span
                className="gob-dg-ring"
                data-tone={toneS}
                style={{ ['--p' as string]: row.score * 10 }}
              >
                <span>{row.score}/10</span>
              </span>
            </td>
            <td>
              <StatusPill row={row} />
            </td>
            <td>
              <Kebab
                onClick={() =>
                  notice(`Acciones de ${row.folio}`, setFlash)
                }
              />
            </td>
          </tr>
        );
      }
      if (example.variant === 'tags') {
        return (
          <tr key={row.folio}>
            <td>
              <FolioCell row={row} />
            </td>
            <td>
              <PersonCell row={row} />
            </td>
            <td>
              <span className="gob-dg-tags">
                {row.tags.map((tag) => (
                  <span key={tag} className="gob-dg-tag">
                    {tag}
                  </span>
                ))}
              </span>
            </td>
            <td>
              <StatusPill row={row} />
            </td>
            <td>
              <Kebab
                onClick={() =>
                  notice(`Acciones de ${row.folio}`, setFlash)
                }
              />
            </td>
          </tr>
        );
      }
      if (example.variant === 'live') {
        return (
          <tr key={row.folio}>
            <td>
              <FolioCell row={row} />
            </td>
            <td>
              <span className="gob-dg-stack">
                <span className="gob-dg-primary">{row.location}</span>
                <span className="gob-dg-secondary">{row.locationNote}</span>
              </span>
            </td>
            <td>
              {row.live ? (
                <span className="gob-dg-live">
                  <span className="gob-dg-dot" />
                  Live
                </span>
              ) : (
                <span className="gob-dg-tag">Offline</span>
              )}
            </td>
            <td>
              <StatusPill row={row} />
            </td>
            <td>
              <Kebab
                onClick={() =>
                  notice(`Acciones de ${row.folio}`, setFlash)
                }
              />
            </td>
          </tr>
        );
      }
      if (example.variant === 'financial') {
        return (
          <tr key={row.folio}>
            <td>
              <FolioCell row={row} />
            </td>
            <td>
              <PersonCell row={row} />
            </td>
            <td className="num">
              <span className="gob-dg-primary">{row.monto}</span>
            </td>
            <td className="num">
              <span
                className={
                  parseMoney(row.pagado) === 0
                    ? 'gob-dg-amount-neg'
                    : 'gob-dg-amount-pos'
                }
              >
                {row.pagado}
              </span>
            </td>
            <td className="num">
              <span
                className={
                  parseMoney(row.saldo) === 0
                    ? 'gob-dg-amount-pos'
                    : 'gob-dg-amount-neg'
                }
              >
                {row.saldo}
              </span>
            </td>
            <td>
              <StatusPill row={row} />
            </td>
            <td>
              <Kebab
                onClick={() =>
                  notice(`Acciones de ${row.folio}`, setFlash)
                }
              />
            </td>
          </tr>
        );
      }
      // alert
      return (
        <tr key={row.folio} className={row.alert ? 'gob-dg-alert' : undefined}>
          <td>
            <FolioCell row={row} />
          </td>
          <td>
            <PersonCell row={row} />
          </td>
          <td>
            {row.alert ? (
              <span className="gob-dg-priority">
                <span className="gob-dg-dot" />
                {row.alertReason}
              </span>
            ) : (
              <span className="gob-dg-secondary">Sin alerta</span>
            )}
          </td>
          <td>
            <StatusPill row={row} />
          </td>
          <td>
            <Kebab
              onClick={() => notice(`Acciones de ${row.folio}`, setFlash)}
            />
          </td>
        </tr>
      );
    });
  } else {
    body = pageRows.map((row) => {
      const isOpen = expanded.has(row.folio);
      return (
        <Fragment key={row.folio}>
          <tr>
            {withExpand ? (
              <td>
                <button
                  type="button"
                  className="gob-dg-expand"
                  aria-label={isOpen ? 'Colapsar' : 'Expandir'}
                  aria-expanded={isOpen}
                  onClick={() => toggleExpand(row.folio)}
                >
                  {isOpen ? '−' : '+'}
                </button>
              </td>
            ) : null}
            {isBulk ? (
              <td>
                <input
                  className="gob-dg-check"
                  type="checkbox"
                  checked={selected.has(row.folio)}
                  onChange={() => toggleSelect(row.folio)}
                  aria-label={`Seleccionar ${row.folio}`}
                />
              </td>
            ) : null}
            <td className={frozenLeft ? 'freeze' : undefined}>
              <FolioCell row={row} />
            </td>
            <td>
              <PersonCell row={row} />
            </td>
            <td>
              <span className="gob-dg-stack">
                <span className="gob-dg-primary">{row.dependencia}</span>
                <span className="gob-dg-secondary">{row.programa}</span>
              </span>
            </td>
            {wide ? (
              <>
                <td>{row.municipio}</td>
                <td>
                  <span className="gob-dg-tag">{row.programa}</span>
                </td>
                <td>
                  <span className="gob-dg-secondary">{row.relative}</span>
                </td>
              </>
            ) : (
              <td>
                <span className="gob-dg-secondary">{row.relative}</span>
              </td>
            )}
            <td className="num">
              <span className="gob-dg-stack" style={{ textAlign: 'right' }}>
                <span className="gob-dg-primary">{row.monto}</span>
                <span
                  className={
                    parseMoney(row.pagado) === 0
                      ? 'gob-dg-amount-neg'
                      : 'gob-dg-amount-pos'
                  }
                  style={{ fontSize: 12 }}
                >
                  Pagado {row.pagado}
                </span>
              </span>
            </td>
            <td>
              <StatusPill row={row} />
            </td>
            {showRowActions || frozenRight ? (
              <td>
                <Kebab
                  onClick={() =>
                    notice(`Acciones de ${row.folio}`, setFlash)
                  }
                />
              </td>
            ) : null}
          </tr>
          {withExpand && isOpen ? (
            <tr className="gob-dg-detail">
              <td colSpan={colSpan}>
                <div className="gob-dg-detail-card">
                  <div className="gob-dg-detail-row">
                    <span className="gob-dg-stack">
                      <span className="gob-dg-primary">
                        Historial · {row.folio}
                      </span>
                      <span className="gob-dg-secondary">
                        {row.locationNote} · {row.dependencia} · {row.programa}
                      </span>
                    </span>
                    <span className="gob-dg-actions">
                      <button
                        type="button"
                        className="gob-dg-btn"
                        onClick={() =>
                          notice(`Pago registrado en ${row.folio}`, setFlash)
                        }
                      >
                        Registrar pago
                      </button>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ) : null}
        </Fragment>
      );
    });
  }

  const footerLabel = isSkeleton
    ? 'Cargando…'
    : grouped
      ? `${sorted.length} expedientes en grupos`
      : example.variant === 'live'
        ? `${sorted.filter((r) => r.live).length} unidades en vivo · ${pager.from} – ${pager.to} de ${sorted.length}`
        : example.variant === 'alert'
          ? `${sorted.filter((r) => r.alert).length} alertas · ${pager.from} – ${pager.to} de ${sorted.length}`
          : example.variant === 'financial'
            ? `Saldo pendiente: $${sorted
                .reduce((acc, r) => acc + parseMoney(r.saldo), 0)
                .toLocaleString('es-MX', { minimumFractionDigits: 2 })} · ${pager.from} – ${pager.to} de ${sorted.length}`
            : example.variant === 'progress'
              ? `Promedio avance: ${Math.round(
                  sorted.reduce((a, r) => a + r.progress, 0) /
                    Math.max(1, sorted.length),
                )}% · ${pager.from} – ${pager.to} de ${sorted.length}`
              : `${pager.from} – ${pager.to} de ${sorted.length}`;

  return (
    <div className={local.stageInner}>
      <gob-data-grid
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
            {!isSkeleton ? (
              <>
                <button
                  type="button"
                  className={local.toolBtn}
                  onClick={() =>
                    setSort((s) =>
                      s ? { ...s, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key: 'folio', dir: 'asc' },
                    )
                  }
                >
                  <SortAscending weight="bold" size={13} />
                  Ordenar
                </button>
                <button
                  type="button"
                  className={local.toolBtn}
                  onClick={() => {
                    setDep((d) => (d ? null : 'Salud'));
                    setPage(1);
                  }}
                >
                  <Funnel weight="bold" size={13} />
                  Filtrar
                </button>
              </>
            ) : null}
            <button
              type="button"
              className={local.toolBtn}
              onClick={() => {
                setQuery('');
                setTab('all');
                setDep(null);
                setPago('all');
                setColFilters(EMPTY_COL_FILTERS);
                setSelected(new Set());
                setPage(1);
                notice('Vista actualizada', setFlash);
              }}
            >
              <ArrowsClockwise weight="bold" size={13} />
              Refrescar
            </button>
            <button
              type="button"
              className={`${local.toolBtn} ${local.toolBtnPrimary}`}
              onClick={() =>
                notice(
                  selected.size
                    ? `Exportados ${selected.size} seleccionados`
                    : `Exportados ${sorted.length} resultados`,
                  setFlash,
                )
              }
            >
              <DownloadSimple weight="bold" size={13} />
              Exportar
            </button>
          </span>
        ) : null}

        {example.showTabs ? (
          <nav slot="tabs" className={local.tabs} aria-label="Estatus">
            {STATUS_TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${local.tab} ${tab === item.id ? local.tabActive : ''}`}
                aria-pressed={tab === item.id}
                onClick={() => setTab(item.id)}
              >
                {item.label}
                <span className={local.tabCount}>{counts[item.id]}</span>
              </button>
            ))}
          </nav>
        ) : null}

        {example.showFilters ? (
          <div slot="filters" className={local.filtersRow}>
            <label className={local.search}>
              <MagnifyingGlass weight="bold" size={14} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar folio, CURP o nombre..."
              />
            </label>
            <button
              type="button"
              className={local.dateBtn}
              onClick={() =>
                notice('Rango: 1 mar – 30 mar 2026 (demo)', setFlash)
              }
            >
              <CalendarBlank weight="bold" size={14} />
              1 mar – 30 mar 2026
            </button>
            <FilterChip
              label={dep ? `Dependencia: ${dep}` : 'Dependencia: Todas'}
              onRemove={dep ? () => setDep(null) : undefined}
            />
            <FilterChip
              label={
                pago === 'all'
                  ? 'Pago: Cualquiera'
                  : pago === 'paid'
                    ? 'Pago: Cubierto'
                    : 'Pago: Pendiente'
              }
              onRemove={pago !== 'all' ? () => setPago('all') : undefined}
            />
            <button
              type="button"
              className={local.toolBtn}
              onClick={() =>
                setPago((p) =>
                  p === 'all' ? 'unpaid' : p === 'unpaid' ? 'paid' : 'all',
                )
              }
            >
              Ciclar pago
            </button>
          </div>
        ) : null}

        {isBulk ? (
          <div slot="bulk" className={local.bulkRow}>
            <span>
              {selected.size} seleccionado{selected.size === 1 ? '' : 's'}
            </span>
            <span className={local.toolbar}>
              <button
                type="button"
                className={local.toolBtn}
                disabled={!selected.size}
                onClick={() => {
                  notice(`Reasignados ${selected.size}`, setFlash);
                  setSelected(new Set());
                }}
              >
                Reasignar
              </button>
              <button
                type="button"
                className={local.toolBtn}
                disabled={!selected.size}
                onClick={() => {
                  notice(`Archivados ${selected.size}`, setFlash);
                  setSelected(new Set());
                }}
              >
                Archivar
              </button>
              <button
                type="button"
                className={local.toolBtn}
                disabled={!selected.size}
                onClick={() =>
                  notice(`Exportado lote de ${selected.size}`, setFlash)
                }
              >
                Exportar lote
              </button>
            </span>
          </div>
        ) : null}

        <table>
          <thead>
            {isSkeleton ? (
              <tr>
                <th>Expediente</th>
                <th>Ciudadano</th>
                <th>Dependencia</th>
                <th>Estatus</th>
                <th style={{ width: 48 }} />
              </tr>
            ) : example.variant === 'assignees' ? (
              <tr>
                <SortTh label="Expediente" sortKey="folio" sort={sort} onSort={onSort} />
                <SortTh label="Ciudadano" sortKey="ciudadano" sort={sort} onSort={onSort} />
                <th>Asignados</th>
                <SortTh label="Estatus" sortKey="estatus" sort={sort} onSort={onSort} />
                <th style={{ width: 48 }} />
              </tr>
            ) : example.variant === 'progress' ? (
              <tr>
                <SortTh label="Expediente" sortKey="folio" sort={sort} onSort={onSort} />
                <SortTh label="Ciudadano" sortKey="ciudadano" sort={sort} onSort={onSort} />
                <SortTh label="Avance" sortKey="progress" sort={sort} onSort={onSort} />
                <SortTh label="Score" sortKey="score" sort={sort} onSort={onSort} />
                <SortTh label="Estatus" sortKey="estatus" sort={sort} onSort={onSort} />
                <th style={{ width: 48 }} />
              </tr>
            ) : example.variant === 'tags' ? (
              <tr>
                <SortTh label="Expediente" sortKey="folio" sort={sort} onSort={onSort} />
                <SortTh label="Ciudadano" sortKey="ciudadano" sort={sort} onSort={onSort} />
                <th>Etiquetas</th>
                <SortTh label="Estatus" sortKey="estatus" sort={sort} onSort={onSort} />
                <th style={{ width: 48 }} />
              </tr>
            ) : example.variant === 'live' ? (
              <tr>
                <SortTh label="Expediente" sortKey="folio" sort={sort} onSort={onSort} />
                <SortTh label="Ubicacion" sortKey="location" sort={sort} onSort={onSort} />
                <th>Señal</th>
                <SortTh label="Estatus" sortKey="estatus" sort={sort} onSort={onSort} />
                <th style={{ width: 48 }} />
              </tr>
            ) : example.variant === 'financial' ? (
              <tr>
                <SortTh label="Expediente" sortKey="folio" sort={sort} onSort={onSort} />
                <SortTh label="Ciudadano" sortKey="ciudadano" sort={sort} onSort={onSort} />
                <SortTh label="Total" sortKey="monto" sort={sort} onSort={onSort} align="right" />
                <SortTh label="Pagado" sortKey="pagado" sort={sort} onSort={onSort} align="right" />
                <SortTh label="Saldo" sortKey="saldo" sort={sort} onSort={onSort} align="right" />
                <SortTh label="Estatus" sortKey="estatus" sort={sort} onSort={onSort} />
                <th style={{ width: 48 }} />
              </tr>
            ) : example.variant === 'alert' ? (
              <tr>
                <SortTh label="Expediente" sortKey="folio" sort={sort} onSort={onSort} />
                <SortTh label="Ciudadano" sortKey="ciudadano" sort={sort} onSort={onSort} />
                <th>Alerta</th>
                <SortTh label="Estatus" sortKey="estatus" sort={sort} onSort={onSort} />
                <th style={{ width: 48 }} />
              </tr>
            ) : (
              <tr>
                {withExpand ? <th style={{ width: 40 }} /> : null}
                {isBulk ? (
                  <th style={{ width: 36 }}>
                    <input
                      className="gob-dg-check"
                      type="checkbox"
                      checked={allPageSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = somePageSelected && !allPageSelected;
                      }}
                      onChange={toggleSelectAllPage}
                      aria-label="Seleccionar todo"
                    />
                  </th>
                ) : null}
                <SortTh label="Expediente" sortKey="folio" sort={sort} onSort={onSort} />
                <SortTh label="Ciudadano" sortKey="ciudadano" sort={sort} onSort={onSort} />
                <SortTh label="Dependencia" sortKey="dependencia" sort={sort} onSort={onSort} />
                {wide ? (
                  <>
                    <th>Municipio</th>
                    <th>Programa</th>
                    <SortTh label="Actualizado" sortKey="relative" sort={sort} onSort={onSort} />
                  </>
                ) : (
                  <SortTh label="Actualizado" sortKey="relative" sort={sort} onSort={onSort} />
                )}
                <SortTh label="Monto" sortKey="monto" sort={sort} onSort={onSort} align="right" />
                <SortTh label="Estatus" sortKey="estatus" sort={sort} onSort={onSort} />
                {showRowActions || frozenRight ? <th style={{ width: 48 }} /> : null}
              </tr>
            )}
            {withColFilter ? (
              <tr>
                {(
                  [
                    'folio',
                    'ciudadano',
                    'dependencia',
                    'fecha',
                    'monto',
                    'estatus',
                  ] as const
                ).map((field) => (
                  <th key={field}>
                    <input
                      className="gob-dg-col-filter"
                      placeholder={field[0].toUpperCase() + field.slice(1)}
                      value={colFilters[field]}
                      onChange={(e) =>
                        setColFilters((prev) => ({
                          ...prev,
                          [field]: e.target.value,
                        }))
                      }
                    />
                  </th>
                ))}
              </tr>
            ) : null}
          </thead>
          <tbody>
            {body}
            {!isSkeleton && !grouped && pageRows.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <span className="gob-dg-secondary">
                    Sin resultados con los filtros actuales.
                  </span>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>

        <span slot="footer" className={local.footerSlot}>
          <span className={local.footerMeta}>
            <span>{flash || footerLabel}</span>
            {usePager && !isSkeleton ? (
              <label className={local.perPage}>
                Filas
                <select
                  value={pageSize}
                  aria-label="Filas por pagina"
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </label>
            ) : null}
          </span>
          {usePager && !isSkeleton ? (
            <nav className={local.pager} aria-label="Paginacion">
              <button
                type="button"
                className={local.pageBtn}
                aria-label="Anterior"
                disabled={pager.page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <CaretLeft weight="bold" size={14} />
              </button>
              {pageWindow(pager.page, pager.totalPages).map((item, idx) =>
                item === '…' ? (
                  <span key={`e-${idx}`} className={local.pageEllipsis}>
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className={`${local.pageBtn} ${pager.page === item ? local.pageBtnActive : ''}`}
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </button>
                ),
              )}
              <button
                type="button"
                className={local.pageBtn}
                aria-label="Siguiente"
                disabled={pager.page >= pager.totalPages}
                onClick={() =>
                  setPage((p) => Math.min(pager.totalPages, p + 1))
                }
              >
                <CaretRight weight="bold" size={14} />
              </button>
            </nav>
          ) : null}
        </span>
      </gob-data-grid>
    </div>
  );
}
