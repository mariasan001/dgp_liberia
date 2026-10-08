import type { Tone, ToolbarVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

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
  { id: 'neutral', label: 'Neutral', swatch: '#EBEBEB' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

export type ToolbarExample = {
  id: ToolbarVariant;
  title: string;
  description: string;
  variant: ToolbarVariant;
};

export const TOOLBAR_EXAMPLES: ToolbarExample[] = [
  {
    id: 'basic',
    title: 'Basica',
    description: 'Titulo de vista y accion primaria.',
    variant: 'basic',
  },
  {
    id: 'actions',
    title: 'Con acciones',
    description: 'Exportar y otras acciones de vista.',
    variant: 'actions',
  },
  {
    id: 'density',
    title: 'Densidad',
    description: 'Conmutador confortable / compacto.',
    variant: 'density',
  },
  {
    id: 'refresh',
    title: 'Refrescar',
    description: 'Boton de actualizar datos del tablero.',
    variant: 'refresh',
  },
  {
    id: 'complete',
    title: 'Completa',
    description: 'Titulo, exportar, refrescar y densidad juntos.',
    variant: 'complete',
  },
  {
    id: 'search',
    title: 'Con busqueda',
    description: 'Campo rapido para filtrar la vista actual.',
    variant: 'search',
  },
  {
    id: 'views',
    title: 'Cambiar vista',
    description: 'Tabla o tarjetas segun la consulta.',
    variant: 'views',
  },
  {
    id: 'print',
    title: 'Imprimir',
    description: 'Accion de impresion o PDF del listado.',
    variant: 'print',
  },
  {
    id: 'bulk',
    title: 'Acciones masivas',
    description: 'Barra cuando hay filas seleccionadas.',
    variant: 'bulk',
  },
  {
    id: 'icons',
    title: 'Solo iconos',
    description: 'Acciones compactas con iconos.',
    variant: 'icons',
  },
];

export const TOOLBAR_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | actions | density | refresh | complete | search | views | print | bulk | icons',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'Acento de botones: primary | accent | dark | neutral | soft',
  },
  {
    name: 'dense',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Reduce padding y controles. Usa dense o dense="true".',
  },
] as const;

function icon(lang: CodeLang, name: string, size = 16): string {
  const kebab = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  if (lang === 'react') return `<${name} weight="thin" size={${size}} aria-hidden="true" />`;
  if (lang === 'vue') return `<Ph${name} weight="thin" :size="${size}" aria-hidden="true" />`;
  if (lang === 'angular') {
    return `<ph-${kebab} weight="thin" size="${size}" aria-hidden="true"></ph-${kebab}>`;
  }
  return `<i class="ph-thin ph-${kebab}" aria-hidden="true"></i>`;
}

