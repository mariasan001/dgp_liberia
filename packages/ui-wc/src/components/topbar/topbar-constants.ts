export const TOPBAR_VARIANTS = [
  'basic',
  'search',
  'actions',
  'notifications',
  'breadcrumb',
  'dense',
  'complete',
] as const;

export type TopbarVariant = (typeof TOPBAR_VARIANTS)[number];

export const TOPBAR_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type TopbarTone = (typeof TOPBAR_TONES)[number];

export const TOPBAR_OBSERVED_ATTRIBUTES = ['variant', 'tone', 'sticky'] as const;

export function resolveTopbarVariant(value: string | null): TopbarVariant {
  if (
    value === 'search' ||
    value === 'actions' ||
    value === 'notifications' ||
    value === 'breadcrumb' ||
    value === 'dense' ||
    value === 'complete'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveTopbarTone(value: string | null): TopbarTone {
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
