export const TOAST_VARIANTS = [
  'basic',
  'soft',
  'solid',
  'outline',
  'dense',
  'action',
  'progress',
  'stacked',
  'compact',
  'complete',
] as const;

export type ToastVariant = (typeof TOAST_VARIANTS)[number];

export const TOAST_TONES = ['info', 'success', 'warning', 'danger', 'neutral'] as const;
export type ToastTone = (typeof TOAST_TONES)[number];

export const TOAST_OBSERVED_ATTRIBUTES = [
  'variant',
  'tone',
  'title',
  'description',
  'action',
  'dismissible',
  'duration',
  'open',
] as const;

export const TOAST_ICONS: Record<ToastTone, string> = {
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v5M12 15.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  neutral: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
};

export function resolveToastVariant(value: string | null): ToastVariant {
  if ((TOAST_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as ToastVariant;
  }
  return 'basic';
}

export function resolveToastTone(value: string | null): ToastTone {
  if ((TOAST_TONES as readonly string[]).includes(value ?? '')) {
    return value as ToastTone;
  }
  return 'info';
}
