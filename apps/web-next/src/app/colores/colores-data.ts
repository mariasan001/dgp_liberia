export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type ColorSwatch = {
  id: string;
  name: string;
  role: string;
  hex: string;
  token: string;
  onDark?: boolean;
};

export const BRAND_COLORS: ColorSwatch[] = [
  {
    id: 'primary',
    name: 'Primary',
    role: 'Acción principal Â· marca',
    hex: '#9F2141',
    token: '--gob-primary',
    onDark: true,
  },
  {
    id: 'primary-hover',
    name: 'Primary hover',
    role: 'Hover / pressed de marca',
    hex: '#861B36',
    token: '--gob-primary-hover',
    onDark: true,
  },
  {
    id: 'primary-soft',
    name: 'Primary soft',
    role: 'Fondos suaves de marca',
    hex: 'rgba(159, 33, 65, 0.12)',
    token: '--gob-primary-soft',
  },
  {
    id: 'accent',
    name: 'Accent',
    role: 'Acento dorado institucional',
    hex: '#BC945A',
    token: '--gob-accent',
    onDark: true,
  },
  {
    id: 'accent-soft',
    name: 'Accent soft',
    role: 'Fondos suaves de acento',
    hex: 'rgba(188, 148, 90, 0.18)',
    token: '--gob-accent-soft',
  },
  {
    id: 'soft',
    name: 'Soft',
    role: 'Superficie calida secundaria',
    hex: '#E7D7BD',
    token: '--gob-soft',
  },
  {
    id: 'neutral',
    name: 'Neutral',
    role: 'Neutro de apoyo',
    hex: '#E3DCD0',
    token: '--gob-neutral',
  },
  {
    id: 'dark',
    name: 'Dark',
    role: 'Texto / contraste fuerte',
    hex: '#181511',
    token: '--gob-text',
    onDark: true,
  },
];

export const SURFACE_COLORS: ColorSwatch[] = [
  {
    id: 'bg',
    name: 'Canvas',
    role: 'Fondo de página',
    hex: '#FAFAFA',
    token: '--gob-bg',
  },
  {
    id: 'surface',
    name: 'Surface',
    role: 'Tarjetas y paneles',
    hex: '#FFFFFF',
    token: '--gob-surface',
  },
  {
    id: 'surface-muted',
    name: 'Surface muted',
    role: 'Zonas secundarias',
    hex: '#F8F5EF',
    token: '--gob-surface-muted',
  },
  {
    id: 'border',
    name: 'Border',
    role: 'Bordes y divisores',
    hex: 'rgba(24, 21, 17, 0.10)',
    token: '--gob-border',
  },
];

export const TEXT_COLORS: ColorSwatch[] = [
  {
    id: 'text',
    name: 'Texto',
    role: 'Titulos y cuerpo principal',
    hex: '#181511',
    token: '--gob-text',
    onDark: true,
  },
  {
    id: 'text-muted',
    name: 'Texto muted',
    role: 'Descripciones y apoyo',
    hex: 'rgba(24, 21, 17, 0.68)',
    token: '--gob-text-muted',
  },
  {
    id: 'text-subtle',
    name: 'Texto subtle',
    role: 'Hints y metadatos',
    hex: 'rgba(24, 21, 17, 0.50)',
    token: '--gob-text-subtle',
  },
  {
    id: 'on-primary',
    name: 'Sobre primary',
    role: 'Texto sobre vino',
    hex: '#FFFFFF',
    token: '--gob-primary-contrast',
  },
];

export type SemaphoreColor = ColorSwatch & {
  meaning: string;
  doUse: string;
  dontUse: string;
  bgToken: string;
  bgHex: string;
};

export const SEMAPHORE_COLORS: SemaphoreColor[] = [
  {
    id: 'success',
    name: 'Success',
    role: 'Verde Â· correcto',
    hex: '#1F8A55',
    token: '--gob-success',
    bgToken: '--gob-success-bg',
    bgHex: 'rgba(31, 138, 85, 0.14)',
    onDark: true,
    meaning: 'Exito, confirmación, estado activo positivo.',
    doUse: 'Guardado, aprobado, disponible, validación ok.',
    dontUse: 'No usar como color de marca ni en CTAs primarios.',
  },
  {
    id: 'warning',
    name: 'Warning',
    role: 'Ambar Â· atencion',
    hex: '#D0921A',
    token: '--gob-warning',
    bgToken: '--gob-warning-bg',
    bgHex: 'rgba(208, 146, 26, 0.16)',
    onDark: true,
    meaning: 'Precaucion, pendiente o riesgo moderado.',
    doUse: 'Campos incompletos, vencimientos proximos, avisos.',
    dontUse: 'No sustituye a danger cuando hay error critico.',
  },
  {
    id: 'danger',
    name: 'Danger',
    role: 'Rojo Â· critico',
    hex: '#C62828',
    token: '--gob-danger',
    bgToken: '--gob-danger-bg',
    bgHex: 'rgba(198, 40, 40, 0.12)',
    onDark: true,
    meaning: 'Error, rechazo, acción destructiva o bloqueo.',
    doUse: 'Errores de formulario, eliminar, denegado.',
    dontUse: 'No saturar la UI: reservar para estados reales de fallo. Distinto del primary de marca.',
  },
  {
    id: 'info',
    name: 'Info',
    role: 'Azul Â· informativo',
    hex: '#2F5F8A',
    token: '--gob-info',
    bgToken: '--gob-info-bg',
    bgHex: 'rgba(47, 95, 138, 0.12)',
    onDark: true,
    meaning: 'Informacion neutra, ayuda contextual.',
    doUse: 'Tips, notas, estados informativos sin urgencia.',
    dontUse: 'No competir con primary para acciones principales.',
  },
];

export const COLOR_RULES = [
  {
    id: 'brand',
    index: '01',
    title: 'Marca primero',
    body: 'Primary (#9F2141) concentra la acción principal. Accent (#BC945A) apoya, no reemplaza.',
  },
  {
    id: 'semaphore',
    index: '02',
    title: 'Semaforo con sentido',
    body: 'Success, warning, danger e info comunican estado. Danger (#C62828) es distinto del primary de marca (#9F2141).',
  },
  {
    id: 'contrast',
    index: '03',
    title: 'Contraste legible',
    body: 'Texto sobre primary/accent/dark va en blanco. Sobre soft/neutral/surface va en negro o muted.',
  },
  {
    id: 'soft',
    index: '04',
    title: 'Soft para fondos',
    body: 'Las variantes soft (*-soft / *-bg) son para chips, alerts y fondos. No para texto ni iconos críticos.',
  },
  {
    id: 'tokens',
    index: '05',
    title: 'Usar tokens',
    body: 'Preferir variables CSS (--gob-*) sobre hex sueltos para mantener la escala alineada.',
  },
  {
    id: 'type',
    index: '06',
    title: 'Tipografía aparte',
    body: 'En tipografía de lectura solo negro y gris claro. El color de marca vive en acciones y estados.',
  },
] as const;

export function buildColorSnippet(opts: {
  lang: CodeLang;
  token: string;
  hex: string;
}) {
  if (opts.lang === 'react') {
    return `style={{ color: 'var(${opts.token})' }} // ${opts.hex}`;
  }

  if (opts.lang === 'vue' || opts.lang === 'angular') {
    return `[style.color]="'var(${opts.token})'" <!-- ${opts.hex} -->`;
  }

  return `color: var(${opts.token}); /* ${opts.hex} */`;
}
