import type { FormGap, FormVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type FormExample = {
  id: string;
  title: string;
  description: string;
  variant: FormVariant;
  formTitle?: string;
  formDescription?: string;
  gap?: FormGap;
  columns?: 1 | 2 | 3;
  fields: { label: string; placeholder: string }[];
  showActions?: boolean;
};

export const FORM_EXAMPLES: FormExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Una columna limpia sin marco.',
    variant: 'basic',
    fields: [
      { label: 'Nombre', placeholder: 'Maria Sanchez' },
      { label: 'Correo', placeholder: 'maria@gob.mx' },
    ],
  },
  {
    id: 'single',
    title: 'Una columna',
    description: 'Encabezado editorial y campos en serie.',
    variant: 'single',
    formTitle: 'Alta de ciudadano',
    formDescription: 'Datos básicos del registro.',
    fields: [
      { label: 'CURP', placeholder: 'GASM850101HDFNRR09' },
      { label: 'Telefono', placeholder: '33 1234 5678' },
    ],
  },
  {
    id: 'dual',
    title: 'Dos columnas',
    description: 'Pares de campos en escritorio.',
    variant: 'dual',
    formTitle: 'Domicilio',
    formDescription: 'Se apila en movil.',
    fields: [
      { label: 'Calle', placeholder: 'Av. Juarez' },
      { label: 'Numero', placeholder: '120' },
      { label: 'Colonia', placeholder: 'Centro' },
      { label: 'CP', placeholder: '44100' },
    ],
  },
  {
    id: 'triple',
    title: 'Tres columnas',
    description: 'Fila densa de campos cortos.',
    variant: 'triple',
    formTitle: 'Fecha del documento',
    fields: [
      { label: 'Dia', placeholder: '01' },
      { label: 'Mes', placeholder: '08' },
      { label: 'Anio', placeholder: '2026' },
    ],
  },
  {
    id: 'stacked',
    title: 'Apilado',
    description: 'Mayor aire entre bloques.',
    variant: 'stacked',
    formTitle: 'Observaciones',
    formDescription: 'Para notas del revisor.',
    fields: [
      { label: 'Motivo', placeholder: 'Revisión documental' },
      { label: 'Notas', placeholder: 'Falta anexo 2' },
    ],
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Gap reducido para paneles y toolbars.',
    variant: 'dense',
    gap: 'sm',
    columns: 2,
    formTitle: 'Filtro',
    fields: [
      { label: 'Folio', placeholder: 'EXP-01' },
      { label: 'Estado', placeholder: 'En revisión' },
    ],
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Tinte vino plano, sin degradado.',
    variant: 'soft',
    formTitle: 'Filtro rápido',
    formDescription: 'Consulta por dependencia.',
    fields: [
      { label: 'Dependencia', placeholder: 'Salud' },
      { label: 'Periodo', placeholder: '2026' },
    ],
  },
  {
    id: 'card',
    title: 'Tarjeta',
    description: 'Superficie limpia con pie de acciones.',
    variant: 'card',
    formTitle: 'Solicitud',
    formDescription: 'Completa los datos del trámite.',
    fields: [
      { label: 'Tramite', placeholder: 'Licencia' },
      { label: 'Solicitante', placeholder: 'Nombre' },
    ],
    showActions: true,
  },
  {
    id: 'sections',
    title: 'Secciones',
    description: 'Título uppercase y reglas entre campos.',
    variant: 'sections',
    formTitle: 'Expediente',
    formDescription: 'Bloques separados por líneas.',
    fields: [
      { label: 'Titular', placeholder: 'Nombre del titular' },
      { label: 'Referencia', placeholder: 'OF-2026-12' },
    ],
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Panel moderno con riel dorado y acciones.',
    variant: 'complete',
    formTitle: 'Registro institucional',
    formDescription: 'Formulario de alta con validación.',
    columns: 2,
    fields: [
      { label: 'Nombre', placeholder: 'Nombre' },
      { label: 'Apellidos', placeholder: 'Apellidos' },
      { label: 'Correo', placeholder: 'correo@gob.mx' },
      { label: 'Extension', placeholder: '1234' },
    ],
    showActions: true,
  },
  {
    id: 'outline',
    title: 'Contorno',
    description: 'Marco fino sin relleno.',
    variant: 'outline',
    formTitle: 'Datos del oficio',
    formDescription: 'Captura breve del documento.',
    fields: [
      { label: 'Numero de oficio', placeholder: 'OF-2026-88' },
      { label: 'Asunto', placeholder: 'Solicitud de información' },
    ],
  },
  {
    id: 'rail',
    title: 'Riel',
    description: 'Acento vino a la izquierda.',
    variant: 'rail',
    formTitle: 'Identificacion',
    formDescription: 'Datos personales del solicitante.',
    fields: [
      { label: 'Nombre', placeholder: 'Nombre completo' },
      { label: 'CURP', placeholder: '18 caracteres' },
    ],
  },
  {
    id: 'inset',
    title: 'Inset',
    description: 'Superficie hundida plana.',
    variant: 'inset',
    formTitle: 'Contacto',
    formDescription: 'Medios de notificación.',
    fields: [
      { label: 'Correo', placeholder: 'correo@gob.mx' },
      { label: 'Telefono', placeholder: '33 0000 0000' },
    ],
  },
  {
    id: 'flat',
    title: 'Plano',
    description: 'Tipografía protagonista, sin marco.',
    variant: 'flat',
    formTitle: 'Nueva solicitud',
    formDescription: 'Empieza con lo esencial.',
    fields: [
      { label: 'Título', placeholder: 'Nombre del trámite' },
      { label: 'Descripción', placeholder: 'Breve resumen' },
    ],
  },
  {
    id: 'wide',
    title: 'Amplio',
    description: 'Dos columnas con más aire.',
    variant: 'wide',
    formTitle: 'Domicilio fiscal',
    formDescription: 'Direccion para notificaciones.',
    fields: [
      { label: 'Calle', placeholder: 'Calle' },
      { label: 'Exterior', placeholder: 'No.' },
      { label: 'Colonia', placeholder: 'Colonia' },
      { label: 'CP', placeholder: '00000' },
    ],
  },
  {
    id: 'split',
    title: 'Dividido',
    description: 'Encabezado corto y cuerpo en 2 cols.',
    variant: 'split',
    formTitle: 'Pago',
    formDescription: 'Referencia bancaria.',
    fields: [
      { label: 'Banco', placeholder: 'Institucion' },
      { label: 'CLABE', placeholder: '18 digitos' },
      { label: 'Monto', placeholder: '0.00' },
      { label: 'Concepto', placeholder: 'Concepto' },
    ],
  },
  {
    id: 'panel',
    title: 'Panel',
    description: 'Bloque institucional con barra vino.',
    variant: 'panel',
    formTitle: 'Dictamen',
    formDescription: 'Resultado de la revisión.',
    fields: [
      { label: 'Folio', placeholder: 'DIC-01' },
      { label: 'Resolucion', placeholder: 'Aprobado' },
    ],
    showActions: true,
  },
  {
    id: 'toolbar',
    title: 'Barra',
    description: 'Fila compacta tipo toolbar de filtros.',
    variant: 'toolbar',
    fields: [
      { label: 'Buscar', placeholder: 'Folio o nombre' },
      { label: 'Estado', placeholder: 'Todos' },
      { label: 'Anio', placeholder: '2026' },
    ],
    showActions: true,
  },
  {
    id: 'bleed',
    title: 'A borde',
    description: 'Lineas superior e inferior a todo el ancho.',
    variant: 'bleed',
    formTitle: 'Anexos',
    formDescription: 'Documentos del expediente.',
    fields: [
      { label: 'Tipo de anexo', placeholder: 'Identificacion' },
      { label: 'Observacion', placeholder: 'Opcional' },
    ],
    showActions: true,
  },
  {
    id: 'dashboard',
    title: 'Tablero',
    description: 'Filtros densos para consolas.',
    variant: 'dashboard',
    formTitle: 'Filtros',
    columns: 2,
    fields: [
      { label: 'Periodo', placeholder: 'Este mes' },
      { label: 'Área', placeholder: 'Todas' },
      { label: 'Estatus', placeholder: 'Activo' },
      { label: 'Responsable', placeholder: 'Cualquiera' },
    ],
    showActions: true,
  },
];

