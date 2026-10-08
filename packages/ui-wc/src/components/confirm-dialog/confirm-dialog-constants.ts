export const CONFIRM_DIALOG_VARIANTS = [
  'basic',
  'danger',
  'warning',
  'success',
  'info',
  'dense',
  'soft',
  'outline',
  'brand',
  'complete',
] as const;

export type ConfirmDialogVariant = (typeof CONFIRM_DIALOG_VARIANTS)[number];

export const CONFIRM_DIALOG_OBSERVED_ATTRIBUTES = [
  'variant',
  'title',
  'description',
  'body',
  'confirm-label',
  'cancel-label',
  'open',
  'preview',
] as const;

export const CONFIRM_ICONS: Record<string, string> = {
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  brand: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
};

export function resolveConfirmDialogVariant(
  value: string | null,
): ConfirmDialogVariant {
  if ((CONFIRM_DIALOG_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as ConfirmDialogVariant;
  }
  return 'basic';
}

export function resolveConfirmIcon(variant: ConfirmDialogVariant): string {
  if (variant === 'danger') return CONFIRM_ICONS.danger;
  if (variant === 'warning') return CONFIRM_ICONS.warning;
  if (variant === 'success') return CONFIRM_ICONS.success;
  if (variant === 'complete' || variant === 'brand') return CONFIRM_ICONS.brand;
  return CONFIRM_ICONS.info;
}
