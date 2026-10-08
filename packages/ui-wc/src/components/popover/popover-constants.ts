export const POPOVER_VARIANTS = [
  'basic',
  'soft',
  'solid',
  'outline',
  'dense',
  'menu',
  'rich',
  'brand',
  'success',
  'complete',
] as const;

export type PopoverVariant = (typeof POPOVER_VARIANTS)[number];

export const POPOVER_PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;
export type PopoverPlacement = (typeof POPOVER_PLACEMENTS)[number];

export const POPOVER_OBSERVED_ATTRIBUTES = [
  'variant',
  'placement',
  'title',
  'description',
  'trigger',
  'open',
] as const;

export function resolvePopoverVariant(value: string | null): PopoverVariant {
  if ((POPOVER_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as PopoverVariant;
  }
  return 'basic';
}

export function resolvePopoverPlacement(value: string | null): PopoverPlacement {
  if ((POPOVER_PLACEMENTS as readonly string[]).includes(value ?? '')) {
    return value as PopoverPlacement;
  }
  return 'bottom';
}
