export const CARD_VARIANTS = [
  'basic',
  'soft',
  'outline',
  'elevated',
  'media',
  'action',
  'dense',
  'stat',
  'horizontal',
  'complete',
] as const;

export type CardVariant = (typeof CARD_VARIANTS)[number];

export const CARD_OBSERVED_ATTRIBUTES = [
  'variant',
  'title',
  'description',
  'body',
  'action-label',
  'meta',
] as const;

export function resolveCardVariant(value: string | null): CardVariant {
  if ((CARD_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as CardVariant;
  }
  return 'basic';
}
