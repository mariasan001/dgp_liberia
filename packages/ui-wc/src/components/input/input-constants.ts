export const INPUT_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'icon',
  'search',
  'password',
  'prefix',
  'suffix',
  'dense',
  'complete',
  'floating',
  'underline',
  'pill',
  'clearable',
  'code',
  'soft',
] as const;

export type InputVariant = (typeof INPUT_VARIANTS)[number];

export const INPUT_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type InputStatus = (typeof INPUT_STATUSES)[number];

export const INPUT_SIZES = ['sm', 'md', 'lg'] as const;
export type InputSize = (typeof INPUT_SIZES)[number];

export const INPUT_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'placeholder',
  'helper',
  'value',
  'type',
  'status',
  'size',
  'name',
  'disabled',
  'readonly',
  'required',
  'lead',
  'suffix',
] as const;

export function resolveInputVariant(value: string | null): InputVariant {
  if ((INPUT_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as InputVariant;
  }
  return 'basic';
}

export function resolveInputStatus(value: string | null): InputStatus {
  if ((INPUT_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as InputStatus;
  }
  return 'default';
}

export function resolveInputSize(value: string | null): InputSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}
