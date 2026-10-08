export const SLIDER_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'soft',
  'marks',
  'range',
  'complete',
  'pill',
  'tooltip',
  'segmented',
  'vertical',
  'duo',
  'inset',
] as const;

export type SliderVariant = (typeof SLIDER_VARIANTS)[number];

export const SLIDER_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type SliderStatus = (typeof SLIDER_STATUSES)[number];

export const SLIDER_SIZES = ['sm', 'md', 'lg'] as const;
export type SliderSize = (typeof SLIDER_SIZES)[number];

export const SLIDER_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'helper',
  'status',
  'size',
  'min',
  'max',
  'step',
  'value',
  'unit',
  'name',
  'disabled',
  'readonly',
  'required',
] as const;

export function resolveSliderVariant(value: string | null): SliderVariant {
  if ((SLIDER_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as SliderVariant;
  }
  return 'basic';
}

export function resolveSliderStatus(value: string | null): SliderStatus {
  if ((SLIDER_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as SliderStatus;
  }
  return 'default';
}

export function resolveSliderSize(value: string | null): SliderSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}

export function toNumber(value: string | null | undefined, fallback: number): number {
  if (value === null || value === undefined || value === '') return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function snap(n: number, min: number, max: number, step: number): number {
  if (step <= 0) return clamp(n, min, max);
  const snapped = Math.round((n - min) / step) * step + min;
  const precision = String(step).includes('.')
    ? (String(step).split('.')[1]?.length ?? 0)
    : 0;
  const fixed = Number(snapped.toFixed(precision));
  return clamp(fixed, min, max);
}

export function parseSliderValue(
  value: string | null,
  isRange: boolean,
  min: number,
  max: number,
): { a: number; b: number } {
  if (!value?.trim()) {
    const mid = min + (max - min) / 2;
    return isRange ? { a: min, b: mid } : { a: mid, b: mid };
  }
  if (isRange) {
    const parts = value.split(/[,/]/).map((p) => p.trim());
    const a = toNumber(parts[0], min);
    const b = toNumber(parts[1], max);
    return a <= b ? { a, b } : { a: b, b: a };
  }
  const a = toNumber(value, min);
  return { a, b: a };
}

export function serializeSliderValue(a: number, b: number, isRange: boolean): string {
  if (isRange) return `${a},${b}`;
  return String(a);
}

export function percent(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  return ((value - min) / (max - min)) * 100;
}

export function formatValue(value: number, unit: string): string {
  const text = Number.isInteger(value) ? String(value) : String(value);
  return unit ? `${text}${unit}` : text;
}

export function buildMarks(min: number, max: number, step: number, count = 5): number[] {
  if (max <= min) return [min];
  const marks: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const raw = min + ((max - min) * i) / (count - 1);
    marks.push(snap(raw, min, max, step));
  }
  return [...new Set(marks)];
}
