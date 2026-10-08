export const ACCORDION_VARIANTS = [
  'basic',
  'soft',
  'outline',
  'dense',
  'flush',
  'separated',
  'brand',
  'faq',
  'single',
  'complete',
] as const;

export type AccordionVariant = (typeof ACCORDION_VARIANTS)[number];

export const ACCORDION_OBSERVED_ATTRIBUTES = [
  'variant',
  'items',
  'open-index',
] as const;

export type AccordionItem = {
  title: string;
  body: string;
};

export function resolveAccordionVariant(value: string | null): AccordionVariant {
  if ((ACCORDION_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as AccordionVariant;
  }
  return 'basic';
}

export function parseAccordionItems(value: string | null): AccordionItem[] {
  if (!value?.trim()) {
    return [
      {
        title: 'Que documentos necesito?',
        body: 'CURP, identificacion oficial y comprobante de domicilio vigentes.',
      },
      {
        title: 'Cuanto tarda el tramite?',
        body: 'El tiempo promedio de resolucion es de 5 a 10 dias habiles.',
      },
      {
        title: 'Puedo dar seguimiento en linea?',
        body: 'Si. Con el folio puedes consultar el estatus en la bandeja ciudadana.',
      },
    ];
  }
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return parseAccordionItems(null);
    return parsed
      .map((row) => {
        if (!row || typeof row !== 'object') return null;
        const item = row as Record<string, unknown>;
        const title = typeof item.title === 'string' ? item.title.trim() : '';
        const body = typeof item.body === 'string' ? item.body.trim() : '';
        if (!title || !body) return null;
        return { title, body };
      })
      .filter((row): row is AccordionItem => Boolean(row));
  } catch {
    return parseAccordionItems(null);
  }
}
