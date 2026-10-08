import type {
  FileUploadSize,
  FileUploadStatus,
  FileUploadVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type FileUploadExample = {
  id: string;
  title: string;
  description: string;
  variant: FileUploadVariant;
  label?: string;
  helper?: string;
  hint?: string;
  accept?: string;
  status?: FileUploadStatus;
  size?: FileUploadSize;
  maxSize?: string;
  maxFiles?: number;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export const FILE_UPLOAD_EXAMPLES: FileUploadExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Zona de arrastre limpia.',
    variant: 'basic',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional arriba del control.',
    variant: 'labeled',
    label: 'Comprobante de pago',
    required: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo del control.',
    variant: 'helper',
    label: 'Identificacion oficial',
    helper: 'INE, pasaporte o cedula profesional.',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para formularios densos.',
    variant: 'dense',
    size: 'sm',
    label: 'Anexo',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo tinte vino.',
    variant: 'soft',
    label: 'Dictamen firmado',
    hint: 'Solo PDF. Maximo 5 MB.',
    accept: '.pdf,application/pdf',
    maxSize: '5mb',
  },
  {
    id: 'button',
    title: 'Boton',
    description: 'Fila compacta tipo accion.',
    variant: 'button',
    label: 'Adjunto',
  },
  {
    id: 'compact',
    title: 'Inline',
    description: 'Control corto para toolbars.',
    variant: 'compact',
  },
  {
    id: 'multiple',
    title: 'Multiple',
    description: 'Varios archivos en la misma carga.',
    variant: 'multiple',
    label: 'Expediente digital',
    multiple: true,
    maxFiles: 5,
    hint: 'Hasta 5 archivos. PDF o imagen.',
    accept: '.pdf,.png,.jpg,.jpeg,image/*',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Documento obligatorio',
    required: true,
    status: 'error',
    helper: 'Debes cargar al menos un archivo.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmacion.',
    variant: 'labeled',
    label: 'Constancia cargada',
    status: 'success',
    helper: 'Archivo listo para revision.',
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'No interactivo.',
    variant: 'labeled',
    label: 'Carga bloqueada',
    disabled: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Label + ayuda + required + info + limites.',
    variant: 'complete',
    label: 'Anexos del tramite',
    helper: 'Se validan al enviar la solicitud.',
    required: true,
    status: 'info',
    multiple: true,
    maxFiles: 3,
    maxSize: '10mb',
    accept: '.pdf,.doc,.docx',
    hint: 'PDF o Word. Maximo 10 MB por archivo.',
  },
];

export const FILE_UPLOAD_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | button | compact | multiple | complete',
  },
  {
    name: 'accept',
    type: 'string',
    defaultValue: '',
    body: 'Tipos permitidos: .pdf, image/*, etc.',
  },
  {
    name: 'multiple / max-files',
    type: 'boolean / number',
    defaultValue: 'false / ∞',
    body: 'Permite varios archivos y tope de cantidad.',
  },
  {
    name: 'max-size',
    type: 'string',
    defaultValue: '',
    body: 'Tope por archivo: 5mb, 500kb, etc.',
  },
  {
    name: 'label / hint / helper',
    type: 'string',
    defaultValue: '',
    body: 'Textos del control y de la zona de arrastre.',
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

export function buildSnippet(lang: CodeLang, example: FileUploadExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.label ? `label="${example.label}"` : null,
    example.helper ? `helper="${example.helper}"` : null,
    example.hint ? `hint="${example.hint}"` : null,
    example.accept ? `accept="${example.accept}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.maxSize ? `max-size="${example.maxSize}"` : null,
    example.maxFiles ? `max-files="${example.maxFiles}"` : null,
    example.multiple ? 'multiple' : null,
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

  return `${imports}<gob-file-upload ${attrs}></gob-file-upload>
`;
}
