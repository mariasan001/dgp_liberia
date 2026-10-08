export const FORM_FIELD_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'soft',
  'horizontal',
  'stacked',
  'inline',
  'complete',
] as const;

export type FormFieldVariant = (typeof FORM_FIELD_VARIANTS)[number];

export const FORM_FIELD_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type FormFieldStatus = (typeof FORM_FIELD_STATUSES)[number];

export const FORM_FIELD_SIZES = ['sm', 'md', 'lg'] as const;
export type FormFieldSize = (typeof FORM_FIELD_SIZES)[number];

export const FORM_FIELD_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'helper',
  'hint',
  'status',
  'size',
  'required',
  'disabled',
] as const;

export function resolveFormFieldVariant(value: string | null): FormFieldVariant {
  if ((FORM_FIELD_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as FormFieldVariant;
  }
  return 'basic';
}

export function resolveFormFieldStatus(value: string | null): FormFieldStatus {
  if ((FORM_FIELD_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as FormFieldStatus;
  }
  return 'default';
}

export function resolveFormFieldSize(value: string | null): FormFieldSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}

export function statusPill(status: FormFieldStatus): string {
  if (status === 'error') return 'Error';
  if (status === 'success') return 'Exito';
  if (status === 'warning') return 'Aviso';
  if (status === 'info') return 'Info';
  return '';
}
