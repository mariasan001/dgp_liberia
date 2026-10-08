import type { SwitchSize, SwitchStatus, SwitchVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type SwitchExample = {
  id: string;
  title: string;
  description: string;
  variant: SwitchVariant;
  label?: string;
  descriptionText?: string;
  helper?: string;
  status?: SwitchStatus;
  size?: SwitchSize;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  children?: string;
};

export const SWITCH_EXAMPLES: SwitchExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Interruptor limpio con label.',
    variant: 'basic',
    children: 'Notificaciones push',
  },
  {
    id: 'labeled',
    title: 'Con descripcion',
    description: 'Titulo + texto de apoyo.',
    variant: 'labeled',
    label: 'Modo oscuro',
    descriptionText: 'Ajusta el contraste de la consola.',
    checked: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Mensaje debajo del control.',
    variant: 'helper',
    label: 'Firma automatica',
    helper: 'Aplica e.firma al emitir el oficio.',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para listas densas.',
    variant: 'dense',
    size: 'sm',
    children: 'Recordatorios',
    checked: true,
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo tinte vino. Ideal para grupos.',
    variant: 'soft',
    label: 'Alerta de vencimiento',
    descriptionText: 'Avisa 24 h antes del plazo.',
  },
  {
    id: 'card',
    title: 'Tarjeta',
    description: 'Fila seleccionable con borde y anillo.',
    variant: 'card',
    label: 'Publicar en portal',
    descriptionText: 'El ciudadano vera el acuerdo publicado.',
    checked: true,
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Contorno redondeado tipo chip.',
    variant: 'pill',
    children: 'Prioridad urgente',
  },
  {
    id: 'tile',
    title: 'Baldosa',
    description: 'Switch a la derecha, acento dorado.',
    variant: 'tile',
    label: 'Requiere doble factor',
    descriptionText: 'Confirma con token institucional.',
    checked: true,
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Acepto el tratamiento de datos',
    required: true,
    status: 'error',
    helper: 'Debes activar esta opcion para continuar.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmacion.',
    variant: 'card',
    label: 'Sincronizacion activa',
    descriptionText: 'Los cambios se replican al instante.',
    checked: true,
    status: 'success',
    helper: 'Preferencia guardada.',
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'No interactivo.',
    variant: 'basic',
    children: 'Opcion bloqueada',
    checked: true,
    disabled: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Card + ayuda + required + info.',
    variant: 'complete',
    label: 'Compartir con otra dependencia',
    descriptionText: 'Solo personal autorizado vera el folio.',
    helper: 'Puedes desactivar el acceso despues.',
    required: true,
    status: 'info',
  },
];

export const SWITCH_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | card | pill | tile | complete',
  },
  {
    name: 'label / description / helper',
    type: 'string',
    defaultValue: '',
    body: 'Textos del control. El slot tambien puede ser el label.',
  },
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Estado encendido del interruptor.',
  },
  {
    name: 'status',
    type: 'string',
    defaultValue: 'default',
    body: 'Semaforo: default | error | success | warning | info.',
  },
  {
    name: 'size',
    type: 'string',
    defaultValue: 'md',
    body: 'sm | md | lg',
  },
  {
    name: 'disabled / required',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Estados nativos del control.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: SwitchExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.label ? `label="${example.label}"` : null,
    example.descriptionText
      ? `description="${example.descriptionText}"`
      : null,
    example.helper ? `helper="${example.helper}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.checked ? 'checked' : null,
    example.required ? 'required' : null,
    example.disabled ? 'disabled' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  const body = example.children || '';
  return `${imports}<gob-switch ${attrs}>${body}</gob-switch>
`;
}
