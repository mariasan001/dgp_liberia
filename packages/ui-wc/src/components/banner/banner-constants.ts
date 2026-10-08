export const BANNER_VARIANTS = [
  'basic',
  'soft',
  'solid',
  'outline',
  'dense',
  'promo',
  'sticky',
  'centered',
  'split',
  'complete',
] as const;

export type BannerVariant = (typeof BANNER_VARIANTS)[number];

export const BANNER_TONES = ['info', 'success', 'warning', 'danger', 'neutral', 'brand'] as const;
export type BannerTone = (typeof BANNER_TONES)[number];

export const BANNER_OBSERVED_ATTRIBUTES = [
  'variant',
  'tone',
  'title',
  'description',
  'action',
  'dismissible',
  'hidden',
] as const;

export function resolveBannerVariant(value: string | null): BannerVariant {
  if ((BANNER_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as BannerVariant;
  }
  return 'basic';
}

export function resolveBannerTone(value: string | null): BannerTone {
  if ((BANNER_TONES as readonly string[]).includes(value ?? '')) {
    return value as BannerTone;
  }
  return 'info';
}
