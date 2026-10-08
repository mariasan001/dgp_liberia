export const TABS_VARIANTS = [
  'basic',
  'underline',
  'pills',
  'soft',
  'vertical',
  'dense',
  'icons',
  'segmented',
  'bordered',
  'complete',
  'line',
  'ghost',
  'card',
  'rail',
  'flush',
  'editorial',
] as const;

export type TabsVariant = (typeof TABS_VARIANTS)[number];

export const TABS_SIZES = ['sm', 'md', 'lg'] as const;
export type TabsSize = (typeof TABS_SIZES)[number];

export const TABS_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'value',
  'items',
  'disabled',
] as const;

export type TabsItem = {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  badge?: string;
};

/** Phosphor-thin style stroke icons (same language as other Gob WC). */
export const TABS_ICONS: Record<string, string> = {
  house: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 11.5 12 5l7.5 6.5M7 10.5V19h10v-8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.25" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 18.5c1.6-2.6 3.8-3.9 6.5-3.9s4.9 1.3 6.5 3.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="2.75" stroke="currentColor" stroke-width="1.5"/><path d="M3.8 18c1.3-2.1 3-3.2 5.2-3.2s3.9 1.1 5.2 3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="16.2" cy="9.2" r="2.25" stroke="currentColor" stroke-width="1.5"/><path d="M14.2 14.8c1.5.2 2.8.9 3.9 2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h6l4 4v11a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5"/><path d="M13.5 4.5v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  files: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 7.5h7.5l3 3V18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5"/><path d="M15.5 7.5v3h3M10 4.5h6.5l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 8.5A2 2 0 0 1 5.5 6.5h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2M6.7 6.7l1.6 1.6M15.7 15.7l1.6 1.6M6.7 17.3l1.6-1.6M15.7 8.3l1.6-1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5h11l-1.2-1.5V10a4.3 4.3 0 0 0-8.6 0v5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  tray: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 14.5 6.2 7.5h11.6l1.7 7M4.5 14.5h15V18a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 18v-3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3.2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V10.5M12 19V5.5M19 19v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  table: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M10 5.5V18.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5.5 3.5 7.5v11l5.5-2 5.5 2 5.5-2v-11L14.5 7.5 9 5.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 5.5v11M14.5 7.5v11" stroke="currentColor" stroke-width="1.5"/></svg>`,
  export: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 14.5V5.5M12 5.5 8.5 9M12 5.5 15.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15.5V18a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18v-2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.8 5.5 6.2v5.3c0 4.1 2.7 7.1 6.5 8.5 3.8-1.4 6.5-4.4 6.5-8.5V6.2L12 3.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13M10 10.5h1.5M12.5 10.5H14M10 13.5h1.5M12.5 13.5H14M10 16.5h1.5M12.5 16.5H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="M16.2 16.2 20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 7h11M8.5 12h11M8.5 17h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="5" cy="7" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="17" r="1" fill="currentColor"/></svg>`,
  squares: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  pencil: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  archive: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="4" rx="1.2" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8.5v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9M10 12.5h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  envelope: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 7.5 12 13l7.5-5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  paper: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h9a2 2 0 0 1 2 2v13l-3-1.5-3 1.5-3-1.5-3 1.5v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 9.5h6M9 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  history: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 12a6.5 6.5 0 1 0 1.8-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 6.5v4h4M12 8.5V12l2.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  day: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v1.8M12 17.7v1.8M4.5 12h1.8M17.7 12h1.8M6.7 6.7l1.3 1.3M16 16l1.3 1.3M6.7 17.3 8 16M16 8l1.3-1.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  week: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4M8 14h2M12 14h2M16 14h1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  month: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17M8 14h1.5M12 14h1.5M16 14h1.5M8 17h1.5M12 17h1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  dots: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18" cy="12" r="1.3" fill="currentColor"/></svg>`,
};

export function resolveTabsIcon(name: string | undefined): string | null {
  if (!name) return null;
  const key = name.trim().toLowerCase();
  return TABS_ICONS[key] || null;
}

export function resolveTabsVariant(value: string | null): TabsVariant {
  if ((TABS_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as TabsVariant;
  }
  return 'basic';
}

export function resolveTabsSize(value: string | null): TabsSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}

export function parseTabsItems(raw: string | null): TabsItem[] {
  if (!raw?.trim()) {
    return [
      { id: 'general', label: 'General', icon: 'house' },
      { id: 'detalle', label: 'Detalle', icon: 'file' },
      { id: 'historial', label: 'Historial', icon: 'history' },
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
            : `tab-${index + 1}`;
        const label =
          typeof row.label === 'string' && row.label.trim()
            ? row.label.trim()
            : id;
        return {
          id,
          label,
          icon: typeof row.icon === 'string' ? row.icon : undefined,
          disabled: Boolean(row.disabled),
          badge: typeof row.badge === 'string' ? row.badge : undefined,
        } satisfies TabsItem;
      })
      .filter((item): item is TabsItem => Boolean(item));
  } catch {
    return [];
  }
}
