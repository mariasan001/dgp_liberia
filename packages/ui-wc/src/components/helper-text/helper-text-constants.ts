export const HELPER_TEXT_VARIANTS = [
  'basic',
  'hint',
  'error',
  'success',
  'warning',
  'info',
  'dense',
  'icon',
  'counter',
  'complete',
] as const;

export type HelperTextVariant = (typeof HELPER_TEXT_VARIANTS)[number];

export const HELPER_TEXT_TONES = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
] as const;
export type HelperTextTone = (typeof HELPER_TEXT_TONES)[number];

export const HELPER_TEXT_OBSERVED_ATTRIBUTES = [
  'variant',
  'tone',
  'label',
  'count',
  'max',
] as const;

export const HELPER_ICONS: Record<string, string> = {
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v5M12 15.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  hint: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M9.8 9.6a2.4 2.4 0 0 1 4.4 1.2c0 1.4-1.4 1.8-2.2 2.4V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16.5" r="0.9" fill="currentColor"/></svg>`,
};

export function resolveHelperTextVariant(value: string | null): HelperTextVariant {
  if ((HELPER_TEXT_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as HelperTextVariant;
  }
  return 'basic';
}

export function resolveHelperTextTone(value: string | null): HelperTextTone {
  if ((HELPER_TEXT_TONES as readonly string[]).includes(value ?? '')) {
    return value as HelperTextTone;
  }
  return 'neutral';
}
