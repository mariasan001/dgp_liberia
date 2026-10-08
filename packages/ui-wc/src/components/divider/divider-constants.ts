export const DIVIDER_VARIANTS = [
  'basic',
  'vertical',
  'dashed',
  'dotted',
  'thick',
  'label',
  'inset',
] as const;

export type DividerVariant = (typeof DIVIDER_VARIANTS)[number];

export const DIVIDER_TONES = ['primary', 'accent'] as const;

export type DividerTone = (typeof DIVIDER_TONES)[number];

export const DIVIDER_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

export function resolveDividerVariant(value: string | null): DividerVariant {
  if (
    value === 'vertical' ||
    value === 'dashed' ||
    value === 'dotted' ||
    value === 'thick' ||
    value === 'label' ||
    value === 'inset'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveDividerTone(value: string | null): DividerTone {
  if (value === 'accent') return 'accent';
  return 'primary';
}
