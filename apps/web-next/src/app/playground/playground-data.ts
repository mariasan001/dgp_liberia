import type { Appearance, Tone } from '@mariasan001/ui-wc';

export type PlaygroundRow = {
  label: string;
  items: Array<{
    tone: Tone;
    appearance: Appearance;
    text: string;
  }>;
};

export const playgroundRows: PlaygroundRow[] = [
  {
    label: 'Solid',
    items: [
      { tone: 'primary', appearance: 'solid', text: 'Guardar' },
      { tone: 'accent', appearance: 'solid', text: 'Enviar' },
      { tone: 'dark', appearance: 'solid', text: 'Autorizar' },
    ],
  },
  {
    label: 'Outline',
    items: [
      { tone: 'primary', appearance: 'outline', text: 'Editar' },
      { tone: 'neutral', appearance: 'outline', text: 'Revisar' },
      { tone: 'soft', appearance: 'outline', text: 'Programar' },
    ],
  },
  {
    label: 'Ghost',
    items: [
      { tone: 'primary', appearance: 'ghost', text: 'Consultar' },
      { tone: 'accent', appearance: 'ghost', text: 'Descargar' },
      { tone: 'dark', appearance: 'ghost', text: 'Cancelar' },
    ],
  },
];
