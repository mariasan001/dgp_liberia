export const PAGE_HEADER_VARIANTS = [
  'basic',
  'description',
  'breadcrumb',
  'actions',
  'status',
  'dense',
  'complete',
] as const;

export type PageHeaderVariant = (typeof PAGE_HEADER_VARIANTS)[number];

export const PAGE_HEADER_SURFACES = ['plain', 'panel'] as const;

export type PageHeaderSurface = (typeof PAGE_HEADER_SURFACES)[number];

export const PAGE_HEADER_OBSERVED_ATTRIBUTES = ['variant', 'surface'] as const;

export function resolvePageHeaderVariant(value: string | null): PageHeaderVariant {
  if (
    value === 'description' ||
    value === 'breadcrumb' ||
    value === 'actions' ||
    value === 'status' ||
    value === 'dense' ||
    value === 'complete'
  ) {
    return value;
  }
  return 'basic';
}

export function resolvePageHeaderSurface(value: string | null): PageHeaderSurface {
  if (value === 'panel') return 'panel';
  return 'plain';
}
