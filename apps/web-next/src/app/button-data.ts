import type { Appearance, Tone } from '@mariasan001/ui-wc';

export type CodeLanguage = 'html' | 'react' | 'vue' | 'angular';
export type ContentMode = 'default' | 'icon' | 'icon-only';

export type ButtonAppearanceColumn = {
  id: Appearance | 'split';
  label: string;
  appearance: Appearance;
  split?: boolean;
};

export type ButtonStateRow = {
  id: 'enabled' | 'disabled' | 'hover' | 'pressed' | 'processing';
  label: string;
  disabled?: boolean;
  loading?: boolean;
  demo?: 'hover' | 'pressed';
};

export const CODE_LANGUAGES: { id: CodeLanguage; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export const TONE_OPTIONS: { id: Tone; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Vino', swatch: 'var(--gob-primary)' },
  { id: 'accent', label: 'Dorado', swatch: 'var(--gob-accent)' },
  { id: 'dark', label: 'Oscuro', swatch: 'var(--gob-text)' },
  { id: 'neutral', label: 'Neutro', swatch: 'var(--gob-surface)' },
  { id: 'soft', label: 'Suave', swatch: 'var(--gob-soft)' },
];

export const CONTENT_MODES: { id: ContentMode; label: string; desc: string }[] = [
  { id: 'default', label: 'Básico', desc: 'Etiqueta de texto sin icono.' },
  { id: 'icon', label: 'Con icono', desc: 'Icono a la izquierda junto a la etiqueta.' },
  { id: 'icon-only', label: 'Solo icono', desc: 'Botón compacto solo con icono.' },
];

export const APPEARANCE_COLUMNS: ButtonAppearanceColumn[] = [
  { id: 'solid', label: 'Relleno', appearance: 'solid' },
  { id: 'outline', label: 'Contorno', appearance: 'outline' },
  { id: 'ghost', label: 'Texto', appearance: 'ghost' },
  { id: 'split', label: 'Dividido', appearance: 'solid', split: true },
];

export const STATE_ROWS: ButtonStateRow[] = [
  { id: 'enabled', label: 'Habilitado' },
  { id: 'disabled', label: 'Deshabilitado', disabled: true },
  { id: 'hover', label: 'Hover', demo: 'hover' },
  { id: 'pressed', label: 'Presionado', demo: 'pressed' },
  { id: 'processing', label: 'Procesando', loading: true },
];

export type SnippetInput = {
  tone: Tone;
  appearance: Appearance;
  label: string;
  contentMode: ContentMode;
  disabled?: boolean;
  loading?: boolean;
  split?: boolean;
  language: CodeLanguage;
};

function attrsFor(input: SnippetInput): string {
  const parts = [
    `tone="${input.tone}"`,
    `appearance="${input.appearance}"`,
  ];

  if (input.loading) parts.push('loading');
  if (input.disabled) parts.push('disabled');
  if (input.split) parts.push('split');

  if (input.contentMode === 'icon-only') {
    parts.push('icon-only');
    parts.push('aria-label="Accion"');
  } else if (input.contentMode === 'icon') {
    parts.push('icon-position="left"');
  }

  return parts.join(' ');
}

function iconSlot(): string {
  return '<span slot="icon">+</span>';
}

export function buildSnippet(input: SnippetInput): string {
  const attrs = attrsFor(input);
  const label = input.label;
  const withIcon =
    (input.contentMode === 'icon' || input.contentMode === 'icon-only') &&
    !input.loading;

  if (input.contentMode === 'icon-only') {
    if (withIcon) {
      return `<gob-button ${attrs}>\n  ${iconSlot()}\n</gob-button>`;
    }
    return `<gob-button ${attrs}></gob-button>`;
  }

  if (input.split) {
    if (withIcon) {
      return `<gob-button ${attrs}>\n  ${iconSlot()}\n  ${label}\n</gob-button>`;
    }
    return `<gob-button ${attrs}>${label}</gob-button>`;
  }

  if (withIcon) {
    return `<gob-button ${attrs}>\n  ${iconSlot()}\n  ${label}\n</gob-button>`;
  }

  return `<gob-button ${attrs}>${label}</gob-button>`;
}
