export const LINK_VARIANTS = [
  'basic',
  'inline',
  'subtle',
  'underline',
  'strong',
  'soft',
  'external',
  'nav',
  'muted',
  'complete',
] as const;

export type LinkVariant = (typeof LINK_VARIANTS)[number];

export const LINK_TONES = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;
export type LinkTone = (typeof LINK_TONES)[number];

export const LINK_SIZES = ['sm', 'md', 'lg'] as const;
export type LinkSize = (typeof LINK_SIZES)[number];

export const LINK_OBSERVED_ATTRIBUTES = [
  'variant',
  'tone',
  'size',
  'href',
  'label',
  'external',
  'disabled',
] as const;

export const LINK_ICONS = {
  arrow: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h12.5M13.5 7.5 18 12l-4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5.5h4.5V10M18.5 5.5 11 13M9.5 6.5H7.5A2 2 0 0 0 5.5 8.5v8A2 2 0 0 0 7.5 18.5h8a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

export function resolveLinkVariant(value: string | null): LinkVariant {
  if ((LINK_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as LinkVariant;
  }
  return 'basic';
}

export function resolveLinkTone(value: string | null): LinkTone {
  if ((LINK_TONES as readonly string[]).includes(value ?? '')) {
    return value as LinkTone;
  }
  return 'primary';
}

export function resolveLinkSize(value: string | null): LinkSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}
