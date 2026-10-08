export const CONTAINER_VARIANTS = [
  'basic',
  'narrow',
  'wide',
  'full',
  'flush',
  'padded',
  'prose',
] as const;

export type ContainerVariant = (typeof CONTAINER_VARIANTS)[number];

export const CONTAINER_OBSERVED_ATTRIBUTES = ['variant', 'radius', 'shadow'] as const;

export function resolveContainerVariant(value: string | null): ContainerVariant {
  if (
    value === 'narrow' ||
    value === 'wide' ||
    value === 'full' ||
    value === 'flush' ||
    value === 'padded' ||
    value === 'prose'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveContainerFlag(value: string | null): boolean {
  return value === 'true' || value === '';
}
