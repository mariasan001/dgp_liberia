export const TOOLTIP_VARIANTS = [
  'basic',
  'soft',
  'solid',
  'outline',
  'dense',
  'rich',
  'inverse',
  'brand',
  'success',
  'complete',
] as const;

export type TooltipVariant = (typeof TOOLTIP_VARIANTS)[number];

export const TOOLTIP_PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;
export type TooltipPlacement = (typeof TOOLTIP_PLACEMENTS)[number];

export const TOOLTIP_OBSERVED_ATTRIBUTES = [
  'variant',
  'placement',
  'label',
  'trigger',
  'open',
] as const;

export function resolveTooltipVariant(value: string | null): TooltipVariant {
  if ((TOOLTIP_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as TooltipVariant;
  }
  return 'basic';
}

export function resolveTooltipPlacement(value: string | null): TooltipPlacement {
  if ((TOOLTIP_PLACEMENTS as readonly string[]).includes(value ?? '')) {
    return value as TooltipPlacement;
  }
  return 'top';
}
