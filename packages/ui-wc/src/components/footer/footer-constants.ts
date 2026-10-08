export const FOOTER_VARIANTS = [
  'basic',
  'soft',
  'dense',
  'outline',
  'columns',
  'legal',
  'compact',
  'wide',
  'brand',
  'complete',
] as const;

export type FooterVariant = (typeof FOOTER_VARIANTS)[number];

export const FOOTER_OBSERVED_ATTRIBUTES = [
  'variant',
  'brand',
  'tagline',
  'links',
  'legal',
] as const;

export function resolveFooterVariant(value: string | null): FooterVariant {
  if ((FOOTER_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as FooterVariant;
  }
  return 'basic';
}

export function parseFooterLinks(value: string | null): string[] {
  const raw = value?.trim();
  if (!raw) return ['Tramites', 'Normativa', 'Contacto', 'Privacidad'];
  return raw
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 8);
}
