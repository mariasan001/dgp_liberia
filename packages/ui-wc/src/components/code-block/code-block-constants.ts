export const CODE_BLOCK_VARIANTS = [
  'basic',
  'soft',
  'dense',
  'outline',
  'terminal',
  'numbered',
  'compact',
  'wide',
  'brand',
  'complete',
] as const;

export type CodeBlockVariant = (typeof CODE_BLOCK_VARIANTS)[number];

export const CODE_BLOCK_OBSERVED_ATTRIBUTES = [
  'variant',
  'language',
  'filename',
  'code',
] as const;

export function resolveCodeBlockVariant(
  value: string | null,
): CodeBlockVariant {
  if ((CODE_BLOCK_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as CodeBlockVariant;
  }
  return 'basic';
}
