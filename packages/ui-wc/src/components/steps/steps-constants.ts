export const STEPS_VARIANTS = [
  'basic',
  'numbered',
  'dots',
  'vertical',
  'compact',
  'soft',
  'outlined',
  'labeled',
  'progress',
  'complete',
] as const;

export type StepsVariant = (typeof STEPS_VARIANTS)[number];

export const STEPS_SIZES = ['sm', 'md', 'lg'] as const;
export type StepsSize = (typeof STEPS_SIZES)[number];

export const STEPS_OBSERVED_ATTRIBUTES = [
  'variant',
  'size',
  'value',
  'items',
  'disabled',
] as const;

export type StepsItem = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
};

export const STEPS_ICONS: Record<string, string> = {
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h6l4 4v11a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5"/><path d="M13.5 4.5v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.25" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 18.5c1.6-2.6 3.8-3.9 6.5-3.9s4.9 1.3 6.5 3.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.8 5.5 6.2v5.3c0 4.1 2.7 7.1 6.5 8.5 3.8-1.4 6.5-4.4 6.5-8.5V6.2L12 3.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

export function resolveStepsIcon(name?: string): string | null {
  if (!name) return null;
  return STEPS_ICONS[name.trim().toLowerCase()] || null;
}

export function resolveStepsVariant(value: string | null): StepsVariant {
  if ((STEPS_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as StepsVariant;
  }
  return 'basic';
}

export function resolveStepsSize(value: string | null): StepsSize {
  if (value === 'sm' || value === 'lg') return value;
  return 'md';
}

export function parseStepsItems(raw: string | null): StepsItem[] {
  if (!raw?.trim()) {
    return [
      { id: 'datos', label: 'Datos', description: 'Captura inicial', icon: 'user' },
      { id: 'docs', label: 'Documentos', description: 'Anexos', icon: 'file' },
      { id: 'revision', label: 'Revision', description: 'Validacion', icon: 'shield' },
      { id: 'firma', label: 'Firma', description: 'Cierre', icon: 'pen' },
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
            : `step-${index + 1}`;
        const label =
          typeof row.label === 'string' && row.label.trim()
            ? row.label.trim()
            : `Paso ${index + 1}`;
        return {
          id,
          label,
          description:
            typeof row.description === 'string' ? row.description : undefined,
          icon: typeof row.icon === 'string' ? row.icon : undefined,
          disabled: Boolean(row.disabled),
        } satisfies StepsItem;
      })
      .filter((item): item is StepsItem => Boolean(item));
  } catch {
    return [];
  }
}
