export const TEXTAREA_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'counter',
  'auto',
  'dense',
  'filled',
  'soft',
  'floating',
  'resize',
  'code',
  'complete',
] as const;

export type TextareaVariant = (typeof TEXTAREA_VARIANTS)[number];

export const TEXTAREA_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type TextareaStatus = (typeof TEXTAREA_STATUSES)[number];

export const TEXTAREA_SIZES = ['sm', 'md', 'lg'] as const;
export type TextareaSize = (typeof TEXTAREA_SIZES)[number];

export const TEXTAREA_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'placeholder',
  'helper',
  'value',
  'status',
  'size',
  'name',
  'rows',
  'maxlength',
  'disabled',
  'readonly',
  'required',
] as const;

export function resolveTextareaVariant(value: string | null): TextareaVariant {
  if ((TEXTAREA_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as TextareaVariant;
  }
  return 'basic';
}

export function resolveTextareaStatus(value: string | null): TextareaStatus {
  if ((TEXTAREA_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as TextareaStatus;
  }
  return 'default';
}

export function resolveTextareaSize(value: string | null): TextareaSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}
