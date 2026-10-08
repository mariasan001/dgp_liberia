export const CHART_CARD_VARIANTS = [
  'basic',
  'legend',
  'actions',
  'period',
  'side-legend',
  'dense',
  'elevated',
  'footer',
  'stripe',
  'framed',
  'toolbar',
  'minimal',
  'compare',
  'funnel',
  'treemap',
  'rose',
  'waterfall',
] as const;

export type ChartCardVariant = (typeof CHART_CARD_VARIANTS)[number];

export const CHART_CARD_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type ChartCardTone = (typeof CHART_CARD_TONES)[number];

export const CHART_CARD_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

const VARIANT_SET = new Set<string>(CHART_CARD_VARIANTS);

export function resolveChartCardVariant(
  value: string | null,
): ChartCardVariant {
  if (value && VARIANT_SET.has(value)) {
    return value as ChartCardVariant;
  }
  return 'basic';
}

export function resolveChartCardTone(value: string | null): ChartCardTone {
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
