export const SWITCH_VARIANTS = [
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

export type SwitchVariant = (typeof SWITCH_VARIANTS)[number];

export const SWITCH_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type SwitchStatus = (typeof SWITCH_STATUSES)[number];

export const SWITCH_SIZES = ['sm', 'md', 'lg'] as const;
export type SwitchSize = (typeof SWITCH_SIZES)[number];

export const SWITCH_OBSERVED_ATTRIBUTES = [
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

export function resolveSwitchVariant(value: string | null): SwitchVariant {
  if ((SWITCH_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as SwitchVariant;
  }
  return 'basic';
}

export function resolveSwitchStatus(value: string | null): SwitchStatus {
  if ((SWITCH_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as SwitchStatus;
  }
  return 'default';
}

export function resolveSwitchSize(value: string | null): SwitchSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}
