import type { CardVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type CardExample = {
  id: string;
  title: string;
  description: string;
  variant: CardVariant;
  cardTitle?: string;
  cardDescription?: string;
  body?: string;
  meta?: string;
  actionLabel?: string;
};

export const CARD_EXAMPLES: CardExample[] = [
  { id: 'basic', title: 'Basico', description: 'Contenedor de contenido.', variant: 'basic', cardTitle: 'Expediente TMP-4412', cardDescription: 'Solicitud de constancia.', body: 'Estatus abierto · CDMX · Revision documental.', meta: 'Tramite' },
  { id: 'soft', title: 'Suave', description: 'Fondo fill institucional.', variant: 'soft', cardTitle: 'Bandeja del dia', cardDescription: 'Resumen operativo.', body: '18 pendientes · 4 por firmar · 2 urgentes.', meta: 'Dashboard' },
  { id: 'outline', title: 'Contorno', description: 'Borde con acento vino.', variant: 'outline', cardTitle: 'Aviso de privacidad', cardDescription: 'Lectura obligatoria.', body: 'Los datos se tratan conforme a la normatividad vigente.', meta: 'Legal' },
  { id: 'elevated', title: 'Elevada', description: 'Con sombra suave.', variant: 'elevated', cardTitle: 'Firma pendiente', cardDescription: 'Documento listo.', body: 'Acuse de notificacion listo para firma electronica.', meta: 'Accion' },
  { id: 'media', title: 'Media', description: 'Con bloque visual superior.', variant: 'media', cardTitle: 'Evidencia adjunta', cardDescription: 'Comprobante cargado.', body: 'PDF 1.2 MB · Validado por el area receptora.', meta: 'Archivo', actionLabel: 'Abrir' },
  { id: 'action', title: 'Con accion', description: 'CTA al pie.', variant: 'action', cardTitle: 'Nueva observacion', cardDescription: 'Captura corta.', body: 'Agrega hallazgos de la revision documental.', meta: 'Formulario', actionLabel: 'Agregar' },
  { id: 'dense', title: 'Denso', description: 'Padding compacto.', variant: 'dense', cardTitle: 'Filtro activo', cardDescription: '12 resultados.', body: 'Abierto · CDMX', meta: 'Lista' },
  { id: 'stat', title: 'Metrica', description: 'Numero protagonista.', variant: 'stat', cardTitle: '128', cardDescription: 'Tramites del mes', body: 'Comparado con el periodo anterior.', meta: 'KPI' },
  { id: 'horizontal', title: 'Horizontal', description: 'Media a la izquierda.', variant: 'horizontal', cardTitle: 'Ciudadano', cardDescription: 'Ana Morales', body: 'CURP validada · Contacto institucional.', meta: 'Perfil' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', cardTitle: 'Aviso oficial', cardDescription: 'Tarjeta con acento dorado.', body: 'Usa el lenguaje visual del sistema GobMX.', meta: 'Marca' },
];

export const CARD_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | outline | elevated | media | action | dense | stat | horizontal | complete' },
  { name: 'title', type: 'string', defaultValue: 'Tarjeta…', body: 'Titulo principal.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Texto de apoyo.' },
  { name: 'body', type: 'string', defaultValue: '—', body: 'Contenido del bloque.' },
  { name: 'meta', type: 'string', defaultValue: 'Contenido', body: 'Etiqueta superior.' },
  { name: 'action-label', type: 'string', defaultValue: 'Ver detalle', body: 'CTA (action / media).' },
] as const;

export function buildSnippet(lang: CodeLang, example: CardExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    `title="${example.cardTitle ?? 'Tarjeta'}"`,
    `description="${example.cardDescription ?? 'Descripcion'}"`,
    example.body ? `body="${example.body}"` : null,
    example.meta ? `meta="${example.meta}"` : null,
    example.actionLabel ? `action-label="${example.actionLabel}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-card ${attrs}></gob-card>\n`;
}
