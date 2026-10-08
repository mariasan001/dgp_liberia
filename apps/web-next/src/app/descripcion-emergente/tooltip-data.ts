import type { TooltipPlacement, TooltipVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type TooltipExample = {
  id: string;
  title: string;
  description: string;
  variant: TooltipVariant;
  placement?: TooltipPlacement;
  label?: string;
  trigger?: string;
  open?: boolean;
};

export const TOOLTIP_EXAMPLES: TooltipExample[] = [
  { id: 'basic', title: 'Básico', description: 'Ayuda al pasar el cursor.', variant: 'basic', label: 'Guarda los cambios del expediente.', trigger: 'Guardar', open: true },
  { id: 'soft', title: 'Suave', description: 'Fondo claro con borde.', variant: 'soft', label: 'Campo opcional del formulario.', trigger: 'Opcional', open: true },
  { id: 'solid', title: 'Solido', description: 'Fondo vino institucional.', variant: 'solid', label: 'Acción principal del flujo.', trigger: 'Continuar', open: true },
  { id: 'outline', title: 'Contorno', description: 'Burbuja clara con borde.', variant: 'outline', label: 'Revisa los requisitos antes de enviar.', trigger: 'Requisitos', open: true },
  { id: 'dense', title: 'Denso', description: 'Tipografía compacta.', variant: 'dense', label: 'Atajo rápido', trigger: 'Atajo', open: true },
  { id: 'rich', title: 'Rico', description: 'Texto un poco más largo.', variant: 'rich', label: 'Este control acepta CURP, RFC o folio institucional para localizar el registro.', trigger: 'Buscar', open: true },
  { id: 'inverse', title: 'Inverso', description: 'Sobre superficies oscuras.', variant: 'inverse', label: 'Visible sobre fondos contrastados.', trigger: 'Contraste', open: true },
  { id: 'brand', title: 'Marca', description: 'Acento vino institucional.', variant: 'brand', label: 'Identidad GobMX en ayuda contextual.', trigger: 'GobMX', open: true },
  { id: 'success', title: 'Exito', description: 'Tono positivo.', variant: 'success', label: 'Validacion correcta del campo.', trigger: 'Validado', open: true },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', label: 'Ayuda con acento dorado del sistema.', trigger: 'Ayuda', open: true },
  { id: 'bottom', title: 'Abajo', description: 'Placement inferior.', variant: 'basic', placement: 'bottom', label: 'Aparece debajo del control.', trigger: 'Abajo', open: true },
  { id: 'left', title: 'Izquierda', description: 'Placement lateral izquierdo.', variant: 'soft', placement: 'left', label: 'Anclado a la izquierda.', trigger: 'Izq.', open: true },
  { id: 'right', title: 'Derecha', description: 'Placement lateral derecho.', variant: 'outline', placement: 'right', label: 'Anclado a la derecha.', trigger: 'Der.', open: true },
];

export const TOOLTIP_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | solid | outline | dense | rich | inverse | brand | success | complete' },
  { name: 'placement', type: 'string', defaultValue: 'top', body: 'top | bottom | left | right' },
  { name: 'label', type: 'string', defaultValue: 'Ayudaâ€¦', body: 'Texto de la burbuja.' },
  { name: 'trigger', type: 'string', defaultValue: 'Pasa el cursor', body: 'Texto del control ancla.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Fuerza la burbuja visible.' },
] as const;

export function buildSnippet(lang: CodeLang, example: TooltipExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.placement && example.placement !== 'top' ? `placement="${example.placement}"` : null,
    `label="${example.label ?? 'Ayuda'}"`,
    `trigger="${example.trigger ?? 'Trigger'}"`,
    example.open ? 'open' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-tooltip ${attrs}></gob-tooltip>\n`;
}
