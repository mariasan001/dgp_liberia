export const PROGRESS_VARIANTS = [
  'bar',
  'labeled',
  'thin',
  'thick',
  'ring',
  'steps',
  'segmented',
  'indeterminate',
  'stacked',
  'complete',
] as const;

export type ProgressVariant = (typeof PROGRESS_VARIANTS)[number];

export const PROGRESS_STATUSES = [
  'default',
  'info',
  'warning',
  'success',
  'danger',
] as const;

export type ProgressStatus = (typeof PROGRESS_STATUSES)[number];

export const PROGRESS_OBSERVED_ATTRIBUTES = [
  'variant',
  'value',
  'max',
  'label',
  'status',
  'steps',
] as const;

export function resolveProgressVariant(value: string | null): ProgressVariant {
  if (
    value === 'labeled' ||
    value === 'thin' ||
    value === 'thick' ||
    value === 'ring' ||
    value === 'steps' ||
    value === 'segmented' ||
    value === 'indeterminate' ||
    value === 'stacked' ||
    value === 'complete' ||
    value === 'bar'
  ) {
    return value;
  }
  return 'bar';
}

export function resolveProgressStatus(value: string | null): ProgressStatus {
  if (
    value === 'info' ||
    value === 'warning' ||
    value === 'success' ||
    value === 'danger' ||
    value === 'default'
  ) {
    return value;
  }
  return 'default';
}

export function resolveProgressNumber(
  value: string | null,
  fallback: number,
  min = 0,
  max = 100,
): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
