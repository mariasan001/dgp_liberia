export const FORM_VARIANTS = [
  'basic',
  'single',
  'dual',
  'triple',
  'stacked',
  'dense',
  'soft',
  'card',
  'sections',
  'complete',
  'outline',
  'rail',
  'inset',
  'flat',
  'wide',
  'split',
  'panel',
  'toolbar',
  'bleed',
  'dashboard',
] as const;

export type FormVariant = (typeof FORM_VARIANTS)[number];

export const FORM_GAPS = ['sm', 'md', 'lg'] as const;
export type FormGap = (typeof FORM_GAPS)[number];

export const FORM_OBSERVED_ATTRIBUTES = [
  'variant',
  'title',
  'description',
  'gap',
  'columns',
] as const;

export function resolveFormVariant(value: string | null): FormVariant {
  if ((FORM_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as FormVariant;
  }
  return 'basic';
}

export function resolveFormGap(value: string | null): FormGap {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function resolveFormColumns(value: string | null, variant: FormVariant): 1 | 2 | 3 {
  if (value === '1' || value === '2' || value === '3') {
    return Number(value) as 1 | 2 | 3;
  }
  if (variant === 'dual' || variant === 'split' || variant === 'wide' || variant === 'dashboard') {
    return 2;
  }
  if (variant === 'triple' || variant === 'toolbar') return 3;
  return 1;
}
