export const DROPDOWN_MENU_VARIANTS = [
  'basic',
  'solid',
  'soft',
  'outline',
  'ghost',
  'dense',
  'icons',
  'danger',
  'bordered',
  'complete',
] as const;

export type DropdownMenuVariant = (typeof DROPDOWN_MENU_VARIANTS)[number];

export const DROPDOWN_MENU_SIZES = ['sm', 'md', 'lg'] as const;
export type DropdownMenuSize = (typeof DROPDOWN_MENU_SIZES)[number];

export const DROPDOWN_MENU_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'label',
  'items',
  'disabled',
  'open',
] as const;

export type DropdownMenuItem = {
  id: string;
  label: string;
  icon?: string;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
};

export const DROPDOWN_ICONS: Record<string, string> = {
  edit: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 8.5h13M9.5 8.5V6.8A1.3 1.3 0 0 1 10.8 5.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M8 8.5l.8 10a1.5 1.5 0 0 0 1.5 1.4h4.4a1.5 1.5 0 0 0 1.5-1.4l.8-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v10.5M12 15.5 8.5 12M12 15.5 15.5 12M5 18.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6.5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="6.5" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.3 11.1 15.2 7.4M8.3 12.9l6.9 3.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 15.5H5.5A2 2 0 0 1 3.5 13.5v-8A2 2 0 0 1 5.5 3.5h8a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 12s3.2-6 8.5-6 8.5 6 8.5 6-3.2 6-8.5 6-8.5-6-8.5-6Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18" cy="12" r="1.3" fill="currentColor"/></svg>`,
};

export const CARET_SVG = `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function resolveDropdownIcon(name?: string): string | null {
  if (!name) return null;
  return DROPDOWN_ICONS[name.trim().toLowerCase()] || null;
}

export function resolveDropdownMenuVariant(value: string | null): DropdownMenuVariant {
  if ((DROPDOWN_MENU_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as DropdownMenuVariant;
  }
  return 'basic';
}

export function resolveDropdownMenuSize(value: string | null): DropdownMenuSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function parseDropdownMenuItems(raw: string | null): DropdownMenuItem[] {
  if (!raw?.trim()) {
    return [
      { id: 'ver', label: 'Ver detalle', icon: 'eye' },
      { id: 'editar', label: 'Editar', icon: 'edit' },
      { id: 'copiar', label: 'Duplicar', icon: 'copy' },
      { id: 'div', label: '', divider: true },
      { id: 'eliminar', label: 'Eliminar', icon: 'trash', danger: true },
    ];
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item, index) => {
        if (!item || typeof item !== 'object') return null;
        const row = item as Record<string, unknown>;
        if (row.divider) {
          return {
            id: typeof row.id === 'string' ? row.id : `div-${index}`,
            label: '',
            divider: true,
          } satisfies DropdownMenuItem;
        }
        const id =
          typeof row.id === 'string' && row.id.trim()
            ? row.id.trim()
            : `item-${index + 1}`;
        const label =
          typeof row.label === 'string' && row.label.trim()
            ? row.label.trim()
            : id;
        return {
          id,
          label,
          icon: typeof row.icon === 'string' ? row.icon : undefined,
          danger: Boolean(row.danger),
          disabled: Boolean(row.disabled),
        } satisfies DropdownMenuItem;
      })
      .filter((item): item is DropdownMenuItem => Boolean(item));
  } catch {
    return [];
  }
}
