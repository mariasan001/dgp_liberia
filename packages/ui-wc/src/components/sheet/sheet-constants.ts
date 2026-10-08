export const SHEET_VARIANTS = [
  'basic',
  'actions',
  'form',
  'danger',
  'success',
  'dense',
  'peek',
  'tall',
  'brand',
  'complete',
] as const;

export type SheetVariant = (typeof SHEET_VARIANTS)[number];

export const SHEET_OBSERVED_ATTRIBUTES = [
  'variant',
  'title',
  'description',
  'body',
  'confirm-label',
  'cancel-label',
  'open',
  'preview',
] as const;

export function resolveSheetVariant(value: string | null): SheetVariant {
  if ((SHEET_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as SheetVariant;
  }
  return 'basic';
}
