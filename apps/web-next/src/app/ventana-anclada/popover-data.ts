import type { PopoverPlacement, PopoverVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type PopoverExample = {
  id: string;
  title: string;
  description: string;
  variant: PopoverVariant;
  placement?: PopoverPlacement;
  popoverTitle?: string;
  popoverDescription?: string;
  trigger?: string;
  open?: boolean;
};

export const POPOVER_EXAMPLES: PopoverExample[] = [
  { id: 'basic', title: 'Basico', description: 'Contenido anclado al trigger.', variant: 'basic', popoverTitle: 'Acciones', popoverDescription: 'Opciones del expediente seleccionado.', trigger: 'Abrir', open: true },
  { id: 'soft', title: 'Suave', description: 'Fondo fill institucional.', variant: 'soft', popoverTitle: 'Ayuda', popoverDescription: 'Texto breve de contexto.', trigger: 'Ayuda', open: true },
  { id: 'solid', title: 'Solido', description: 'Fondo vino institucional.', variant: 'solid', popoverTitle: 'Aviso', popoverDescription: 'Accion principal del flujo.', trigger: 'Aviso', open: true },
  { id: 'outline', title: 'Contorno', description: 'Borde con acento vino.', variant: 'outline', popoverTitle: 'Requisitos', popoverDescription: 'Revisa antes de enviar.', trigger: 'Ver', open: true },
  { id: 'dense', title: 'Denso', description: 'Padding compacto.', variant: 'dense', popoverTitle: 'Atajo', popoverDescription: 'Accion rapida.', trigger: 'Mas', open: true },
  { id: 'menu', title: 'Menu', description: 'Lista de acciones.', variant: 'menu', popoverTitle: 'Opciones', popoverDescription: 'Menu contextual.', trigger: 'Opciones', open: true },
  { id: 'rich', title: 'Rico', description: 'Texto un poco mas largo.', variant: 'rich', popoverTitle: 'Contexto', popoverDescription: 'Este control muestra informacion adicional sin salir de la vista actual del expediente.', trigger: 'Detalle', open: true },
  { id: 'brand', title: 'Marca', description: 'Acento vino institucional.', variant: 'brand', popoverTitle: 'GobMX', popoverDescription: 'Identidad del sistema.', trigger: 'Marca', open: true },
  { id: 'success', title: 'Exito', description: 'Tono positivo.', variant: 'success', popoverTitle: 'Validado', popoverDescription: 'El campo paso la revision.', trigger: 'Estado', open: true },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', popoverTitle: 'Oficial', popoverDescription: 'Popover con acento dorado.', trigger: 'Oficial', open: true },
  { id: 'top', title: 'Arriba', description: 'Placement superior.', variant: 'basic', placement: 'top', popoverTitle: 'Arriba', popoverDescription: 'Anclado hacia arriba.', trigger: 'Top', open: true },
  { id: 'left', title: 'Izquierda', description: 'Placement lateral.', variant: 'soft', placement: 'left', popoverTitle: 'Izquierda', popoverDescription: 'Anclado a la izquierda.', trigger: 'Izq.', open: true },
  { id: 'right', title: 'Derecha', description: 'Placement lateral.', variant: 'outline', placement: 'right', popoverTitle: 'Derecha', popoverDescription: 'Anclado a la derecha.', trigger: 'Der.', open: true },
];

export const POPOVER_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | solid | outline | dense | menu | rich | brand | success | complete' },
  { name: 'placement', type: 'string', defaultValue: 'bottom', body: 'top | bottom | left | right' },
  { name: 'title', type: 'string', defaultValue: 'Acciones…', body: 'Titulo del panel.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Texto de apoyo.' },
  { name: 'trigger', type: 'string', defaultValue: 'Abrir', body: 'Etiqueta del boton ancla.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Fuerza el panel visible.' },
] as const;

export function buildSnippet(lang: CodeLang, example: PopoverExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.placement && example.placement !== 'bottom' ? `placement="${example.placement}"` : null,
    `title="${example.popoverTitle ?? 'Acciones'}"`,
    `description="${example.popoverDescription ?? 'Contexto'}"`,
    `trigger="${example.trigger ?? 'Abrir'}"`,
    example.open ? 'open' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-popover ${attrs}></gob-popover>\n`;
}
