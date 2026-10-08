export const TIMEPICKER_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'soft',
  'floating',
  'underline',
  'pill',
  'clearable',
  'complete',
] as const;

export type TimepickerVariant = (typeof TIMEPICKER_VARIANTS)[number];

export const TIMEPICKER_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type TimepickerStatus = (typeof TIMEPICKER_STATUSES)[number];

export const TIMEPICKER_SIZES = ['sm', 'md', 'lg'] as const;
export type TimepickerSize = (typeof TIMEPICKER_SIZES)[number];

export const TIMEPICKER_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'placeholder',
  'helper',
  'value',
  'status',
  'size',
  'step',
  'min',
  'max',
  'name',
  'disabled',
  'readonly',
  'required',
] as const;

export function resolveTimepickerVariant(value: string | null): TimepickerVariant {
  if ((TIMEPICKER_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as TimepickerVariant;
  }
  return 'basic';
}

export function resolveTimepickerStatus(value: string | null): TimepickerStatus {
  if ((TIMEPICKER_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as TimepickerStatus;
  }
  return 'default';
}

export function resolveTimepickerSize(value: string | null): TimepickerSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}

export function resolveStep(value: string | null): number {
  const n = Number(value);
  if ([1, 5, 10, 15, 30].includes(n)) return n;
  return 5;
}

/** Parse HH:mm → minutes from midnight. */
export function parseTime(value: string | null | undefined): number | null {
  if (!value) return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

export function formatTime(totalMinutes: number | null): string {
  if (totalMinutes === null || Number.isNaN(totalMinutes)) return '';
  const normalized = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function minutesList(step: number): number[] {
  const out: number[] = [];
  for (let m = 0; m < 60; m += step) out.push(m);
  return out;
}

export function hoursList(): number[] {
  return Array.from({ length: 24 }, (_, i) => i);
}
