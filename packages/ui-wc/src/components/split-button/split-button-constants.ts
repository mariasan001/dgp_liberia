export const SPLIT_BUTTON_VARIANTS = [
  'basic',
  'solid',
  'soft',
  'outline',
  'ghost',
  'dense',
  'tonal',
  'danger',
  'bordered',
  'complete',
] as const;

export type SplitButtonVariant = (typeof SPLIT_BUTTON_VARIANTS)[number];

export const SPLIT_BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
export type SplitButtonSize = (typeof SPLIT_BUTTON_SIZES)[number];

export const SPLIT_BUTTON_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'label',
  'items',
  'disabled',
  'open',
] as const;

export type SplitButtonItem = {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

export const SPLIT_ICONS: Record<string, string> = {
  draft: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4.5h7.5L19 9v10.5H7V4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14.5 4.5V9H19" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  schedule: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4.5l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  send: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 12 19 5.5 14.5 18.5 11 13.5 4.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 15.5H5.5A2 2 0 0 1 3.5 13.5v-8A2 2 0 0 1 5.5 3.5h8a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v10.5M12 15.5 8.5 12M12 15.5 15.5 12M5 18.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  print: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 9V5.5h10V9M7 15.5h10V19H7v-3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="4.5" y="9" width="15" height="6.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
};

export const SPLIT_CARET = `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function resolveSplitIcon(name?: string): string | null {
  if (!name) return null;
  return SPLIT_ICONS[name.trim().toLowerCase()] || null;
}

export function resolveSplitButtonVariant(value: string | null): SplitButtonVariant {
  if ((SPLIT_BUTTON_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as SplitButtonVariant;
  }
  return 'basic';
}

export function resolveSplitButtonSize(value: string | null): SplitButtonSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function parseSplitButtonItems(raw: string | null): SplitButtonItem[] {
  if (!raw?.trim()) {
    return [
      { id: 'borrador', label: 'Guardar borrador', icon: 'draft' },
      { id: 'programar', label: 'Programar envio', icon: 'schedule' },
      { id: 'duplicar', label: 'Duplicar', icon: 'copy' },
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
            : `opt-${index + 1}`;
        const label =
          typeof row.label === 'string' && row.label.trim()
            ? row.label.trim()
            : id;
        return {
          id,
          label,
          icon: typeof row.icon === 'string' ? row.icon : undefined,
          disabled: Boolean(row.disabled),
        } satisfies SplitButtonItem;
      })
      .filter((item): item is SplitButtonItem => Boolean(item));
  } catch {
    return [];
  }
}
