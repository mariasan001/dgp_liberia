export const BREADCRUMB_VARIANTS = [
  'basic',
  'chevron',
  'icons',
  'collapsed',
  'underline',
  'dense',
  'complete',
  'dot',
  'arrow',
  'back',
] as const;

export type BreadcrumbVariant = (typeof BREADCRUMB_VARIANTS)[number];

export const BREADCRUMB_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type BreadcrumbTone = (typeof BREADCRUMB_TONES)[number];

export const BREADCRUMB_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

export function resolveBreadcrumbVariant(value: string | null): BreadcrumbVariant {
  if (
    value === 'chevron' ||
    value === 'icons' ||
    value === 'collapsed' ||
    value === 'underline' ||
    value === 'dense' ||
    value === 'complete' ||
    value === 'dot' ||
    value === 'arrow' ||
    value === 'back'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveBreadcrumbTone(value: string | null): BreadcrumbTone {
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