export const FORM_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | single | dual | triple | stacked | dense | soft | card | sections | complete | outline | rail | inset | flat | wide | split | panel | toolbar | bleed | dashboard',
  },
  {
    name: 'title / description',
    type: 'string',
    defaultValue: '',
    body: 'Encabezado del formulario.',
  },
  {
    name: 'columns',
    type: '1 | 2 | 3',
    defaultValue: 'auto',
    body: 'Columnas del cuerpo (dual/triple lo infieren).',
  },
  {
    name: 'gap',
    type: 'string',
    defaultValue: 'md',
    body: 'sm | md | lg',
  },
  {
    name: 'slot / slot=actions',
    type: 'node',
    defaultValue: 'â€”',
    body: 'Campos del formulario y acciones del pie.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: FormExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.formTitle ? `title="${example.formTitle}"` : null,
    example.formDescription ? `description="${example.formDescription}"` : null,
    example.gap && example.gap !== 'md' ? `gap="${example.gap}"` : null,
    example.columns ? `columns="${example.columns}"` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  const fields = example.fields
    .map(
      (field) =>
        `  <gob-form-field variant="labeled" label="${field.label}">
    <gob-input variant="basic" placeholder="${field.placeholder}"></gob-input>
  </gob-form-field>`,
    )
    .join('\n');

  const actions = example.showActions
    ? `
  <gob-button slot="actions" tone="neutral" appearance="outline">Cancelar</gob-button>
  <gob-button slot="actions" tone="primary">Guardar</gob-button>`
    : '';

  return `${imports}<gob-form ${attrs}>
${fields}${actions}
</gob-form>
`;
}
