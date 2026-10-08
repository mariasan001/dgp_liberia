export type CodeLang = 'html' | 'react' | 'vue' | 'angular';
export type TypeTone = 'ink' | 'mute';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

/** Tipografia solo admite negro y gris claro. */
export const TONE_OPTIONS: { id: TypeTone; label: string; swatch: string; color: string }[] = [
  { id: 'ink', label: 'Negro', swatch: '#181511', color: '#181511' },
  { id: 'mute', label: 'Gris claro', swatch: '#B8B4AE', color: '#9A9590' },
];

export type TypeLevel = {
  id: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  title: string;
  caption: string;
  sample: string;
  size: string;
  weight: string;
  line: string;
  tracking: string;
};

export const HEADING_SCALE: TypeLevel[] = [
  {
    id: 'h1',
    tag: 'h1',
    title: 'H1',
    caption: 'Titulo de pagina',
    sample: 'Titulo principal de la pagina',
    size: '48px',
    weight: '500',
    line: '1.1',
    tracking: '-0.03em',
  },
  {
    id: 'h2',
    tag: 'h2',
    title: 'H2',
    caption: 'Seccion',
    sample: 'Titulo de seccion',
    size: '36px',
    weight: '500',
    line: '1.15',
    tracking: '-0.02em',
  },
  {
    id: 'h3',
    tag: 'h3',
    title: 'H3',
    caption: 'Subseccion',
    sample: 'Subtitulo de bloque',
    size: '28px',
    weight: '500',
    line: '1.2',
    tracking: '-0.015em',
  },
  {
    id: 'h4',
    tag: 'h4',
    title: 'H4',
    caption: 'Grupo',
    sample: 'Encabezado de grupo',
    size: '22px',
    weight: '500',
    line: '1.25',
    tracking: '-0.01em',
  },
  {
    id: 'h5',
    tag: 'h5',
    title: 'H5',
    caption: 'Etiqueta fuerte',
    sample: 'Etiqueta de contenido',
    size: '18px',
    weight: '500',
    line: '1.35',
    tracking: '0',
  },
  {
    id: 'h6',
    tag: 'h6',
    title: 'H6',
    caption: 'Micro titulo',
    sample: 'Micro titulo o overline',
    size: '14px',
    weight: '600',
    line: '1.4',
    tracking: '0.06em',
  },
];

export const BODY_SCALE: TypeLevel[] = [
  {
    id: 'lead',
    tag: 'p',
    title: 'Lead',
    caption: 'Introduccion',
    sample:
      'Resumen breve bajo el titulo. Sirve para orientar al usuario sin competir con el H1.',
    size: '18px',
    weight: '400',
    line: '1.6',
    tracking: '0',
  },
  {
    id: 'body',
    tag: 'p',
    title: 'Body',
    caption: 'Parrafo estandar',
    sample:
      'Parrafo de lectura continua para avisos, ayudas y textos de formularios institucionales.',
    size: '16px',
    weight: '400',
    line: '1.65',
    tracking: '0',
  },
  {
    id: 'small',
    tag: 'p',
    title: 'Small',
    caption: 'Apoyo',
    sample: 'Notas, metadatos y texto secundario junto a campos o tablas.',
    size: '14px',
    weight: '400',
    line: '1.55',
    tracking: '0',
  },
  {
    id: 'caption',
    tag: 'span',
    title: 'Caption',
    caption: 'Pie / hint',
    sample: 'Version 1.0 · Libreria Gob_v2',
    size: '12px',
    weight: '500',
    line: '1.45',
    tracking: '0.02em',
  },
];

export const RULES = [
  {
    id: 'family',
    index: '01',
    title: 'Familia',
    body: 'Usar Gotham en toda la interfaz. Si no esta disponible, caer a Raleway y luego al stack del sistema.',
  },
  {
    id: 'color',
    index: '02',
    title: 'Color',
    body: 'Solo negro (#181511) para texto principal y gris claro (#9A9590) para apoyo. Sin vino, dorado ni acentos en tipografia.',
  },
  {
    id: 'weight',
    index: '03',
    title: 'Peso',
    body: 'Preferir 400 y 500. Reservar 600 para H6/overlines. Evitar 700–900 para no perder la sensacion delgada.',
  },
  {
    id: 'hierarchy',
    index: '04',
    title: 'Jerarquia',
    body: 'Un solo H1 por vista. H2 abre secciones. H3–H6 ordenan bloques. El parrafo nunca compite con el titulo.',
  },
  {
    id: 'space',
    index: '05',
    title: 'Aire',
    body: 'Dejar respirar entre niveles: mas espacio antes de un H2 que entre un H3 y su parrafo.',
  },
  {
    id: 'length',
    index: '06',
    title: 'Medida',
    body: 'Cuerpo entre 55 y 70 caracteres por linea. Titulos cortos, una idea por linea.',
  },
] as const;

export function buildSnippet(opts: {
  lang: CodeLang;
  level: TypeLevel;
  tone: TypeTone;
}) {
  const color = opts.tone === 'ink' ? '#181511' : '#9A9590';
  const style = `font-family: Gotham, Raleway, sans-serif; font-size: ${opts.level.size}; font-weight: ${opts.level.weight}; line-height: ${opts.level.line}; letter-spacing: ${opts.level.tracking}; color: ${color};`;
  const tag = opts.level.tag;
  const text = opts.level.sample;

  if (opts.lang === 'react') {
    return `<${tag} style={{ fontFamily: 'Gotham, Raleway, sans-serif', fontSize: '${opts.level.size}', fontWeight: ${opts.level.weight}, lineHeight: ${opts.level.line}, letterSpacing: '${opts.level.tracking}', color: '${color}' }}>${text}</${tag}>`;
  }

  return `<${tag} style="${style}">${text}</${tag}>`;
}
