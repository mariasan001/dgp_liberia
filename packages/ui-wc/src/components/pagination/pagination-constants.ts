export type PaginationVariant =
  | 'basic'
  | 'arrows'
  | 'ellipsis'
  | 'edges'
  | 'compact'
  | 'icons'
  | 'outline'
  | 'pills'
  | 'text'
  | 'jump'
  | 'simple'
  | 'group'
  | 'summary';

export type PaginationLang = 'es' | 'en';
export type PaginationTone = 'primary' | 'accent' | 'dark' | 'neutral' | 'soft';
export type PaginationSize = 'sm' | 'md' | 'lg';

export const PAGINATION_VARIANTS: PaginationVariant[] = [
  'basic',
  'arrows',
  'ellipsis',
  'edges',
  'compact',
  'icons',
  'outline',
  'pills',
  'text',
  'jump',
  'simple',
  'group',
  'summary',
];

export const PAGINATION_OBSERVED_ATTRIBUTES = [
  'page',
  'total',
  'variant',
  'tone',
  'size',
  'lang',
  'disabled',
  'sibling-count',
  'boundary-count',
  'page-size',
  'aria-label',
] as const;

export function resolveVariant(value: string | null): PaginationVariant {
  if ((PAGINATION_VARIANTS as string[]).includes(value || '')) {
    return value as PaginationVariant;
  }
  return 'arrows';
}

export function resolveTone(value: string | null): PaginationTone {
  if (
    value === 'accent' ||
    value === 'dark' ||
    value === 'neutral' ||
    value === 'soft' ||
    value === 'primary'
  ) {
    return value;
  }
  return 'primary';
}

export function resolveSize(value: string | null): PaginationSize {
  if (value === 'sm' || value === 'lg' || value === 'md') {
    return value;
  }
  return 'md';
}

export function resolveLang(value: string | null): PaginationLang {
  return value === 'en' ? 'en' : 'es';
}

export function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value || '', 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
}

export type PageItem = number | 'ellipsis';

/** Build visible page items with optional ellipsis truncation. */
export function buildPageItems(
  page: number,
  total: number,
  siblingCount: number,
  boundaryCount: number,
  useEllipsis: boolean,
): PageItem[] {
  if (total <= 1) {
    return [1];
  }

  if (!useEllipsis || total <= siblingCount * 2 + boundaryCount * 2 + 3) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: PageItem[] = [];
  const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
  const endPages = Array.from({ length: boundaryCount }, (_, i) => total - boundaryCount + 1 + i);
  const siblingsStart = Math.max(page - siblingCount, boundaryCount + 1);
  const siblingsEnd = Math.min(page + siblingCount, total - boundaryCount);

  items.push(...startPages);

  if (siblingsStart > boundaryCount + 1) {
    items.push('ellipsis');
  } else {
    for (let i = boundaryCount + 1; i < siblingsStart; i += 1) {
      items.push(i);
    }
  }

  for (let i = siblingsStart; i <= siblingsEnd; i += 1) {
    items.push(i);
  }

  if (siblingsEnd < total - boundaryCount) {
    items.push('ellipsis');
  } else {
    for (let i = siblingsEnd + 1; i <= total - boundaryCount; i += 1) {
      items.push(i);
    }
  }

  items.push(...endPages);
  return items;
}

export const LABELS = {
  es: {
    previous: 'Anterior',
    next: 'Siguiente',
    first: 'Primera',
    last: 'Ultima',
    pageOf: (page: number, total: number) => `Pagina ${page} de ${total}`,
    summary: (page: number, total: number, pageSize: number) => {
      const from = (page - 1) * pageSize + 1;
      const to = Math.min(page * pageSize, total * pageSize);
      const items = total * pageSize;
      return `Mostrando ${from}-${to} de ${items}`;
    },
    of: 'de',
    goTo: 'Ir a pagina',
    nav: 'Paginacion',
  },
  en: {
    previous: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    pageOf: (page: number, total: number) => `Page ${page} of ${total}`,
    summary: (page: number, total: number, pageSize: number) => {
      const from = (page - 1) * pageSize + 1;
      const to = Math.min(page * pageSize, total * pageSize);
      const items = total * pageSize;
      return `Showing ${from}-${to} of ${items}`;
    },
    of: 'of',
    goTo: 'Go to page',
    nav: 'Pagination',
  },
} as const;
