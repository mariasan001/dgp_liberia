export const SELECT_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'filled',
  'soft',
  'floating',
  'pill',
  'icon',
  'group',
  'multiple',
  'search',
  'underline',
  'ghost',
  'split',
  'complete',
] as const;

export type SelectVariant = (typeof SELECT_VARIANTS)[number];

export const SELECT_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type SelectStatus = (typeof SELECT_STATUSES)[number];

export const SELECT_SIZES = ['sm', 'md', 'lg'] as const;
export type SelectSize = (typeof SELECT_SIZES)[number];

export type SelectOption = {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
};

export type SelectOptionGroup = {
  label: string;
  options: SelectOption[];
};

export type SelectOptionsPayload = Array<SelectOption | SelectOptionGroup>;

export const SELECT_OBSERVED_ATTRIBUTES = [
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

export const DEFAULT_SELECT_OPTIONS: SelectOption[] = [
  { value: 'jal', label: 'Jalisco', hint: 'Occidente' },
  { value: 'cdmx', label: 'Ciudad de Mexico', hint: 'Capital' },
  { value: 'nl', label: 'Nuevo Leon', hint: 'Norte' },
  { value: 'yuc', label: 'Yucatan', hint: 'Sureste' },
  { value: 'sin', label: 'Sinaloa', hint: 'Pacifico' },
  { value: 'qroo', label: 'Quintana Roo', hint: 'Caribe' },
];

export const DEFAULT_GROUP_OPTIONS: SelectOptionGroup[] = [
  {
    label: 'Norte',
    options: [
      { value: 'bc', label: 'Baja California' },
      { value: 'nl', label: 'Nuevo Leon' },
      { value: 'chih', label: 'Chihuahua' },
    ],
  },
  {
    label: 'Centro',
    options: [
      { value: 'cdmx', label: 'Ciudad de Mexico' },
      { value: 'mex', label: 'Estado de Mexico' },
      { value: 'qro', label: 'Queretaro' },
    ],
  },
  {
    label: 'Sur',
    options: [
      { value: 'yuc', label: 'Yucatan' },
      { value: 'oax', label: 'Oaxaca' },
      { value: 'chis', label: 'Chiapas' },
    ],
  },
];

export function resolveSelectVariant(value: string | null): SelectVariant {
  if ((SELECT_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as SelectVariant;
  }
  return 'basic';
}

export function resolveSelectStatus(value: string | null): SelectStatus {
  if ((SELECT_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as SelectStatus;
  }
  return 'default';
}

export function resolveSelectSize(value: string | null): SelectSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}

export function isGroup(
  item: SelectOption | SelectOptionGroup,
): item is SelectOptionGroup {
  return Array.isArray((item as SelectOptionGroup).options);
}

export function parseSelectOptions(
  raw: string | null,
  variant: SelectVariant,
): SelectOptionsPayload {
  if (raw?.trim()) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as SelectOptionsPayload;
      }
    } catch {
      // fall through to defaults
    }
  }
  if (variant === 'group') return DEFAULT_GROUP_OPTIONS;
  return DEFAULT_SELECT_OPTIONS;
}

export function flattenOptions(
  payload: SelectOptionsPayload,
): SelectOption[] {
  const out: SelectOption[] = [];
  for (const item of payload) {
    if (isGroup(item)) out.push(...item.options);
    else out.push(item);
  }
  return out;
}
