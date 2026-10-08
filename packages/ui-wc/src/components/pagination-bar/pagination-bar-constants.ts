export const PAGINATION_BAR_VARIANTS = [
  'basic',
  'summary',
  'dense',
  'soft',
  'bordered',
  'compact',
  'detailed',
  'toolbar',
  'split',
  'complete',
] as const;

export type PaginationBarVariant = (typeof PAGINATION_BAR_VARIANTS)[number];

export const PAGINATION_BAR_SIZES = ['sm', 'md', 'lg'] as const;
export type PaginationBarSize = (typeof PAGINATION_BAR_SIZES)[number];

export const PAGINATION_BAR_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'page',
  'total',
  'page-size',
  'summary',
  'disabled',
] as const;

export function resolvePaginationBarVariant(
  value: string | null,
): PaginationBarVariant {
  if ((PAGINATION_BAR_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as PaginationBarVariant;
  }
  return 'basic';
}

export function resolvePaginationBarSize(value: string | null): PaginationBarSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function toPositiveInt(value: string | null, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.floor(n);
}

export const PAGINATION_BAR_ICONS = {
  prev: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  next: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 6.5 15 12l-5.5 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
