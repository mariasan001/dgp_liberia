export const ALERT_VARIANTS = [
  'basic',
  'soft',
  'outline',
  'solid',
  'banner',
  'dense',
  'inline',
  'bordered',
  'dismissible',
  'complete',
] as const;

export type AlertVariant = (typeof ALERT_VARIANTS)[number];

export const ALERT_TONES = ['info', 'success', 'warning', 'danger', 'neutral'] as const;
export type AlertTone = (typeof ALERT_TONES)[number];

export const ALERT_OBSERVED_ATTRIBUTES = [
  'variant',
  'tone',
  'title',
  'description',
  'action',
  'dismissible',
  'hidden',
] as const;

export const ALERT_ICONS: Record<AlertTone, string> = {
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v5M12 15.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  neutral: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
};

export function resolveAlertVariant(value: string | null): AlertVariant {
  if ((ALERT_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as AlertVariant;
  }
  return 'basic';
}

export function resolveAlertTone(value: string | null): AlertTone {
  if ((ALERT_TONES as readonly string[]).includes(value ?? '')) {
    return value as AlertTone;
  }
  return 'info';
}
