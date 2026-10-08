export const CHECKBOX_VARIANTS = [
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

export type CheckboxVariant = (typeof CHECKBOX_VARIANTS)[number];

export const CHECKBOX_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type CheckboxStatus = (typeof CHECKBOX_STATUSES)[number];

export const CHECKBOX_SIZES = ['sm', 'md', 'lg'] as const;
export type CheckboxSize = (typeof CHECKBOX_SIZES)[number];

export const CHECKBOX_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'description',
  'helper',
  'status',
  'size',
  'checked',
  'indeterminate',
  'disabled',
  'required',
  'name',
  'value',
  'aria-label',
  'aria-labelledby',
] as const;

export function resolveCheckboxVariant(value: string | null): CheckboxVariant {
  if ((CHECKBOX_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as CheckboxVariant;
  }
  return 'basic';
}

export function resolveCheckboxStatus(value: string | null): CheckboxStatus {
  if ((CHECKBOX_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as CheckboxStatus;
  }
  return 'default';
}

export function resolveCheckboxSize(value: string | null): CheckboxSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}
