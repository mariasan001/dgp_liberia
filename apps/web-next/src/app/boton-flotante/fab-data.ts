import type { FabSize, FabVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type FabExample = {
  id: string;
  title: string;
  description: string;
  variant: FabVariant;
  size?: FabSize;
  icon?: string;
  label?: string;
  actions?: string;
  open?: boolean;
  disabled?: boolean;
  tall?: boolean;
};

const DEFAULT_ACTIONS = JSON.stringify([
  { id: 'camara', label: 'Tomar foto', icon: 'camera' },
  { id: 'archivo', label: 'Subir archivo', icon: 'upload' },
  { id: 'persona', label: 'Nuevo ciudadano', icon: 'person' },
]);

const DOCS_ACTIONS = JSON.stringify([
  { id: 'tramite', label: 'Nuevo tramite', icon: 'file' },
  { id: 'carpeta', label: 'Crear carpeta', icon: 'folder' },
  { id: 'imprimir', label: 'Imprimir', icon: 'print' },
  { id: 'compartir', label: 'Compartir', icon: 'share' },
]);

export const FAB_EXAMPLES: FabExample[] = [
  { id: 'basic', title: 'Basico', description: 'Accion primaria flotante.', variant: 'basic', icon: 'plus', label: 'Agregar' },
  { id: 'solid', title: 'Solido', description: 'Relleno vino institucional.', variant: 'solid', icon: 'edit', label: 'Editar' },
  { id: 'soft', title: 'Suave', description: 'Fondo claro con tinta vino.', variant: 'soft', icon: 'chat', label: 'Mensaje' },
  { id: 'tonal', title: 'Tonal', description: 'Acento dorado institucional.', variant: 'tonal', icon: 'share', label: 'Compartir' },
  { id: 'extended', title: 'Extendido', description: 'Icono + etiqueta visible.', variant: 'extended', icon: 'plus', label: 'Nuevo tramite' },
  {
    id: 'actions',
    title: 'Con acciones',
    description: 'Speed dial: abre acciones secundarias nuevas.',
    variant: 'actions',
    icon: 'plus',
    label: 'Mas acciones',
    actions: DEFAULT_ACTIONS,
    tall: true,
  },
  {
    id: 'actions-open',
    title: 'Acciones abiertas',
    description: 'Menu de acciones visible por defecto.',
    variant: 'actions',
    icon: 'plus',
    label: 'Crear',
    actions: DOCS_ACTIONS,
    open: true,
    tall: true,
  },
  { id: 'mini', title: 'Mini', description: 'Tamano compacto para densidades altas.', variant: 'mini', icon: 'search', label: 'Buscar' },
  { id: 'outline', title: 'Contorno', description: 'Sobre superficies claras.', variant: 'outline', icon: 'upload', label: 'Subir' },
  { id: 'danger', title: 'Peligro', description: 'Accion destructiva flotante.', variant: 'danger', icon: 'plus', label: 'Reportar' },
  { id: 'success', title: 'Exito', description: 'Confirmacion o guardado.', variant: 'success', icon: 'check', label: 'Listo' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', icon: 'help', label: 'Ayuda' },
  { id: 'sm', title: 'Pequeño', description: 'Tamano compacto.', variant: 'solid', size: 'sm', icon: 'plus', label: 'Agregar' },
  { id: 'lg', title: 'Grande', description: 'Mayor area tactil.', variant: 'solid', size: 'lg', icon: 'plus', label: 'Agregar' },
  { id: 'disabled', title: 'Deshabilitado', description: 'Sin interaccion.', variant: 'solid', icon: 'plus', label: 'Agregar', disabled: true },
];

export const FAB_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | solid | soft | tonal | extended | mini | outline | danger | success | complete | actions' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'icon', type: 'string', defaultValue: 'plus', body: 'plus | x | edit | chat | share | search | upload | help | check | camera | file | person | folder | print' },
  { name: 'label', type: 'string', defaultValue: 'Accion', body: 'Etiqueta accesible; visible en extended.' },
  { name: 'actions', type: 'string (JSON)', defaultValue: 'Foto/Archivo/Ciudadano', body: 'Acciones secundarias para variant=actions.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Fuerza el speed dial abierto.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita el boton.' },
] as const;

export function buildSnippet(lang: CodeLang, example: FabExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    `icon="${example.icon ?? 'plus'}"`,
    `label="${example.label ?? 'Accion'}"`,
    example.actions ? `actions='${example.actions}'` : null,
    example.open ? 'open' : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-fab ${attrs}></gob-fab>\n`;
}

export type FabNoticeTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export type FabNotice = {
  title: string;
  description: string;
  tone: FabNoticeTone;
};

/** Mensaje distinto por cada ejemplo al pulsar el FAB principal. */
export const FAB_PRIMARY_MESSAGES: Record<string, FabNotice> = {
  basic: {
    title: 'Nuevo registro',
    description: 'Se abrio el formulario para agregar un expediente.',
    tone: 'info',
  },
  solid: {
    title: 'Modo edicion',
    description: 'Ahora puedes corregir los datos del ciudadano.',
    tone: 'info',
  },
  soft: {
    title: 'Bandeja de mensajes',
    description: 'Tienes 3 conversaciones sin leer.',
    tone: 'neutral',
  },
  tonal: {
    title: 'Enlace listo',
    description: 'Se genero un enlace seguro para compartir el folio.',
    tone: 'success',
  },
  extended: {
    title: 'Tramite iniciado',
    description: 'Folio TMP-2026-8841 creado. Completa los requisitos.',
    tone: 'success',
  },
  actions: {
    title: 'Elige una opcion',
    description: 'Abre el menu y selecciona que quieres crear.',
    tone: 'info',
  },
  'actions-open': {
    title: 'Menu activo',
    description: 'Selecciona una accion secundaria del listado.',
    tone: 'neutral',
  },
  mini: {
    title: 'Busqueda rapida',
    description: 'Escribe CURP, RFC o numero de folio.',
    tone: 'info',
  },
  outline: {
    title: 'Carga de archivo',
    description: 'Formatos permitidos: PDF, JPG o PNG (max. 10 MB).',
    tone: 'warning',
  },
  danger: {
    title: 'Reporte enviado',
    description: 'Tu incidencia quedo registrada para revision.',
    tone: 'danger',
  },
  success: {
    title: 'Todo listo',
    description: 'Los cambios se guardaron sin errores.',
    tone: 'success',
  },
  complete: {
    title: 'Centro de ayuda',
    description: 'Consulta guias, horarios y chat de orientacion.',
    tone: 'info',
  },
  sm: {
    title: 'Atajo compacto',
    description: 'Accion rapida agregada a tu barra de favoritos.',
    tone: 'success',
  },
  lg: {
    title: 'Accion destacada',
    description: 'Se priorizo esta tarea en tu bandeja de trabajo.',
    tone: 'info',
  },
  disabled: {
    title: 'No disponible',
    description: 'Este control esta bloqueado por permisos.',
    tone: 'neutral',
  },
};

/** Mensaje distinto por cada accion secundaria del speed dial. */
export const FAB_ACTION_MESSAGES: Record<string, FabNotice> = {
  camara: {
    title: 'Camara lista',
    description: 'Apunta al documento y captura la evidencia fotografica.',
    tone: 'info',
  },
  archivo: {
    title: 'Subir documento',
    description: 'Selecciona el PDF firmado desde tu dispositivo.',
    tone: 'warning',
  },
  persona: {
    title: 'Alta de ciudadano',
    description: 'Se abrio el padrón para registrar una persona nueva.',
    tone: 'success',
  },
  tramite: {
    title: 'Nuevo tramite',
    description: 'Catalogo abierto: elige el tipo de solicitud.',
    tone: 'success',
  },
  carpeta: {
    title: 'Carpeta creada',
    description: '“Expedientes 2026” ya esta disponible en tu bandeja.',
    tone: 'success',
  },
  imprimir: {
    title: 'Enviando a impresora',
    description: 'Acuse en cola. Revisa el dispositivo institucional.',
    tone: 'neutral',
  },
  compartir: {
    title: 'Compartido',
    description: 'Se envio el resumen al correo del solicitante.',
    tone: 'info',
  },
};

export function resolveFabNotice(
  exampleId: string,
  detail: {
    action?: string;
    value?: string;
    label?: string;
    item?: { id?: string; label?: string };
  },
): FabNotice {
  if (detail.action === 'menu') {
    const actionId = detail.item?.id || detail.value || '';
    return (
      FAB_ACTION_MESSAGES[actionId] || {
        title: detail.item?.label || 'Accion',
        description: 'La accion secundaria se ejecuto correctamente.',
        tone: 'success',
      }
    );
  }

  return (
    FAB_PRIMARY_MESSAGES[exampleId] || {
      title: detail.label || 'Accion',
      description: 'El boton flotante respondio al clic.',
      tone: 'info',
    }
  );
}
