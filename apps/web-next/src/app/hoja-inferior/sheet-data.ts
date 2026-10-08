import type { SheetVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type SheetExample = {
  id: string;
  title: string;
  description: string;
  variant: SheetVariant;
  sheetTitle?: string;
  sheetDescription?: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const SHEET_EXAMPLES: SheetExample[] = [
  { id: 'basic', title: 'Basico', description: 'Hoja inferior estandar.', variant: 'basic', sheetTitle: 'Acciones rapidas', sheetDescription: 'Elige que hacer con el registro.', body: 'Imprimir, compartir o archivar el expediente actual.', confirmLabel: 'Continuar', cancelLabel: 'Cerrar' },
  { id: 'actions', title: 'Acciones', description: 'Lista de atajos.', variant: 'actions', sheetTitle: 'Mas opciones', sheetDescription: 'Acciones frecuentes en movil.', body: 'Selecciona una accion para el folio activo.', confirmLabel: 'Listo', cancelLabel: 'Cancelar' },
  { id: 'form', title: 'Formulario', description: 'Captura corta desde abajo.', variant: 'form', sheetTitle: 'Agregar nota', sheetDescription: 'Maximo 500 caracteres.', body: 'Espacio para notas del revisor en campo.', confirmLabel: 'Agregar', cancelLabel: 'Cerrar' },
  { id: 'danger', title: 'Peligro', description: 'Confirmacion destructiva.', variant: 'danger', sheetTitle: 'Eliminar expediente', sheetDescription: 'Esta accion no se puede deshacer.', body: 'Se borraran evidencias, historial y acuses asociados.', confirmLabel: 'Eliminar', cancelLabel: 'Conservar' },
  { id: 'success', title: 'Exito', description: 'Cierre positivo.', variant: 'success', sheetTitle: 'Tramite publicado', sheetDescription: 'El folio ya es visible.', body: 'Folio TMP-2026-4412 listo para consulta ciudadana.', confirmLabel: 'Entendido', cancelLabel: 'Cerrar' },
  { id: 'dense', title: 'Denso', description: 'Padding compacto.', variant: 'dense', sheetTitle: 'Filtros', sheetDescription: '12 resultados.', body: 'Estatus: Abierto · Entidad: CDMX', confirmLabel: 'Ver', cancelLabel: 'Limpiar' },
  { id: 'peek', title: 'Peek', description: 'Altura reducida.', variant: 'peek', sheetTitle: 'Atajo', sheetDescription: 'Vista parcial.', body: 'Desliza para ver mas opciones del modulo.', confirmLabel: 'Abrir', cancelLabel: 'Cerrar' },
  { id: 'tall', title: 'Alta', description: 'Mayor altura util.', variant: 'tall', sheetTitle: 'Detalle movil', sheetDescription: 'Contenido amplio.', body: 'Resumen del solicitante, requisitos validados y observaciones del area operativa.', confirmLabel: 'Continuar', cancelLabel: 'Volver' },
  { id: 'brand', title: 'Marca', description: 'Acento dorado / vino.', variant: 'brand', sheetTitle: 'Aviso GobMX', sheetDescription: 'Identidad institucional.', body: 'Hoja inferior con acento de marca del sistema.', confirmLabel: 'Aceptar', cancelLabel: 'Cerrar' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', sheetTitle: 'Confirmacion oficial', sheetDescription: 'Cierre con acento dorado.', body: 'Este dialogo inferior usa el lenguaje visual GobMX.', confirmLabel: 'Confirmar', cancelLabel: 'Cancelar' },
];

export const SHEET_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | actions | form | danger | success | dense | peek | tall | brand | complete' },
  { name: 'title', type: 'string', defaultValue: 'Acciones…', body: 'Titulo de la hoja.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Subtitulo de apoyo.' },
  { name: 'body', type: 'string', defaultValue: '—', body: 'Contenido principal.' },
  { name: 'confirm-label / cancel-label', type: 'string', defaultValue: 'Continuar / Cerrar', body: 'Etiquetas de botones.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Controla la visibilidad.' },
  { name: 'preview', type: 'boolean', defaultValue: 'false', body: 'Muestra la hoja en linea (docs).' },
] as const;

export function buildSnippet(lang: CodeLang, example: SheetExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.sheetTitle ? `title="${example.sheetTitle}"` : null,
    example.sheetDescription ? `description="${example.sheetDescription}"` : null,
    example.body ? `body="${example.body}"` : null,
    example.confirmLabel ? `confirm-label="${example.confirmLabel}"` : null,
    example.cancelLabel ? `cancel-label="${example.cancelLabel}"` : null,
    'open',
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-sheet ${attrs}></gob-sheet>\n`;
}
