export const SKELETON_VARIANTS = [
  'text',
  'avatar',
  'card',
  'table',
  'list',
  'media',
  'kpi',
  'form',
  'dense',
  'complete',
] as const;

export type SkeletonVariant = (typeof SKELETON_VARIANTS)[number];

export const SKELETON_OBSERVED_ATTRIBUTES = [
  'variant',
  'rows',
  'animated',
] as const;

export function resolveSkeletonVariant(value: string | null): SkeletonVariant {
  if (
    value === 'avatar' ||
    value === 'card' ||
    value === 'table' ||
    value === 'list' ||
    value === 'media' ||
    value === 'kpi' ||
    value === 'form' ||
    value === 'dense' ||
    value === 'complete' ||
    value === 'text'
  ) {
    return value;
  }
  return 'text';
}

export function resolveSkeletonRows(value: string | null, fallback = 3): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(Math.floor(n), 12);
}

export function resolveSkeletonAnimated(value: string | null): boolean {
  if (value === null) return true;
  return value !== 'false' && value !== '0';
}
