export const STAT_STRIP_VARIANTS = [
  'basic',
  'soft',
  'dense',
  'outline',
  'cards',
  'inline',
  'centered',
  'wide',
  'brand',
  'complete',
] as const;

export type StatStripVariant = (typeof STAT_STRIP_VARIANTS)[number];

export const STAT_STRIP_OBSERVED_ATTRIBUTES = [
  'variant',
  'items',
] as const;

export function resolveStatStripVariant(
  value: string | null,
): StatStripVariant {
  if ((STAT_STRIP_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as StatStripVariant;
  }
  return 'basic';
}

/** Formato: label:value:hint|label:value:hint */
export function parseStatItems(
  value: string | null,
): { label: string; value: string; hint: string }[] {
  const raw = value?.trim();
  const source =
    raw ||
    'Tramites:128k:este mes|Tiempo:4.2m:promedio|Satisfaccion:96%:encuesta|Sedes:32:activas';
  return source
    .split('|')
    .map((part) => {
      const [label = 'Metrica', valueText = '—', hint = ''] = part
        .split(':')
        .map((chunk) => chunk.trim());
      return { label, value: valueText, hint };
    })
    .filter((item) => item.label)
    .slice(0, 6);
}
