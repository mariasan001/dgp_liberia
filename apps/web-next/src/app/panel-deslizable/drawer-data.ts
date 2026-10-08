import type { DrawerSide, DrawerSize, DrawerVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type DrawerExample = {
  id: string;
  title: string;
  description: string;
  variant: DrawerVariant;
  side?: DrawerSide;
  size?: DrawerSize;
  drawerTitle?: string;
  drawerDescription?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const DRAWER_EXAMPLES: DrawerExample[] = [
  { id: 'basic', title: 'Basico', description: 'Panel lateral de detalle.', variant: 'basic', drawerTitle: 'Detalle del expediente', drawerDescription: 'Folio TMP-2026-4412', body: 'Solicitante, estatus y documentos asociados al tramite.', confirmLabel: 'Guardar', cancelLabel: 'Cerrar' },
  { id: 'filters', title: 'Filtros', description: 'Panel para afinar listados.', variant: 'filters', drawerTitle: 'Filtros', drawerDescription: 'Ajusta la bandeja de trabajo.', body: 'Estatus, entidad federativa, rango de fechas y tipo de tramite.', confirmLabel: 'Aplicar', cancelLabel: 'Limpiar' },
  { id: 'detail', title: 'Detalle', description: 'Lectura de registro.', variant: 'detail', drawerTitle: 'Observaciones', drawerDescription: 'Ultima revision del area.', body: 'Sin inconsistencias. Pendiente acuse de notificacion al ciudadano.', confirmLabel: 'Entendido', cancelLabel: 'Cerrar' },
  { id: 'form', title: 'Formulario', description: 'Captura corta en lateral.', variant: 'form', drawerTitle: 'Nueva nota', drawerDescription: 'Maximo 500 caracteres.', body: 'Espacio para capturar hallazgos de la revision documental.', confirmLabel: 'Agregar', cancelLabel: 'Cancelar' },
  { id: 'danger', title: 'Peligro', description: 'Accion destructiva lateral.', variant: 'danger', drawerTitle: 'Eliminar registro', drawerDescription: 'No se puede deshacer.', body: 'Se borraran evidencias, historial y acuses asociados al expediente.', confirmLabel: 'Eliminar', cancelLabel: 'Conservar' },
  { id: 'dense', title: 'Denso', description: 'Padding compacto.', variant: 'dense', drawerTitle: 'Resumen', drawerDescription: 'Vista rapida.', body: '12 coincidencias · CDMX · Abierto', confirmLabel: 'Ver', cancelLabel: 'Cerrar' },
  { id: 'left', title: 'Izquierda', description: 'Entra desde la izquierda.', variant: 'left', side: 'left', drawerTitle: 'Navegacion auxiliar', drawerDescription: 'Atajos del modulo.', body: 'Bandeja, borradores, firmas pendientes y reportes.', confirmLabel: 'Ir', cancelLabel: 'Cerrar' },
  { id: 'right', title: 'Derecha', description: 'Lado por defecto.', variant: 'right', side: 'right', drawerTitle: 'Contexto', drawerDescription: 'Informacion del ciudadano.', body: 'CURP, contacto institucional y historial de notificaciones.', confirmLabel: 'Continuar', cancelLabel: 'Cerrar' },
  { id: 'wide', title: 'Ancho', description: 'Mayor ancho de lectura.', variant: 'wide', size: 'lg', drawerTitle: 'Resumen amplio', drawerDescription: 'Vista previa antes de firmar.', body: 'Incluye requisitos validados, observaciones del area y evidencias adjuntas.', confirmLabel: 'Firmar', cancelLabel: 'Revisar' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', drawerTitle: 'Aviso oficial', drawerDescription: 'Panel con acento dorado.', body: 'Este panel usa el lenguaje visual del sistema GobMX.', confirmLabel: 'Aceptar', cancelLabel: 'Cerrar' },
  { id: 'sm', title: 'Pequeño', description: 'Ancho compacto.', variant: 'basic', size: 'sm', drawerTitle: 'Atajo', drawerDescription: 'Accion breve.', body: 'Se aplicara el filtro seleccionado.', confirmLabel: 'Si', cancelLabel: 'No' },
];

export const DRAWER_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | filters | detail | form | danger | dense | left | right | wide | complete' },
  { name: 'side', type: 'string', defaultValue: 'right', body: 'right | left' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'title', type: 'string', defaultValue: 'Detalle…', body: 'Titulo del panel.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Subtitulo de apoyo.' },
  { name: 'body', type: 'string', defaultValue: '—', body: 'Contenido principal.' },
  { name: 'confirm-label / cancel-label', type: 'string', defaultValue: 'Aplicar / Cerrar', body: 'Etiquetas de botones.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Controla la visibilidad.' },
  { name: 'preview', type: 'boolean', defaultValue: 'false', body: 'Muestra el panel en linea (docs).' },
] as const;

export function buildSnippet(lang: CodeLang, example: DrawerExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.side && example.side !== 'right' ? `side="${example.side}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.drawerTitle ? `title="${example.drawerTitle}"` : null,
    example.drawerDescription ? `description="${example.drawerDescription}"` : null,
    example.body ? `body="${example.body}"` : null,
    example.confirmLabel ? `confirm-label="${example.confirmLabel}"` : null,
    example.cancelLabel ? `cancel-label="${example.cancelLabel}"` : null,
    'open',
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-drawer ${attrs}></gob-drawer>\n`;
}
