export const USER_MENU_VARIANTS = [
  'basic',
  'soft',
  'compact',
  'elevated',
  'dense',
  'outline',
  'brand',
  'status',
  'wide',
  'complete',
] as const;

export type UserMenuVariant = (typeof USER_MENU_VARIANTS)[number];

export const USER_MENU_OBSERVED_ATTRIBUTES = [
  'variant',
  'name',
  'role',
  'email',
  'initials',
  'open',
] as const;

export function resolveUserMenuVariant(value: string | null): UserMenuVariant {
  if ((USER_MENU_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as UserMenuVariant;
  }
  return 'basic';
}

export function buildUserInitials(name: string | null, initials: string | null): string {
  const direct = initials?.trim();
  if (direct) return direct.slice(0, 2).toUpperCase();
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'GM';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}
