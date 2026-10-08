export const HERO_BLOCK_VARIANTS = [
  'basic',
  'soft',
  'split',
  'centered',
  'dense',
  'outline',
  'compact',
  'feature',
  'brand',
  'complete',
] as const;

export type HeroBlockVariant = (typeof HERO_BLOCK_VARIANTS)[number];

export const HERO_BLOCK_OBSERVED_ATTRIBUTES = [
  'variant',
  'eyebrow',
  'title',
  'description',
  'primary-label',
  'secondary-label',
] as const;

export function resolveHeroBlockVariant(
  value: string | null,
): HeroBlockVariant {
  if ((HERO_BLOCK_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as HeroBlockVariant;
  }
  return 'basic';
}
