export const SEGMENTED_VARIANTS = [
  'basic',
  'pills',
  'soft',
  'underline',
  'dense',
  'icons',
  'bordered',
  'ghost',
  'block',
  'complete',
] as const;

export type SegmentedVariant = (typeof SEGMENTED_VARIANTS)[number];

export const SEGMENTED_SIZES = ['sm', 'md', 'lg'] as const;
export type SegmentedSize = (typeof SEGMENTED_SIZES)[number];

export const SEGMENTED_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'value',
  'items',
  'disabled',
] as const;

export type SegmentedItem = {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

export const SEGMENTED_ICONS: Record<string, string> = {
  day: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v1.8M12 17.7v1.8M4.5 12h1.8M17.7 12h1.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  week: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  month: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17M8 14h1.5M12 14h1.5M16 14h1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 7h11M8.5 12h11M8.5 17h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="5" cy="7" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="17" r="1" fill="currentColor"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5.5 3.5 7.5v11l5.5-2 5.5 2 5.5-2v-11L14.5 7.5 9 5.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
};

export function resolveSegmentedIcon(name?: string): string | null {
  if (!name) return null;
  return SEGMENTED_ICONS[name.trim().toLowerCase()] || null;
}

export function resolveSegmentedVariant(value: string | null): SegmentedVariant {
  if ((SEGMENTED_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as SegmentedVariant;
  }
  return 'basic';
}

export function resolveSegmentedSize(value: string | null): SegmentedSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function parseSegmentedItems(raw: string | null): SegmentedItem[] {
  if (!raw?.trim()) {
    return [
      { id: 'dia', label: 'Dia', icon: 'day' },
      { id: 'semana', label: 'Semana', icon: 'week' },
      { id: 'mes', label: 'Mes', icon: 'month' },
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
            : `seg-${index + 1}`;
        const label =
          typeof row.label === 'string' && row.label.trim()
            ? row.label.trim()
            : id;
        return {
          id,
          label,
          icon: typeof row.icon === 'string' ? row.icon : undefined,
          disabled: Boolean(row.disabled),
        } satisfies SegmentedItem;
      })
      .filter((item): item is SegmentedItem => Boolean(item));
  } catch {
    return [];
  }
}
