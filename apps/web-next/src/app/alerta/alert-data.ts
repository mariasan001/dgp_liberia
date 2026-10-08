import type { AlertTone, AlertVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type AlertExample = {
  id: string;
  title: string;
  description: string;
  variant: AlertVariant;
  tone?: AlertTone;
  alertTitle?: string;
  alertDescription?: string;
  action?: string;
  dismissible?: boolean;
};

export const ALERT_EXAMPLES: AlertExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Aviso persistente informativo.',
    variant: 'basic',
    tone: 'info',
    alertTitle: 'Actualizacion disponible',
    alertDescription: 'Hay una nueva version del catalogo de tramites.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Confirmacion de operacion.',
    variant: 'soft',
    tone: 'success',
    alertTitle: 'Tramite enviado',
    alertDescription: 'Tu solicitud quedo registrada correctamente.',
    action: 'Ver folio',
  },
  {
    id: 'warning',
    title: 'Advertencia',
    description: 'Requiere atencion del usuario.',
    variant: 'outline',
    tone: 'warning',
    alertTitle: 'Documentos incompletos',
    alertDescription: 'Falta adjuntar identificacion oficial vigente.',
    action: 'Completar',
  },
  {
    id: 'danger',
    title: 'Peligro',
    description: 'Error o bloqueo critico.',
    variant: 'solid',
    tone: 'danger',
    alertTitle: 'No se pudo guardar',
    alertDescription: 'Revisa tu conexion e intenta de nuevo.',
    action: 'Reintentar',
  },
  {
    id: 'banner',
    title: 'Banner',
    description: 'Acento lateral tipo sistema.',
    variant: 'banner',
    tone: 'info',
    alertTitle: 'Mantenimiento programado',
    alertDescription: 'El servicio estara en pausa el sabado de 02:00 a 04:00.',
  },
  {
    id: 'dense',
    title: 'Denso',
    description: 'Altura compacta para layouts densos.',
    variant: 'dense',
    tone: 'neutral',
    alertTitle: 'Cambios sin guardar',
    alertDescription: 'Salir ahora descartara las ediciones.',
  },
  {
    id: 'inline',
    title: 'En linea',
    description: 'Chip de aviso corto.',
    variant: 'inline',
    tone: 'success',
    alertTitle: 'Validado',
  },
  {
    id: 'bordered',
    title: 'Con borde',
    description: 'Marco acentuado sin relleno fuerte.',
    variant: 'bordered',
    tone: 'warning',
    alertTitle: 'Plazo proximo',
    alertDescription: 'Vence en 48 horas la carga de evidencias.',
    action: 'Ir al expediente',
  },
  {
    id: 'dismissible',
    title: 'Descartable',
    description: 'Con boton de cierre.',
    variant: 'dismissible',
    tone: 'info',
    alertTitle: 'Tip de usabilidad',
    alertDescription: 'Puedes filtrar por estatus en la barra superior.',
    dismissible: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Riel dorado institucional.',
    variant: 'complete',
    tone: 'info',
    alertTitle: 'Revision institucional',
    alertDescription: 'Este aviso usa el acento dorado del sistema.',
    action: 'Entendido',
    dismissible: true,
  },
];

export const ALERT_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | outline | solid | banner | dense | inline | bordered | dismissible | complete' },
  { name: 'tone', type: 'string', defaultValue: 'info', body: 'info | success | warning | danger | neutral' },
  { name: 'title', type: 'string', defaultValue: 'Aviso importante', body: 'Titulo del aviso.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Texto de apoyo.' },
  { name: 'action', type: 'string', defaultValue: '—', body: 'Etiqueta del boton de accion.' },
  { name: 'dismissible', type: 'boolean', defaultValue: 'false', body: 'Muestra boton de cierre.' },
] as const;

export function buildSnippet(lang: CodeLang, example: AlertExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.tone ? `tone="${example.tone}"` : null,
    example.alertTitle ? `title="${example.alertTitle}"` : null,
    example.alertDescription ? `description="${example.alertDescription}"` : null,
    example.action ? `action="${example.action}"` : null,
    example.dismissible ? 'dismissible' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-alert ${attrs}></gob-alert>\n`;
}
