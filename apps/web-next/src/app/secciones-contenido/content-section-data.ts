import type { ContentSectionVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type ContentSectionExample = {
  id: string;
  title: string;
  description: string;
  variant: ContentSectionVariant;
  eyebrow?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  body?: string;
  actionLabel?: string;
};

export const CONTENT_SECTION_EXAMPLES: ContentSectionExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Bloque limpio con jerarquia tipografica clara.',
    variant: 'basic',
    eyebrow: 'Servicio',
    sectionTitle: 'Constancia al instante',
    sectionDescription: 'Descarga el documento oficial sin filas ni esperas.',
    body: 'Valida tu RFC y obten la constancia en minutos, con un flujo pensado para ciudadano.',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo fill para contrastar sobre superficies blancas.',
    variant: 'soft',
    eyebrow: 'Guia',
    sectionTitle: 'Requisitos claros',
    sectionDescription: 'Solo lo esencial, sin ruido.',
    body: 'Identificacion, CURP y comprobante de domicilio con antiguedad maxima de 3 meses.',
  },
  {
    id: 'split',
    title: 'Dividido',
    description: 'Texto + plano visual para landings.',
    variant: 'split',
    eyebrow: 'Modulo',
    sectionTitle: 'Tu bandeja, en orden',
    sectionDescription: 'Opera el dia con prioridades visibles.',
    body: 'Urgentes, firmas y observaciones pendientes quedan a un vistazo del area.',
  },
  {
    id: 'centered',
    title: 'Centrado',
    description: 'Una idea, protagonismo tipografico.',
    variant: 'centered',
    eyebrow: 'GobMX',
    sectionTitle: 'Claridad institucional',
    sectionDescription: 'Una sola promesa por seccion.',
    body: 'Tipografia, color y ritmo alineados al sistema para que el mensaje respire.',
  },
  {
    id: 'dense',
    title: 'Denso',
    description: 'Compacto para avisos y notas operativas.',
    variant: 'dense',
    eyebrow: 'Nota',
    sectionTitle: 'Ventana de atencion',
    sectionDescription: 'Cambio de horario.',
    body: 'La mesa de ayuda atiende de 9:00 a 18:00 hrs.',
  },
  {
    id: 'outline',
    title: 'Contorno',
    description: 'Acento vino lateral para avisos legales.',
    variant: 'outline',
    eyebrow: 'Legal',
    sectionTitle: 'Aviso de privacidad',
    sectionDescription: 'Datos personales con tratamiento transparente.',
    body: 'La informacion se usa unicamente para gestionar el tramite solicitado.',
  },
  {
    id: 'steps',
    title: 'Pasos',
    description: 'Caja de flujo con lectura paso a paso.',
    variant: 'steps',
    eyebrow: 'Flujo',
    sectionTitle: 'Inicia tu solicitud',
    sectionDescription: 'Tres pasos, cero friccion.',
    body: '1) Captura  ·  2) Adjunta evidencias  ·  3) Firma y envia',
  },
  {
    id: 'feature',
    title: 'Feature',
    description: 'Bloque con CTA vino y presencia fuerte.',
    variant: 'feature',
    eyebrow: 'Beneficio',
    sectionTitle: 'Seguimiento en vivo',
    sectionDescription: 'Consulta el folio cuando quieras.',
    body: 'Notificaciones al cambiar el estatus del expediente, sin perseguir el tramite.',
    actionLabel: 'Consultar folio',
  },
  {
    id: 'brand',
    title: 'Marca',
    description: 'Panel vino de marca con CTA claro.',
    variant: 'brand',
    eyebrow: 'Marca',
    sectionTitle: 'Identidad GobMX',
    sectionDescription: 'Presencia institucional en cada superficie.',
    body: 'Vino, dorado y tipografia del sistema con un bloque que se siente oficial.',
    actionLabel: 'Ver fundamentos',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Cierre premium con acento dorado.',
    variant: 'complete',
    eyebrow: 'Oficial',
    sectionTitle: 'Listo para publicar',
    sectionDescription: 'El cierre de una landing o campana oficial.',
    body: 'Acento dorado, CTA oscuro y jerarquia clara para el ultimo empujon.',
    actionLabel: 'Continuar',
  },
];

export const CONTENT_SECTION_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | soft | split | centered | dense | outline | steps | feature | brand | complete',
  },
  { name: 'eyebrow', type: 'string', defaultValue: 'Seccion', body: 'Etiqueta superior.' },
  { name: 'title', type: 'string', defaultValue: 'Contenido…', body: 'Titulo principal.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Texto de apoyo.' },
  { name: 'body', type: 'string', defaultValue: '—', body: 'Contenido del bloque.' },
  {
    name: 'action-label',
    type: 'string',
    defaultValue: 'Conocer mas',
    body: 'CTA (feature / brand / complete).',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: ContentSectionExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.eyebrow ? `eyebrow="${example.eyebrow}"` : null,
    `title="${example.sectionTitle ?? 'Seccion'}"`,
    `description="${example.sectionDescription ?? 'Descripcion'}"`,
    example.body ? `body="${example.body}"` : null,
    example.actionLabel ? `action-label="${example.actionLabel}"` : null,
  ]
    .filter(Boolean)
    .join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-content-section ${attrs}></gob-content-section>\n`;
}
