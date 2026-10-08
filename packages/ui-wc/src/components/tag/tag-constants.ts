export const TAG_VARIANTS = [
  'basic',
  'soft',
  'outline',
  'solid',
  'filter',
  'removable',
  'dense',
  'icon',
  'brand',
  'complete',
] as const;

export type TagVariant = (typeof TAG_VARIANTS)[number];

export const TAG_TONES = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'neutral',
] as const;
export type TagTone = (typeof TAG_TONES)[number];

export const TAG_SIZES = ['sm', 'md', 'lg'] as const;
export type TagSize = (typeof TAG_SIZES)[number];

export const TAG_OBSERVED_ATTRIBUTES = [
  'variant',
  'tone',
  'size',
  'label',
  'icon',
  'removable',
  'disabled',
] as const;

export const TAG_ICONS: Record<string, string> = {
  filter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14l-5.5 6.2V18l-3 1.5v-6.8L5 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 10.5 7 16l5.5-2 5.5 2-2-5.5L18 8.5 14.5 7 12 3.5 9.5 7 6 8.5 9 10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 12.5V6.8A2.3 2.3 0 0 1 6.8 4.5h5.7L19.5 11.5l-7 7-8-6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="8.2" cy="8.2" r="1.1" fill="currentColor"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

export const TAG_CLOSE = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

export function resolveTagIcon(name?: string | null): string | null {
  if (!name) return null;
  return TAG_ICONS[name.trim().toLowerCase()] || null;
}

export function resolveTagVariant(value: string | null): TagVariant {
  if ((TAG_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as TagVariant;
  }
  return 'basic';
}

export function resolveTagTone(value: string | null): TagTone {
  if ((TAG_TONES as readonly string[]).includes(value ?? '')) {
    return value as TagTone;
  }
  return 'primary';
}

export function resolveTagSize(value: string | null): TagSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}
