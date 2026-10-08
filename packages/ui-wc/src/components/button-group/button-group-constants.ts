export const BUTTON_GROUP_VARIANTS = [
  'basic',
  'solid',
  'outline',
  'soft',
  'ghost',
  'split',
  'vertical',
  'dense',
  'bordered',
  'complete',
] as const;

export type ButtonGroupVariant = (typeof BUTTON_GROUP_VARIANTS)[number];

export const BUTTON_GROUP_SIZES = ['sm', 'md', 'lg'] as const;
export type ButtonGroupSize = (typeof BUTTON_GROUP_SIZES)[number];

export const BUTTON_GROUP_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'items',
  'disabled',
] as const;

export type ButtonGroupItem = {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

export const BUTTON_GROUP_ICONS: Record<string, string> = {
  plus: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 8.5h13M9.5 8.5V6.8A1.3 1.3 0 0 1 10.8 5.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M8 8.5l.8 10a1.5 1.5 0 0 0 1.5 1.4h4.4a1.5 1.5 0 0 0 1.5-1.4l.8-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v10.5M12 15.5 8.5 12M12 15.5 15.5 12M5 18.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6.5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="6.5" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.3 11.1 15.2 7.4M8.3 12.9l6.9 3.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14l-5.5 6.2V18l-3 1.5v-6.8L5 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  print: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 9V5.5h10V9M7 15.5h10V19H7v-3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="4.5" y="9" width="15" height="6.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

export function resolveButtonGroupIcon(name?: string): string | null {
  if (!name) return null;
  return BUTTON_GROUP_ICONS[name.trim().toLowerCase()] || null;
}

export function resolveButtonGroupVariant(value: string | null): ButtonGroupVariant {
  if ((BUTTON_GROUP_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as ButtonGroupVariant;
  }
  return 'basic';
}

export function resolveButtonGroupSize(value: string | null): ButtonGroupSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function parseButtonGroupItems(raw: string | null): ButtonGroupItem[] {
  if (!raw?.trim()) {
    return [
      { id: 'guardar', label: 'Guardar', icon: 'check' },
      { id: 'editar', label: 'Editar', icon: 'edit' },
      { id: 'eliminar', label: 'Eliminar', icon: 'trash' },
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
            : `btn-${index + 1}`;
        const label =
          typeof row.label === 'string' && row.label.trim()
            ? row.label.trim()
            : id;
        return {
          id,
          label,
          icon: typeof row.icon === 'string' ? row.icon : undefined,
          disabled: Boolean(row.disabled),
        } satisfies ButtonGroupItem;
      })
      .filter((item): item is ButtonGroupItem => Boolean(item));
  } catch {
    return [];
  }
}
