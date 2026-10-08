export const RADIO_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'soft',
  'card',
  'pill',
  'tile',
  'complete',
] as const;

export type RadioVariant = (typeof RADIO_VARIANTS)[number];

export const RADIO_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type RadioStatus = (typeof RADIO_STATUSES)[number];

export const RADIO_SIZES = ['sm', 'md', 'lg'] as const;
export type RadioSize = (typeof RADIO_SIZES)[number];

export const RADIO_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'description',
  'helper',
  'status',
  'size',
  'checked',
  'disabled',
  'required',
  'name',
  'value',
  'aria-label',
  'aria-labelledby',
] as const;

export function resolveRadioVariant(value: string | null): RadioVariant {
  if ((RADIO_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as RadioVariant;
  }
  return 'basic';
}

export function resolveRadioStatus(value: string | null): RadioStatus {
  if ((RADIO_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as RadioStatus;
  }
  return 'default';
}

export function resolveRadioSize(value: string | null): RadioSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}
