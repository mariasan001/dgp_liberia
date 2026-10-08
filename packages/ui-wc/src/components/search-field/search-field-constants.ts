export const SEARCH_FIELD_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'soft',
  'floating',
  'underline',
  'pill',
  'clearable',
  'shortcut',
  'loading',
  'complete',
] as const;

export type SearchFieldVariant = (typeof SEARCH_FIELD_VARIANTS)[number];

export const SEARCH_FIELD_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type SearchFieldStatus = (typeof SEARCH_FIELD_STATUSES)[number];

export const SEARCH_FIELD_SIZES = ['sm', 'md', 'lg'] as const;
export type SearchFieldSize = (typeof SEARCH_FIELD_SIZES)[number];

export const SEARCH_FIELD_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'placeholder',
  'helper',
  'value',
  'status',
  'size',
  'shortcut',
  'name',
  'disabled',
  'readonly',
  'required',
  'loading',
] as const;

export function resolveSearchFieldVariant(value: string | null): SearchFieldVariant {
  if ((SEARCH_FIELD_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as SearchFieldVariant;
  }
  return 'basic';
}

export function resolveSearchFieldStatus(value: string | null): SearchFieldStatus {
  if ((SEARCH_FIELD_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as SearchFieldStatus;
  }
  return 'default';
}

export function resolveSearchFieldSize(value: string | null): SearchFieldSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}
