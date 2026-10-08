export const AVATAR_VARIANTS = [
  'basic',
  'soft',
  'solid',
  'outline',
  'square',
  'status',
  'group',
  'dense',
  'brand',
  'complete',
] as const;

export type AvatarVariant = (typeof AVATAR_VARIANTS)[number];

export const AVATAR_SIZES = ['sm', 'md', 'lg'] as const;
export type AvatarSize = (typeof AVATAR_SIZES)[number];

export const AVATAR_TONES = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'neutral',
] as const;
export type AvatarTone = (typeof AVATAR_TONES)[number];

export const AVATAR_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'tone',
  'name',
  'initials',
  'status',
] as const;

export function resolveAvatarVariant(value: string | null): AvatarVariant {
  if ((AVATAR_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as AvatarVariant;
  }
  return 'basic';
}

export function resolveAvatarSize(value: string | null): AvatarSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function resolveAvatarTone(value: string | null): AvatarTone {
  if ((AVATAR_TONES as readonly string[]).includes(value ?? '')) {
    return value as AvatarTone;
  }
  return 'primary';
}

export function buildInitials(name: string | null, initials: string | null): string {
  const direct = initials?.trim();
  if (direct) return direct.slice(0, 2).toUpperCase();
  const parts = (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'GM';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}
