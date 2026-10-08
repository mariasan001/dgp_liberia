export const SIDEBAR_VARIANTS = [
  'basic',
  'collapsed',
  'brand',
  'grouped',
  'user',
  'dense',
  'badges',
] as const;

export type SidebarVariant = (typeof SIDEBAR_VARIANTS)[number];

export const SIDEBAR_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type SidebarTone = (typeof SIDEBAR_TONES)[number];

export const SIDEBAR_OBSERVED_ATTRIBUTES = ['variant', 'tone', 'collapsed'] as const;

export function resolveSidebarVariant(value: string | null): SidebarVariant {
  if (
    value === 'collapsed' ||
    value === 'brand' ||
    value === 'grouped' ||
    value === 'user' ||
    value === 'dense' ||
    value === 'badges'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveSidebarTone(value: string | null): SidebarTone {
  if (
    value === 'accent' ||
    value === 'dark' ||
    value === 'neutral' ||
    value === 'soft' ||
    value === 'primary'
  ) {
    return value;
  }
  return 'primary';
}
