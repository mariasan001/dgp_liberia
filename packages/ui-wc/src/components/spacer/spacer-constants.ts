export const SPACER_VARIANTS = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'horizontal',
  'section',
] as const;

export type SpacerVariant = (typeof SPACER_VARIANTS)[number];

export const SPACER_OBSERVED_ATTRIBUTES = ['variant'] as const;

export function resolveSpacerVariant(value: string | null): SpacerVariant {
  if (
    value === 'xs' ||
    value === 'sm' ||
    value === 'lg' ||
    value === 'xl' ||
    value === 'horizontal' ||
    value === 'section'
  ) {
    return value;
  }
  return 'md';
}
