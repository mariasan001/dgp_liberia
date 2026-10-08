export const GRID_VARIANTS = [
  'basic',
  'three',
  'four',
  'dense',
  'loose',
  'split',
  'auto',
] as const;

export type GridVariant = (typeof GRID_VARIANTS)[number];

export const GRID_GAPS = ['sm', 'md', 'lg'] as const;

export type GridGap = (typeof GRID_GAPS)[number];

export const GRID_OBSERVED_ATTRIBUTES = ['variant', 'gap'] as const;

export function resolveGridVariant(value: string | null): GridVariant {
  if (
    value === 'three' ||
    value === 'four' ||
    value === 'dense' ||
    value === 'loose' ||
    value === 'split' ||
    value === 'auto'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveGridGap(value: string | null): GridGap {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}
