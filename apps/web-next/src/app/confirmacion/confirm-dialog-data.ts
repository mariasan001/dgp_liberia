import type { ConfirmDialogVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type ConfirmDialogExample = {
  id: string;
  title: string;
  description: string;
  variant: ConfirmDialogVariant;
  dialogTitle?: string;
  dialogDescription?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const CONFIRM_DIALOG_EXAMPLES: ConfirmDialogExample[] = [
  { id: 'basic', title: 'Basico', description: 'Decision binaria neutra.', variant: 'basic', dialogTitle: 'Enviar tramite', dialogDescription: 'Una vez enviado no podras editarlo.', body: 'Se notificara al ciudadano por correo institucional.', confirmLabel: 'Enviar', cancelLabel: 'Volver' },
  { id: 'danger', title: 'Peligro', description: 'Accion destructiva.', variant: 'danger', dialogTitle: 'Eliminar expediente', dialogDescription: 'Esta accion no se puede deshacer.', body: 'Se borraran evidencias, historial y acuses asociados.', confirmLabel: 'Eliminar', cancelLabel: 'Conservar' },
  { id: 'warning', title: 'Advertencia', description: 'Riesgo reversible con cuidado.', variant: 'warning', dialogTitle: 'Cerrar sesion', dialogDescription: 'Hay cambios sin guardar.', body: 'Si sales ahora perderas el avance de la captura.', confirmLabel: 'Salir', cancelLabel: 'Seguir editando' },
  { id: 'success', title: 'Exito', description: 'Confirmacion positiva.', variant: 'success', dialogTitle: 'Publicar folio', dialogDescription: 'El tramite quedara visible.', body: 'Folio TMP-2026-4412 listo para consulta ciudadana.', confirmLabel: 'Publicar', cancelLabel: 'Revisar' },
  { id: 'info', title: 'Informacion', description: 'Aviso contextual.', variant: 'info', dialogTitle: 'Actualizar datos', dialogDescription: 'Se sincronizara con Hacienda.', body: 'La CURP y el RFC se validaran contra el padron.', confirmLabel: 'Continuar', cancelLabel: 'Cancelar' },
  { id: 'dense', title: 'Denso', description: 'Padding compacto.', variant: 'dense', dialogTitle: 'Confirmar filtro', dialogDescription: '12 resultados.', body: 'Estatus: Abierto · Entidad: CDMX', confirmLabel: 'Aplicar', cancelLabel: 'No' },
  { id: 'soft', title: 'Suave', description: 'Fondo fill institucional.', variant: 'soft', dialogTitle: 'Archivar registro', dialogDescription: 'Podras recuperarlo despues.', body: 'El expediente pasara a la bandeja de archivo.', confirmLabel: 'Archivar', cancelLabel: 'Cancelar' },
  { id: 'outline', title: 'Contorno', description: 'Borde con acento vino.', variant: 'outline', dialogTitle: 'Firmar documento', dialogDescription: 'Requiere firma electronica.', body: 'Se generara el acuse oficial del acto.', confirmLabel: 'Firmar', cancelLabel: 'Volver' },
  { id: 'brand', title: 'Marca', description: 'Acento dorado / vino.', variant: 'brand', dialogTitle: 'Aviso oficial', dialogDescription: 'Confirmacion institucional.', body: 'Este dialogo usa el lenguaje visual GobMX.', confirmLabel: 'Aceptar', cancelLabel: 'Cerrar' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', dialogTitle: 'Confirmar envio', dialogDescription: 'Ultimo paso del flujo.', body: 'El ciudadano recibira el acuse en menos de 24 horas.', confirmLabel: 'Confirmar', cancelLabel: 'Cancelar' },
];

export const CONFIRM_DIALOG_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | danger | warning | success | info | dense | soft | outline | brand | complete' },
  { name: 'title', type: 'string', defaultValue: 'Confirmar…', body: 'Titulo del dialogo.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Subtitulo de apoyo.' },
  { name: 'body', type: 'string', defaultValue: '—', body: 'Detalle del impacto.' },
  { name: 'confirm-label / cancel-label', type: 'string', defaultValue: 'Confirmar / Cancelar', body: 'Etiquetas de botones.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Controla la visibilidad.' },
  { name: 'preview', type: 'boolean', defaultValue: 'false', body: 'Muestra el dialogo en linea (docs).' },
] as const;

export function buildSnippet(lang: CodeLang, example: ConfirmDialogExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.dialogTitle ? `title="${example.dialogTitle}"` : null,
    example.dialogDescription ? `description="${example.dialogDescription}"` : null,
    example.body ? `body="${example.body}"` : null,
    example.confirmLabel ? `confirm-label="${example.confirmLabel}"` : null,
    example.cancelLabel ? `cancel-label="${example.cancelLabel}"` : null,
    'open',
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-confirm-dialog ${attrs}></gob-confirm-dialog>\n`;
}
