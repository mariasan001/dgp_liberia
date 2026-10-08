export const COMMAND_PALETTE_VARIANTS = [
  'basic',
  'soft',
  'dense',
  'outline',
  'grouped',
  'compact',
  'wide',
  'spotlight',
  'brand',
  'complete',
] as const;

export type CommandPaletteVariant = (typeof COMMAND_PALETTE_VARIANTS)[number];

export const COMMAND_PALETTE_OBSERVED_ATTRIBUTES = [
  'variant',
  'placeholder',
  'query',
  'items',
] as const;

export function resolveCommandPaletteVariant(
  value: string | null,
): CommandPaletteVariant {
  if ((COMMAND_PALETTE_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as CommandPaletteVariant;
  }
  return 'basic';
}

/** Formato: label~hint~group|... */
export function parseCommandItems(
  value: string | null,
): { label: string; hint: string; group: string }[] {
  const raw = value?.trim();
  const source =
    raw ||
    'Nuevo tramite~Crear solicitud~Acciones|Buscar folio~Abrir expediente~Navegacion|Ir a bandeja~Pendientes del dia~Navegacion|Cerrar sesion~Salir de la cuenta~Cuenta';
  return source
    .split('|')
    .map((part) => {
      const [label = 'Comando', hint = '', group = 'General'] = part
        .split('~')
        .map((chunk) => chunk.trim());
      return { label, hint, group };
    })
    .filter((item) => item.label)
    .slice(0, 10);
}
