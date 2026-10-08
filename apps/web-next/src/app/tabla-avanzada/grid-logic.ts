import type { DemoRow } from './grid-data';

export type TabId =
  | 'all'
  | 'active'
  | 'review'
  | 'transit'
  | 'done'
  | 'cancel';

export type SortKey =
  | 'folio'
  | 'ciudadano'
  | 'dependencia'
  | 'relative'
  | 'monto'
  | 'estatus'
  | 'pagado'
  | 'saldo'
  | 'progress'
  | 'score'
  | 'location';

export type SortState = { key: SortKey; dir: 'asc' | 'desc' };

export type ColFilters = {
  folio: string;
  ciudadano: string;
  dependencia: string;
  fecha: string;
  monto: string;
  estatus: string;
};

export const EMPTY_COL_FILTERS: ColFilters = {
  folio: '',
  ciudadano: '',
  dependencia: '',
  fecha: '',
  monto: '',
  estatus: '',
};

export function parseMoney(value: string): number {
  return Number(value.replace(/[^0-9.-]/g, '')) || 0;
}

export function matchesTab(row: DemoRow, tab: TabId): boolean {
  switch (tab) {
    case 'all':
      return true;
    case 'active':
      return row.estatus === 'ok' || row.estatus === 'info' || row.estatus === 'warn';
    case 'review':
      return row.estatus === 'warn';
    case 'transit':
      return row.estatus === 'info';
    case 'done':
      return row.estatus === 'ok';
    case 'cancel':
      return row.estatus === 'err';
    default:
      return true;
  }
}

export function matchesQuery(row: DemoRow, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    row.folio.toLowerCase().includes(q) ||
    row.ciudadano.toLowerCase().includes(q) ||
    row.curp.toLowerCase().includes(q) ||
    row.dependencia.toLowerCase().includes(q) ||
    row.programa.toLowerCase().includes(q)
  );
}

export function matchesDep(row: DemoRow, dep: string | null): boolean {
  if (!dep) return true;
  return row.dependencia === dep;
}

export function matchesPago(
  row: DemoRow,
  pago: 'all' | 'paid' | 'unpaid',
): boolean {
  if (pago === 'all') return true;
  if (pago === 'paid') return parseMoney(row.saldo) === 0;
  return parseMoney(row.saldo) > 0;
}

export function matchesColFilters(row: DemoRow, filters: ColFilters): boolean {
  const checks: [string, string][] = [
    [filters.folio, row.folio],
    [filters.ciudadano, row.ciudadano],
    [filters.dependencia, row.dependencia],
    [filters.fecha, row.fecha],
    [filters.monto, row.monto],
    [filters.estatus, row.estatusLabel],
  ];
  return checks.every(([needle, hay]) => {
    const n = needle.trim().toLowerCase();
    if (!n) return true;
    return hay.toLowerCase().includes(n);
  });
}

function sortValue(row: DemoRow, key: SortKey): string | number {
  switch (key) {
    case 'monto':
    case 'pagado':
    case 'saldo':
      return parseMoney(row[key]);
    case 'progress':
    case 'score':
      return row[key];
    case 'estatus':
      return row.estatusLabel;
    default:
      return row[key];
  }
}

export function sortRows(rows: DemoRow[], sort: SortState | null): DemoRow[] {
  if (!sort) return rows;
  const copy = [...rows];
  copy.sort((a, b) => {
    const av = sortValue(a, sort.key);
    const bv = sortValue(b, sort.key);
    let cmp = 0;
    if (typeof av === 'number' && typeof bv === 'number') {
      cmp = av - bv;
    } else {
      cmp = String(av).localeCompare(String(bv), 'es', { sensitivity: 'base' });
    }
    return sort.dir === 'asc' ? cmp : -cmp;
  });
  return copy;
}

export function toggleSort(
  current: SortState | null,
  key: SortKey,
): SortState | null {
  if (!current || current.key !== key) return { key, dir: 'asc' };
  if (current.dir === 'asc') return { key, dir: 'desc' };
  return null;
}

export function paginate<T>(
  rows: T[],
  page: number,
  pageSize: number,
): { pageRows: T[]; page: number; totalPages: number; from: number; to: number } {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const pageRows = rows.slice(start, start + pageSize);
  const from = rows.length === 0 ? 0 : start + 1;
  const to = start + pageRows.length;
  return { pageRows, page: safePage, totalPages, from, to };
}

export function tabCounts(rows: DemoRow[]): Record<TabId, number> {
  return {
    all: rows.length,
    active: rows.filter((r) => matchesTab(r, 'active')).length,
    review: rows.filter((r) => matchesTab(r, 'review')).length,
    transit: rows.filter((r) => matchesTab(r, 'transit')).length,
    done: rows.filter((r) => matchesTab(r, 'done')).length,
    cancel: rows.filter((r) => matchesTab(r, 'cancel')).length,
  };
}

export function filterPipeline(
  rows: DemoRow[],
  opts: {
    tab: TabId;
    query: string;
    dep: string | null;
    pago: 'all' | 'paid' | 'unpaid';
    colFilters: ColFilters;
  },
): DemoRow[] {
  return rows.filter(
    (row) =>
      matchesTab(row, opts.tab) &&
      matchesQuery(row, opts.query) &&
      matchesDep(row, opts.dep) &&
      matchesPago(row, opts.pago) &&
      matchesColFilters(row, opts.colFilters),
  );
}

/** Expande el seed a N filas para demos de paginacion. */
export function expandRows(seed: DemoRow[], target = 24): DemoRow[] {
  if (seed.length >= target) return seed.slice(0, target);
  const out: DemoRow[] = [...seed];
  let i = 0;
  while (out.length < target) {
    const base = seed[i % seed.length];
    const n = 1488 + out.length;
    const folio = `EXP-2026-${String(n).padStart(5, '0')}`;
    out.push({
      ...base,
      folio,
      isNew: out.length % 7 === 0,
      relative: out.length % 3 === 0 ? 'hace 3 d' : base.relative,
      alert: out.length % 5 === 0 ? true : base.alert,
      alertReason:
        out.length % 5 === 0 ? 'Revision pendiente' : base.alertReason,
      live: out.length % 2 === 0 ? base.live : !base.live,
      progress: Math.max(10, Math.min(100, base.progress - (out.length % 9) * 5)),
      score: Math.max(1, Math.min(10, base.score - (out.length % 4))),
    });
    i += 1;
  }
  return out;
}

export function pageWindow(
  current: number,
  total: number,
): (number | '…')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  if (current <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (current >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
    pages.add(total - 3);
  }
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | '…')[] = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…');
    result.push(sorted[i]);
  }
  return result;
}
