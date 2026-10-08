export const DATEPICKER_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'soft',
  'floating',
  'underline',
  'pill',
  'clearable',
  'range',
  'complete',
] as const;

export type DatepickerVariant = (typeof DATEPICKER_VARIANTS)[number];

export const DATEPICKER_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type DatepickerStatus = (typeof DATEPICKER_STATUSES)[number];

export const DATEPICKER_SIZES = ['sm', 'md', 'lg'] as const;
export type DatepickerSize = (typeof DATEPICKER_SIZES)[number];

export const DATEPICKER_MODES = ['single', 'range'] as const;
export type DatepickerMode = (typeof DATEPICKER_MODES)[number];

export const DATEPICKER_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'placeholder',
  'helper',
  'value',
  'status',
  'size',
  'mode',
  'min',
  'max',
  'name',
  'disabled',
  'readonly',
  'required',
] as const;

export const MONTHS_ES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const;

export const WEEKDAYS_ES = ['L', 'M', 'M', 'J', 'V', 'S', 'D'] as const;

export function resolveDatepickerVariant(value: string | null): DatepickerVariant {
  if ((DATEPICKER_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as DatepickerVariant;
  }
  return 'basic';
}

export function resolveDatepickerStatus(value: string | null): DatepickerStatus {
  if ((DATEPICKER_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as DatepickerStatus;
  }
  return 'default';
}

export function resolveDatepickerSize(value: string | null): DatepickerSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}

export function resolveDatepickerMode(
  value: string | null,
  variant: DatepickerVariant,
): DatepickerMode {
  if (value === 'range' || variant === 'range') return 'range';
  return 'single';
}

/** Parse YYYY-MM-DD as local date (no UTC shift). */
export function parseISODate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const date = new Date(y, mo, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo || date.getDate() !== d) {
    return null;
  }
  return date;
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function sameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function formatDisplay(date: Date | null): string {
  if (!date) return '';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function parseValueAttr(
  value: string | null,
  mode: DatepickerMode,
): { start: Date | null; end: Date | null } {
  if (!value?.trim()) return { start: null, end: null };
  if (mode === 'range') {
    const [a, b] = value.split('/').map((part) => part.trim());
    return { start: parseISODate(a), end: parseISODate(b) };
  }
  return { start: parseISODate(value), end: null };
}

export function serializeValue(
  start: Date | null,
  end: Date | null,
  mode: DatepickerMode,
): string {
  if (!start) return '';
  if (mode === 'range') {
    if (!end) return toISODate(start);
    return `${toISODate(start)}/${toISODate(end)}`;
  }
  return toISODate(start);
}