function bodyFor(lang: CodeLang, example: ToolbarExample): string {
  const i = '  ';
  const v = example.variant;
  const parts: string[] = [];

  if (v === 'bulk') {
    parts.push(`${i}<div slot="start" class="gob-tbx-title">
${i}  <strong>3 seleccionados</strong>
${i}  <small>Acciones masivas</small>
${i}</div>`);
  } else {
    parts.push(`${i}<div slot="start" class="gob-tbx-title">
${i}  <strong>Expedientes</strong>
${i}  <small>Consulta operativa</small>
${i}</div>`);
  }

  if (v === 'search') {
    parts.push(`${i}<label class="gob-tbx-search">
${i}  ${icon(lang, 'MagnifyingGlass')}
${i}  <input placeholder="Buscar en vista" aria-label="Buscar" />
${i}</label>`);
  }

  if (v === 'actions' || v === 'complete' || v === 'basic' || v === 'print') {
    if (v === 'actions' || v === 'complete') {
      parts.push(
        `${i}<button type="button" class="gob-tbx-btn gob-tbx-btn-ghost">${icon(lang, 'Export')} Exportar</button>`,
      );
    }
    if (v === 'print') {
      parts.push(
        `${i}<button type="button" class="gob-tbx-btn gob-tbx-btn-ghost">${icon(lang, 'Printer')} Imprimir</button>`,
      );
    }
    if (v !== 'print') {
      parts.push(
        `${i}<button type="button" class="gob-tbx-btn gob-tbx-btn-primary">Nuevo</button>`,
      );
    }
  }

  if (v === 'bulk') {
    parts.push(`${i}<button type="button" class="gob-tbx-btn gob-tbx-btn-ghost">Asignar</button>
${i}<button type="button" class="gob-tbx-btn gob-tbx-btn-ghost">Archivar</button>
${i}<button type="button" class="gob-tbx-btn gob-tbx-btn-primary">Cerrar</button>`);
  }

  if (v === 'refresh' || v === 'complete' || v === 'icons') {
    parts.push(
      `${i}<button type="button" class="gob-tbx-icon-btn" aria-label="Refrescar">${icon(lang, 'ArrowsClockwise', 18)}</button>`,
    );
  }

  if (v === 'icons') {
    parts.push(
      `${i}<button type="button" class="gob-tbx-icon-btn" aria-label="Exportar">${icon(lang, 'Export', 18)}</button>`,
      `${i}<button type="button" class="gob-tbx-icon-btn" aria-label="Imprimir">${icon(lang, 'Printer', 18)}</button>`,
      `${i}<button type="button" class="gob-tbx-icon-btn" aria-label="Mas">${icon(lang, 'DotsThree', 18)}</button>`,
    );
  }

  if (v === 'views' || v === 'complete') {
    parts.push(`${i}<div slot="end" class="gob-tbx-seg" role="group" aria-label="Vista">
${i}  <button type="button" aria-pressed="true">${icon(lang, 'Table', 14)} Tabla</button>
${i}  <button type="button" aria-pressed="false">${icon(lang, 'SquaresFour', 14)} Tarjetas</button>
${i}</div>`);
  }

  if (v === 'density') {
    parts.push(`${i}<div slot="end" class="gob-tbx-seg" role="group" aria-label="Densidad">
${i}  <button type="button" aria-pressed="true">Comodo</button>
${i}  <button type="button" aria-pressed="false">Compacto</button>
${i}</div>`);
  }

  return parts.join('\n');
}

function iconImports(lang: CodeLang): string {
  if (lang === 'html') {
    return `<!-- Phosphor thin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css" />

`;
  }
  if (lang === 'react') {
    return `import { ArrowsClockwise, DotsThree, Export, MagnifyingGlass, Printer, SquaresFour, Table } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`;
  }
  if (lang === 'vue') {
    return `import { PhArrowsClockwise, PhDotsThree, PhExport, PhMagnifyingGlass, PhPrinter, PhSquaresFour, PhTable } from '@phosphor-icons/vue';
import '@mariasan001/ui-wc';

`;
  }
  return `import '@mariasan001/ui-wc';

`;
}

function interactiveHint(lang: CodeLang): string {
  if (lang === 'react') {
    return `
// Interaccion (React): view/density + handlers Exportar/Refrescar/Bulk con useState.
const [view, setView] = useState<'tabla' | 'tarjetas'>('tabla');
const [density, setDensity] = useState<'comodo' | 'compacto'>('comodo');
`;
  }
  if (lang === 'vue') {
    return `
<!-- Interaccion (Vue): view/density refs; handlers export/refresh/bulk. -->
`;
  }
  if (lang === 'angular') {
    return `
// Interaccion (Angular): view/density en el componente; handlers export/refresh.
`;
  }
  return `
<!-- Interaccion: click en exportar/refrescar/vistas y acciones masivas. -->
`;
}

export function buildSnippet(
  lang: CodeLang,
  example: ToolbarExample,
  tone: Tone,
): string {
  const body = bodyFor(lang, example);
  const tag = `<gob-toolbar variant="${example.variant}" tone="${tone}">
${body}
</gob-toolbar>`;

  return `${iconImports(lang)}${tag}
${interactiveHint(lang)}`;
}
