export const KPI_VARIANTS = [
  'basic',
  'trend-up',
  'trend-down',
  'period',
  'icon',
  'dense',
  'complete',
  'stripe',
  'filled',
  'horizontal',
  'compare',
  'progress',
  'elevated',
  'sparkline',
  'ring',
  'split',
  'live',
] as const;

export type KpiVariant = (typeof KPI_VARIANTS)[number];

export const KPI_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type KpiTone = (typeof KPI_TONES)[number];

export const KPI_OBSERVED_ATTRIBUTES = ['variant', 'tone', 'progress'] as const;

export function resolveKpiVariant(value: string | null): KpiVariant {
  if (
    value === 'trend-up' ||
    value === 'trend-down' ||
    value === 'period' ||
    value === 'icon' ||
    value === 'dense' ||
    value === 'complete' ||
    value === 'stripe' ||
    value === 'filled' ||
    value === 'horizontal' ||
    value === 'compare' ||
    value === 'progress' ||
    value === 'elevated' ||
    value === 'sparkline' ||
    value === 'ring' ||
    value === 'split' ||
    value === 'live'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveKpiTone(value: string | null): KpiTone {
  if (
    value === 'accent' ||
    value === 'dark' ||
    value === 'neutral' ||
    value === 'soft'
  ) {
    return value;
  }
  return 'primary';
}

export function resolveKpiProgress(value: string | null): number {
  if (value == null || value === '') return 64;
  const n = Number(value);
  if (!Number.isFinite(n)) return 64;
  return Math.max(0, Math.min(100, n));
}
