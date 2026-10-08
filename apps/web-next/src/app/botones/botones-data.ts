import type { Appearance, Tone } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';
export type ContentMode = 'basic' | 'with-icon' | 'icon-only';
export type ButtonState = 'enabled' | 'disabled' | 'hover' | 'pressed' | 'loading';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export const COLOR_OPTIONS: { id: Tone; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
  { id: 'dark', label: 'Dark', swatch: '#181511' },
  { id: 'neutral', label: 'Neutral', swatch: '#FFFFFF' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

export const ANATOMY_SAMPLES = [
  {
    id: 'text',
    title: 'Solo texto',
    caption: 'Relleno · etiqueta',
    appearance: 'solid' as Appearance,
    mode: 'basic' as ContentMode,
    metrics: [
      { label: 'Altura', value: '40px' },
      { label: 'Padding', value: '36px' },
      { label: 'Radio', value: '10px' },
    ],
  },
  {
    id: 'icon-text',
    title: 'Icono + texto',
    caption: 'Relleno · Phosphor thin',
    appearance: 'solid' as Appearance,
    mode: 'with-icon' as ContentMode,
    metrics: [
      { label: 'Altura', value: '40px' },
      { label: 'Padding', value: '28px' },
      { label: 'Gap icono', value: '6px' },
    ],
  },
  {
    id: 'outline',
    title: 'Contorno',
    caption: 'Borde · sin relleno',
    appearance: 'outline' as Appearance,
    mode: 'basic' as ContentMode,
    metrics: [
      { label: 'Altura', value: '40px' },
      { label: 'Padding', value: '36px' },
      { label: 'Borde', value: '1.5px' },
    ],
  },
] as const;

/** Exact matrix from the design before the bad rewrites. */
export const MATRIX_COLUMNS: { id: string; title: string; appearance: Appearance }[] = [
  { id: 'relleno', title: 'Relleno', appearance: 'solid' },
  { id: 'contorno', title: 'Contorno', appearance: 'outline' },
  { id: 'texto', title: 'Texto', appearance: 'ghost' },
  { id: 'dividido', title: 'Dividido', appearance: 'divided' },
];

export const MATRIX_ROWS: { id: ButtonState; title: string }[] = [
  { id: 'enabled', title: 'Habilitado' },
  { id: 'disabled', title: 'Deshabilitado' },
  { id: 'hover', title: 'Hover' },
  { id: 'pressed', title: 'Presionado' },
  { id: 'loading', title: 'Procesando' },
];

export const CONTENT_SECTIONS: {
  id: ContentMode;
  title: string;
  description: string;
}[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Solo etiqueta. Uso principal en formularios y acciones de bandeja.',
  },
  {
    id: 'with-icon',
    title: 'Con icono',
    description:
      'Phosphor Plus thin en slot="icon", a la izquierda, con el mismo label Aceptar.',
  },
  {
    id: 'icon-only',
    title: 'Solo icono',
    description: 'Accion compacta con Phosphor thin. En procesando solo se muestra el spinner.',
  },
];

function iconMarkup(lang: CodeLang): string {
  if (lang === 'html') {
    return `<i class="ph-thin ph-plus" slot="icon" aria-hidden="true"></i>`;
  }
  if (lang === 'react') {
    return `<span slot="icon" aria-hidden="true">
    <Plus weight="thin" size={16} />
  </span>`;
  }
  if (lang === 'vue') {
    return `<PhPlus slot="icon" weight="thin" :size="16" aria-hidden="true" />`;
  }
  return `<ph-plus slot="icon" weight="thin" size="16" aria-hidden="true"></ph-plus>`;
}

function iconImport(lang: CodeLang): string {
  if (lang === 'html') {
    return `<!-- Requiere Phosphor thin -->
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css"
/>

`;
  }
  if (lang === 'react') {
    return `import { Plus } from '@phosphor-icons/react';

`;
  }
  if (lang === 'vue') {
    return `import { PhPlus } from '@phosphor-icons/vue';

`;
  }
  return `import '@phosphor-icons/webcomponents/PhPlus';

`;
}

export function buildSnippet(opts: {
  lang: CodeLang;
  tone: Tone;
  appearance: Appearance;
  mode: ContentMode;
  state: ButtonState;
}) {
  const loading = opts.state === 'loading' ? ' loading' : '';
  const disabled = opts.state === 'disabled' ? ' disabled' : '';
  const demo =
    opts.state === 'hover' || opts.state === 'pressed'
      ? ` demo-state="${opts.state}"`
      : '';
  const base = `<gob-button tone="${opts.tone}" appearance="${opts.appearance}"${loading}${disabled}${demo}`;
  const icon = iconMarkup(opts.lang);
  const note =
    opts.state === 'hover' || opts.state === 'pressed'
      ? '\n<!-- demo-state solo para docs; en app usa hover/active CSS nativo -->'
      : '';

  if (opts.lang === 'react') {
    const reactBase = `<gob-button tone="${opts.tone}" appearance="${opts.appearance}"${loading}${disabled}${demo}`;
    if (opts.mode === 'icon-only') {
      return `import { Plus } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';
${note ? '// demo-state solo para docs; en app usa hover/active CSS nativo\n' : ''}
export function Boton() {
  return (
    ${reactBase} icon-only aria-label="Aceptar" onClick={() => console.log('Aceptar')}>
      <Plus weight="thin" size={16} slot="icon" />
    </gob-button>
  );
}`;
    }
    if (opts.mode === 'with-icon') {
      return `import { Plus } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

export function Boton() {
  return (
    ${reactBase} icon-position="left" onClick={() => console.log('Aceptar')}>
      <Plus weight="thin" size={16} slot="icon" />
      Aceptar
    </gob-button>
  );
}`;
    }
    return `import '@mariasan001/ui-wc';

export function Boton() {
  return (
    ${reactBase} onClick={() => console.log('Aceptar')}>
      Aceptar
    </gob-button>
  );
}`;
  }

  if (opts.mode === 'icon-only') {
    return `${iconImport(opts.lang)}${base} icon-only aria-label="Aceptar">
  ${icon}
</gob-button>${note}`;
  }

  if (opts.mode === 'with-icon') {
    return `${iconImport(opts.lang)}${base} icon-position="left">
  ${icon}
  Aceptar
</gob-button>${note}`;
  }

  return `${base}>Aceptar</gob-button>${note}`;
}
