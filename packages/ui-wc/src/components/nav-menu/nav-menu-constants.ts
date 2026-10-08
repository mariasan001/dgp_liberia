export const NAV_MENU_VARIANTS = [
  'basic',
  'horizontal',
  'vertical',
  'pills',
  'underline',
  'soft',
  'dense',
  'icons',
  'bordered',
  'complete',
  'rail',
  'ghost',
  'dock',
  'sidebar',
  'floating',
] as const;

export type NavMenuVariant = (typeof NAV_MENU_VARIANTS)[number];

export const NAV_MENU_SIZES = ['sm', 'md', 'lg'] as const;
export type NavMenuSize = (typeof NAV_MENU_SIZES)[number];

export const NAV_MENU_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'value',
  'items',
  'disabled',
] as const;

export type NavMenuItem = {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  disabled?: boolean;
  badge?: string;
  description?: string;
};

export const NAV_ICONS: Record<string, string> = {
  house: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 11.5 12 5l7.5 6.5M7 10.5V19h10v-8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 8.5A2 2 0 0 1 5.5 6.5h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="2.75" stroke="currentColor" stroke-width="1.5"/><path d="M3.8 18c1.3-2.1 3-3.2 5.2-3.2s3.9 1.1 5.2 3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="16.2" cy="9.2" r="2.25" stroke="currentColor" stroke-width="1.5"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V10.5M12 19V5.5M19 19v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5h11l-1.2-1.5V10a4.3 4.3 0 0 0-8.6 0v5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h6l4 4v11a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5"/><path d="M13.5 4.5v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="M16.2 16.2 20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  squares: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
};

export function resolveNavIcon(name?: string): string | null {
  if (!name) return null;
  return NAV_ICONS[name.trim().toLowerCase()] || null;
}

export function resolveNavMenuVariant(value: string | null): NavMenuVariant {
  if ((NAV_MENU_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as NavMenuVariant;
  }
  return 'basic';
}

export function resolveNavMenuSize(value: string | null): NavMenuSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function parseNavMenuItems(raw: string | null): NavMenuItem[] {
  if (!raw?.trim()) {
    return [
      { id: 'inicio', label: 'Inicio', icon: 'house', description: 'Panel principal' },
      { id: 'tramites', label: 'Tramites', icon: 'folder', description: 'Gestiones activas' },
      { id: 'ciudadanos', label: 'Ciudadanos', icon: 'users', description: 'Padron' },
      { id: 'reportes', label: 'Reportes', icon: 'chart', description: 'Indicadores' },
    ];
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item, index) => {
        if (!item || typeof item !== 'object') return null;
        const row = item as Record<string, unknown>;
        const id =
          typeof row.id === 'string' && row.id.trim()
            ? row.id.trim()
            : `nav-${index + 1}`;
        const label =
          typeof row.label === 'string' && row.label.trim()
            ? row.label.trim()
            : id;
        return {
          id,
          label,
          href: typeof row.href === 'string' ? row.href : undefined,
          icon: typeof row.icon === 'string' ? row.icon : undefined,
          disabled: Boolean(row.disabled),
          badge: typeof row.badge === 'string' ? row.badge : undefined,
          description:
            typeof row.description === 'string' ? row.description : undefined,
        } satisfies NavMenuItem;
      })
      .filter((item): item is NavMenuItem => Boolean(item));
  } catch {
    return [];
  }
}
