export const ICON_BUTTON_VARIANTS = [
  'basic',
  'solid',
  'soft',
  'outline',
  'ghost',
  'danger',
  'success',
  'tonal',
  'square',
  'complete',
] as const;

export type IconButtonVariant = (typeof ICON_BUTTON_VARIANTS)[number];

export const ICON_BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
export type IconButtonSize = (typeof ICON_BUTTON_SIZES)[number];

export const ICON_BUTTON_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'icon',
  'label',
  'disabled',
  'loading',
] as const;

export const ICON_BUTTON_ICONS: Record<string, string> = {
  plus: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="M16.2 16.2 20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5h11l-1.2-1.5V10a4.3 4.3 0 0 0-8.6 0v5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 8.5h13M9.5 8.5V6.8A1.3 1.3 0 0 1 10.8 5.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M8 8.5l.8 10a1.5 1.5 0 0 0 1.5 1.4h4.4a1.5 1.5 0 0 0 1.5-1.4l.8-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18" cy="12" r="1.3" fill="currentColor"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v10.5M12 15.5 8.5 12M12 15.5 15.5 12M5 18.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14l-5.5 6.2V18l-3 1.5v-6.8L5 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6.5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="6.5" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.3 11.1 15.2 7.4M8.3 12.9l6.9 3.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

export function resolveIconButtonIcon(name?: string | null): string {
  const key = (name || 'plus').trim().toLowerCase();
  return ICON_BUTTON_ICONS[key] || ICON_BUTTON_ICONS.plus;
}

export function resolveIconButtonVariant(value: string | null): IconButtonVariant {
  if ((ICON_BUTTON_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as IconButtonVariant;
  }
  return 'basic';
}

export function resolveIconButtonSize(value: string | null): IconButtonSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}
