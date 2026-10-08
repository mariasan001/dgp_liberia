export const CONTENT_SECTION_VARIANTS = [
  'basic',
  'soft',
  'split',
  'centered',
  'dense',
  'outline',
  'steps',
  'feature',
  'brand',
  'complete',
] as const;

export type ContentSectionVariant = (typeof CONTENT_SECTION_VARIANTS)[number];

export const CONTENT_SECTION_OBSERVED_ATTRIBUTES = [
  'variant',
  'eyebrow',
  'title',
  'description',
  'body',
  'action-label',
] as const;

export function resolveContentSectionVariant(
  value: string | null,
): ContentSectionVariant {
  if ((CONTENT_SECTION_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as ContentSectionVariant;
  }
  return 'basic';
}
