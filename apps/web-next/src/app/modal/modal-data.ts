import type { ModalSize, ModalVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type ModalExample = {
  id: string;
  title: string;
  description: string;
  variant: ModalVariant;
  size?: ModalSize;
  modalTitle?: string;
  modalDescription?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const MODAL_EXAMPLES: ModalExample[] = [
  { id: 'basic', title: 'Basico', description: 'Confirmacion corta.', variant: 'basic', modalTitle: 'Guardar cambios', modalDescription: 'Se actualizaran los datos del expediente.', body: 'Los campos editados quedaran disponibles de inmediato en la bandeja.', confirmLabel: 'Guardar', cancelLabel: 'Cancelar' },
  { id: 'confirm', title: 'Confirmacion', description: 'Decision binaria.', variant: 'confirm', modalTitle: 'Enviar tramite', modalDescription: 'Una vez enviado no podras editarlo.', body: 'Se notificara al ciudadano por correo institucional.', confirmLabel: 'Enviar', cancelLabel: 'Volver' },
  { id: 'form', title: 'Formulario', description: 'Contenido de captura corta.', variant: 'form', modalTitle: 'Agregar observacion', modalDescription: 'Describe el hallazgo de la revision.', body: 'Espacio para notas del revisor (max. 500 caracteres).', confirmLabel: 'Agregar', cancelLabel: 'Cerrar' },
  { id: 'danger', title: 'Peligro', description: 'Accion destructiva.', variant: 'danger', modalTitle: 'Eliminar expediente', modalDescription: 'Esta accion no se puede deshacer.', body: 'Se borraran evidencias, historial y acuses asociados.', confirmLabel: 'Eliminar', cancelLabel: 'Conservar' },
  { id: 'success', title: 'Exito', description: 'Cierre positivo.', variant: 'success', modalTitle: 'Tramite publicado', modalDescription: 'El folio ya es visible para el ciudadano.', body: 'Folio TMP-2026-4412 listo para consulta.', confirmLabel: 'Entendido', cancelLabel: 'Cerrar' },
  { id: 'dense', title: 'Denso', description: 'Padding compacto.', variant: 'dense', modalTitle: 'Filtros aplicados', modalDescription: '12 resultados coinciden.', body: 'Estatus: Abierto · Entidad: CDMX', confirmLabel: 'Ver lista', cancelLabel: 'Limpiar' },
  { id: 'center', title: 'Centrado', description: 'Dialogo estandar centrado.', variant: 'center', modalTitle: 'Sesion por expirar', modalDescription: 'Quedan 2 minutos de actividad.', body: 'Guarda tu avance para no perder la captura.', confirmLabel: 'Extender', cancelLabel: 'Salir' },
  { id: 'sheet', title: 'Hoja', description: 'Estilo inferior tipo movil.', variant: 'sheet', modalTitle: 'Acciones rapidas', modalDescription: 'Elige que hacer con el registro.', body: 'Imprimir, compartir o archivar el expediente actual.', confirmLabel: 'Continuar', cancelLabel: 'Cerrar' },
  { id: 'wide', title: 'Ancho', description: 'Mayor ancho de lectura.', variant: 'wide', size: 'lg', modalTitle: 'Resumen del expediente', modalDescription: 'Vista previa antes de firmar.', body: 'Incluye datos del solicitante, requisitos validados y observaciones del area.', confirmLabel: 'Firmar', cancelLabel: 'Revisar' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', modalTitle: 'Aviso oficial', modalDescription: 'Confirmacion con acento dorado.', body: 'Este dialogo usa el lenguaje visual del sistema GobMX.', confirmLabel: 'Aceptar', cancelLabel: 'Cerrar' },
  { id: 'sm', title: 'Pequeño', description: 'Tamano compacto.', variant: 'basic', size: 'sm', modalTitle: 'Confirmar', modalDescription: 'Accion breve.', body: 'Se aplicara el filtro seleccionado.', confirmLabel: 'Si', cancelLabel: 'No' },
];

export const MODAL_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | confirm | form | danger | success | dense | center | sheet | wide | complete' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'title', type: 'string', defaultValue: 'Confirmar…', body: 'Titulo del dialogo.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Subtitulo de apoyo.' },
  { name: 'body', type: 'string', defaultValue: '—', body: 'Contenido principal del dialogo.' },
  { name: 'confirm-label / cancel-label', type: 'string', defaultValue: 'Confirmar / Cancelar', body: 'Etiquetas de botones.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Controla la visibilidad.' },
  { name: 'preview', type: 'boolean', defaultValue: 'false', body: 'Muestra el dialogo en linea (docs / demos).' },
] as const;

export function buildSnippet(lang: CodeLang, example: ModalExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.modalTitle ? `title="${example.modalTitle}"` : null,
    example.modalDescription ? `description="${example.modalDescription}"` : null,
    example.body ? `body="${example.body}"` : null,
    example.confirmLabel ? `confirm-label="${example.confirmLabel}"` : null,
    example.cancelLabel ? `cancel-label="${example.cancelLabel}"` : null,
    'open',
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-modal ${attrs}></gob-modal>\n`;
}
