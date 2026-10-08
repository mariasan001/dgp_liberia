export const TOC_VARIANTS = [
  'basic',
  'soft',
  'dense',
  'outline',
  'numbered',
  'sticky',
  'minimal',
  'rail',
  'brand',
  'complete',
] as const;

export type TableOfContentsVariant = (typeof TOC_VARIANTS)[number];

export const TOC_OBSERVED_ATTRIBUTES = [
  'variant',
  'title',
  'items',
  'active',
] as const;

export function resolveTocVariant(
  value: string | null,
): TableOfContentsVariant {
  if ((TOC_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as TableOfContentsVariant;
  }
  return 'basic';
}

export function parseTocItems(value: string | null): string[] {
  const raw = value?.trim();
  if (!raw) {
    return [
      'Introduccion',
      'Requisitos',
      'Proceso',
      'Resultados',
      'Contacto',
    ];
  }
  return raw
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 12);
}
