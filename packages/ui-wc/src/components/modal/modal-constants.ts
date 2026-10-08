export const MODAL_VARIANTS = [
  'basic',
  'confirm',
  'form',
  'danger',
  'success',
  'dense',
  'center',
  'sheet',
  'wide',
  'complete',
] as const;

export type ModalVariant = (typeof MODAL_VARIANTS)[number];

export const MODAL_SIZES = ['sm', 'md', 'lg'] as const;
export type ModalSize = (typeof MODAL_SIZES)[number];

export const MODAL_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'title',
  'description',
  'body',
  'confirm-label',
  'cancel-label',
  'open',
  'preview',
] as const;

export const MODAL_ICONS: Record<string, string> = {
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  confirm: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  form: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 5.5h10A1.5 1.5 0 0 1 18.5 7v10a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 17V7A1.5 1.5 0 0 1 7 5.5Z" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 9.5h7M8.5 12.5h7M8.5 15.5h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  brand: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7.5h10v9H7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.5 10.5h5M9.5 13.5h3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

export function resolveModalVariant(value: string | null): ModalVariant {
  if ((MODAL_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as ModalVariant;
  }
  return 'basic';
}

export function resolveModalSize(value: string | null): ModalSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function resolveModalIcon(variant: ModalVariant): string | null {
  if (variant === 'danger') return MODAL_ICONS.danger;
  if (variant === 'success') return MODAL_ICONS.success;
  if (variant === 'confirm') return MODAL_ICONS.confirm;
  if (variant === 'form') return MODAL_ICONS.form;
  if (variant === 'complete') return MODAL_ICONS.brand;
  if (variant === 'sheet') return MODAL_ICONS.info;
  if (
    variant === 'basic' ||
    variant === 'center' ||
    variant === 'wide' ||
    variant === 'dense'
  ) {
    return MODAL_ICONS.info;
  }
  return null;
}
