export const DRAWER_VARIANTS = [
  'basic',
  'filters',
  'detail',
  'form',
  'danger',
  'dense',
  'left',
  'right',
  'wide',
  'complete',
] as const;

export type DrawerVariant = (typeof DRAWER_VARIANTS)[number];

export const DRAWER_SIDES = ['right', 'left'] as const;
export type DrawerSide = (typeof DRAWER_SIDES)[number];

export const DRAWER_SIZES = ['sm', 'md', 'lg'] as const;
export type DrawerSize = (typeof DRAWER_SIZES)[number];

export const DRAWER_OBSERVED_ATTRIBUTES = [
  'variant',
  'side',
  'size',
  'title',
  'description',
  'body',
  'confirm-label',
  'cancel-label',
  'open',
  'preview',
] as const;

export function resolveDrawerVariant(value: string | null): DrawerVariant {
  if ((DRAWER_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as DrawerVariant;
  }
  return 'basic';
}

export function resolveDrawerSide(
  value: string | null,
  variant: DrawerVariant,
): DrawerSide {
  if (value === 'left' || variant === 'left') return 'left';
  return 'right';
}

export function resolveDrawerSize(value: string | null): DrawerSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}
