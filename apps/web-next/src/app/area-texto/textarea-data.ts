import type {
  TextareaSize,
  TextareaStatus,
  TextareaVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type TextareaExample = {
  id: string;
  title: string;
  description: string;
  variant: TextareaVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: TextareaStatus;
  size?: TextareaSize;
  rows?: number;
  maxlength?: number;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export const TEXTAREA_EXAMPLES: TextareaExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Área limpia sin etiqueta.',
    variant: 'basic',
    placeholder: 'Escribe tus notasâ€¦',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional arriba del control.',
    variant: 'labeled',
    label: 'Observaciones',
    placeholder: 'Describe el hallazgoâ€¦',
    required: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo del campo.',
    variant: 'helper',
    label: 'Motivo',
    placeholder: 'Explica el motivo de la solicitud',
    helper: 'Maximo 3 parrafos. Evita datos sensibles.',
  },
  {
    id: 'counter',
    title: 'Contador',
    description: 'Limite de caracteres con aviso visual.',
    variant: 'counter',
    label: 'Resumen ejecutivo',
    placeholder: 'Sintetiza el casoâ€¦',
    maxlength: 160,
    value: 'Dictamen favorable con observaciones menores.',
  },
  {
    id: 'auto',
    title: 'Autocreciente',
    description: 'Crece con el contenido. Ideal para comentarios.',
    variant: 'auto',
    label: 'Comentario',
    placeholder: 'Escribe y el area se expandeâ€¦',
    rows: 2,
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para formularios densos.',
    variant: 'dense',
    label: 'Nota interna',
    placeholder: 'Breveâ€¦',
    size: 'sm',
  },
  {
    id: 'filled',
    title: 'Relleno',
    description: 'Fondo suave sin borde duro hasta el foco.',
    variant: 'filled',
    label: 'Descripción',
    placeholder: 'Detalle del trámiteâ€¦',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Tinte vino ligero. Aspecto contemporaneo.',
    variant: 'soft',
    label: 'Justificacion',
    placeholder: 'Fundamento normativoâ€¦',
  },
  {
    id: 'floating',
    title: 'Flotante',
    description: 'Label dentro del area que sube al enfocar.',
    variant: 'floating',
    label: 'Mensaje al ciudadano',
    placeholder: ' ',
  },
  {
    id: 'resize',
    title: 'Redimensionable',
    description: 'El usuario ajusta la altura con el handle nativo.',
    variant: 'resize',
    label: 'Bitacora',
    placeholder: 'Arrastra la esquina inferiorâ€¦',
    rows: 3,
  },
  {
    id: 'code',
    title: 'Código',
    description: 'Monoespaciado oscuro para payloads o JSON.',
    variant: 'code',
    label: 'Payload',
    placeholder: '{ "folio": "EXP-2026" }',
    helper: 'Solo para notas tecnicas.',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Fundamento',
    value: 'ok',
    status: 'error',
    helper: 'El fundamento es demasiado corto.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmación.',
    variant: 'helper',
    label: 'Dictamen',
    value: 'Se autoriza el trámite conforme al expediente.',
    status: 'success',
    helper: 'Texto validado.',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Label, ayuda, contador y required.',
    variant: 'complete',
    label: 'Resolucion',
    placeholder: 'Redacta la resolucion finalâ€¦',
    helper: 'Quien firma el dictamen revisara este texto.',
    required: true,
    maxlength: 400,
    status: 'info',
  },
];

export const TEXTAREA_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | counter | auto | dense | filled | soft | floating | resize | code | complete',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    body: 'Etiqueta visible del area.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '',
    body: 'Texto placeholder del textarea nativo.',
  },
  {
    name: 'helper',
    type: 'string',
    defaultValue: '',
    body: 'Ayuda o mensaje de validación.',
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
    name: 'rows / maxlength',
    type: 'number',
    defaultValue: '4 / â€”',
    body: 'Filas iniciales y limite de caracteres (activa contador).',
  },
  {
    name: 'disabled / readonly / required',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Estados nativos del control.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: TextareaExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.label ? `label="${example.label}"` : null,
    example.placeholder ? `placeholder="${example.placeholder}"` : null,
    example.helper ? `helper="${example.helper}"` : null,
    example.value ? `value="${example.value}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.rows ? `rows="${example.rows}"` : null,
    example.maxlength ? `maxlength="${example.maxlength}"` : null,
    example.required ? 'required' : null,
    example.disabled ? 'disabled' : null,
    example.readonly ? 'readonly' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-textarea ${attrs}></gob-textarea>
`;
}
