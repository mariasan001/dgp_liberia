export const COMBOBOX_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'filled',
  'soft',
  'floating',
  'pill',
  'icon',
  'create',
  'loading',
  'complete',
] as const;

export type ComboboxVariant = (typeof COMBOBOX_VARIANTS)[number];

export const COMBOBOX_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type ComboboxStatus = (typeof COMBOBOX_STATUSES)[number];

export const COMBOBOX_SIZES = ['sm', 'md', 'lg'] as const;
export type ComboboxSize = (typeof COMBOBOX_SIZES)[number];

export type ComboboxOption = {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
};

export const COMBOBOX_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'placeholder',
  'helper',
  'value',
  'status',
  'size',
  'name',
  'options',
  'disabled',
  'required',
] as const;

export const DEFAULT_COMBOBOX_OPTIONS: ComboboxOption[] = [
  { value: 'salud', label: 'Secretaria de Salud', hint: 'SSA' },
  { value: 'educacion', label: 'Educacion Publica', hint: 'SEP' },
  { value: 'seguridad', label: 'Seguridad Publica', hint: 'SSP' },
  { value: 'hacienda', label: 'Hacienda y Credito', hint: 'SHCP' },
  { value: 'bienestar', label: 'Bienestar', hint: 'BIEN' },
  { value: 'trabajo', label: 'Trabajo y Prevision', hint: 'STPS' },
  { value: 'economia', label: 'Economia', hint: 'SE' },
  { value: 'cultura', label: 'Cultura', hint: 'CULTURA' },
];

export function resolveComboboxVariant(value: string | null): ComboboxVariant {
  if ((COMBOBOX_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as ComboboxVariant;
  }
  return 'basic';
}

export function resolveComboboxStatus(value: string | null): ComboboxStatus {
  if ((COMBOBOX_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as ComboboxStatus;
  }
  return 'default';
}

export function resolveComboboxSize(value: string | null): ComboboxSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}

export function parseComboboxOptions(raw: string | null): ComboboxOption[] {
  if (raw?.trim()) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as ComboboxOption[];
      }
    } catch {
      // fall through
    }
  }
  return DEFAULT_COMBOBOX_OPTIONS;
}
