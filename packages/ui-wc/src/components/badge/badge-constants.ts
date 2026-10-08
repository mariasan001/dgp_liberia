export const BADGE_VARIANTS = [
  'basic',
  'soft',
  'solid',
  'outline',
  'dot',
  'count',
  'pill',
  'square',
  'status',
  'complete',
] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export const BADGE_TONES = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'neutral',
] as const;
export type BadgeTone = (typeof BADGE_TONES)[number];

export const BADGE_SIZES = ['sm', 'md', 'lg'] as const;
export type BadgeSize = (typeof BADGE_SIZES)[number];

export const BADGE_OBSERVED_ATTRIBUTES = [
  'variant',
  'tone',
  'size',
  'label',
  'count',
  'max',
] as const;

export function resolveBadgeVariant(value: string | null): BadgeVariant {
  if ((BADGE_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as BadgeVariant;
  }
  return 'basic';
}

export function resolveBadgeTone(value: string | null): BadgeTone {
  if ((BADGE_TONES as readonly string[]).includes(value ?? '')) {
    return value as BadgeTone;
  }
  return 'primary';
}

export function resolveBadgeSize(value: string | null): BadgeSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function formatBadgeCount(count: string | null, max: string | null): string {
  const n = Number(count ?? '');
  if (!Number.isFinite(n)) return count?.trim() || '';
  const cap = Number(max ?? '99');
  const limit = Number.isFinite(cap) && cap > 0 ? cap : 99;
  if (n > limit) return `${limit}+`;
  return String(Math.max(0, Math.floor(n)));
}
