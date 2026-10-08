import type { TimelineVariant, Tone } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type TimelineExample = {
  id: TimelineVariant;
  title: string;
  description: string;
  variant: TimelineVariant;
};

export const TIMELINE_EXAMPLES: TimelineExample[] = [
  {
    id: 'basic',
    title: 'Basica',
    description: 'Eventos en orden cronologico con hora y descripcion.',
    variant: 'basic',
  },
  {
    id: 'icons',
    title: 'Con iconos',
    description: 'Nodos con icono para tipificar el evento.',
    variant: 'icons',
  },
  {
    id: 'status',
    title: 'Con estatus',
    description: 'Pill de estado por evento (alta, revision, cierre).',
    variant: 'status',
  },
  {
    id: 'dense',
    title: 'Compacta',
    description: 'Menor espacio para bitacoras densas.',
    variant: 'dense',
  },
  {
    id: 'alternating',
    title: 'Alternada',
    description: 'Contenido alineado en zigzag.',
    variant: 'alternating',
  },
  {
    id: 'cards',
    title: 'En tarjetas',
    description: 'Cada evento en un bloque con borde.',
    variant: 'cards',
  },
  {
    id: 'complete',
    title: 'Completa',
    description: 'Iconos, estatus y tarjetas juntos.',
    variant: 'complete',
  },
  {
    id: 'numbered',
    title: 'Numerada',
    description: 'Pasos numerados para flujos o checklists.',
    variant: 'numbered',
  },
  {
    id: 'dates',
    title: 'Con fechas',
    description: 'Fecha completa mas hora en cada evento.',
    variant: 'dates',
  },
  {
    id: 'milestones',
    title: 'Hitos',
    description: 'Nodos mas grandes para hitos clave del expediente.',
    variant: 'milestones',
  },
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: 'Linea en fila para etapas cortas o resumen.',
    variant: 'horizontal',
  },
  {
    id: 'grouped',
    title: 'Agrupada',
    description: 'Eventos agrupados por dia (Hoy, Ayer…).',
    variant: 'grouped',
  },
];

export const TIMELINE_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | icons | status | dense | alternating | cards | complete | numbered | dates | milestones | horizontal | grouped',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'Marca fija vino + cafe (primary). No hay selector de color en docs.',
  },
] as const;

export type TimelineEvent = {
  id: string;
  time: string;
  title: string;
  desc: string;
  status: string;
  statusKey: string;
  icon: 'Tray' | 'User' | 'CheckCircle' | 'Warning' | 'FileText' | 'Stamp';
  date?: string;
  group?: string;
};

export const SAMPLE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    time: '09:12',
    title: 'Expediente recibido',
    desc: 'Ingreso por ventanilla digital · EXP-2026-01482',
    status: 'Alta',
    statusKey: 'alta',
    icon: 'Tray',
    date: '14 mar 2026',
    group: 'Hoy · 14 mar',
  },
  {
    id: '2',
    time: '11:40',
    title: 'Asignado a revision',
    desc: 'Turnado a Direccion de Operaciones',
    status: 'Revision',
    statusKey: 'revision',
    icon: 'User',
    date: '14 mar 2026',
    group: 'Hoy · 14 mar',
  },
  {
    id: '3',
    time: '16:05',
    title: 'Dictamen emitido',
    desc: 'Resolucion favorable con observaciones',
    status: 'Cerrado',
    statusKey: 'cerrado',
    icon: 'CheckCircle',
    date: '13 mar 2026',
    group: 'Ayer · 13 mar',
  },
];

export const MILESTONE_EVENTS: TimelineEvent[] = [
  {
    id: 'm1',
    time: 'Lun',
    title: 'Apertura',
    desc: 'Expediente dado de alta',
    status: 'Alta',
    statusKey: 'alta',
    icon: 'FileText',
    date: '10 mar',
  },
  {
    id: 'm2',
    time: 'Mie',
    title: 'Revision tecnica',
    desc: 'Analisis de requisitos',
    status: 'Revision',
    statusKey: 'revision',
    icon: 'Stamp',
    date: '12 mar',
  },
  {
    id: 'm3',
    time: 'Vie',
    title: 'Resolucion',
    desc: 'Dictamen favorable',
    status: 'Cerrado',
    statusKey: 'cerrado',
    icon: 'CheckCircle',
    date: '14 mar',
  },
];

export function eventsFor(variant: TimelineVariant): TimelineEvent[] {
  if (variant === 'milestones' || variant === 'horizontal') {
    return MILESTONE_EVENTS;
  }
  return SAMPLE_EVENTS;
}

function icon(lang: CodeLang, name: string, size = 14): string {
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

function railMarkup(
  lang: CodeLang,
  example: TimelineExample,
  ev: TimelineEvent,
  index: number,
): string {
  const v = example.variant;
  if (v === 'icons' || v === 'complete') {
    return `<span class="gob-tl-icon">${icon(lang, ev.icon, 16)}</span>`;
  }
  if (v === 'numbered') {
    return `<span class="gob-tl-num">${index + 1}</span>`;
  }
  return '<span class="gob-tl-dot"></span>';
}

function itemMarkup(
  lang: CodeLang,
  example: TimelineExample,
  ev: TimelineEvent,
  index: number,
): string {
  const i = '  ';
  const v = example.variant;
  const showStatus =
    v === 'status' || v === 'complete' || v === 'cards' || v === 'icons';
  const showDate = v === 'dates';

  return `${i}<div class="gob-tl-item" role="listitem">
${i}  <div class="gob-tl-rail">
${i}    ${railMarkup(lang, example, ev, index)}
${i}  </div>
${i}  <div class="gob-tl-body">
${i}    <div class="gob-tl-head">
${showDate ? `${i}      <div class="gob-tl-when">
${i}        <p class="gob-tl-date">${ev.date}</p>
${i}        <p class="gob-tl-time">${ev.time}</p>
${i}      </div>` : `${i}      <p class="gob-tl-time">${ev.time}</p>`}
${showStatus ? `${i}      <span class="gob-tl-pill" data-status="${ev.statusKey}">${ev.status}</span>` : ''}
${i}    </div>
${i}    <p class="gob-tl-title">${ev.title}</p>
${i}    <p class="gob-tl-desc">${ev.desc}</p>
${i}  </div>
${i}</div>`;
}

export function buildSnippet(lang: CodeLang, example: TimelineExample, tone: Tone): string {
  const events = eventsFor(example.variant);
  const v = example.variant;
  let body = '';

  if (v === 'grouped') {
    let lastGroup = '';
    body = events
      .map((ev, index) => {
        const group =
          ev.group && ev.group !== lastGroup
            ? `  <div class="gob-tl-group">${ev.group}</div>\n`
            : '';
        lastGroup = ev.group ?? lastGroup;
        return `${group}${itemMarkup(lang, example, ev, index)}`;
      })
      .join('\n');
  } else {
    body = events.map((ev, index) => itemMarkup(lang, example, ev, index)).join('\n');
  }

  const needsIcons = v === 'icons' || v === 'complete';
  const iconNames = [...new Set(events.map((e) => e.icon))];
  const imports =
    lang === 'react' && needsIcons
      ? `import { ${iconNames.join(', ')} } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`
      : lang === 'html'
        ? `<!-- Phosphor thin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css" />

`
        : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-timeline variant="${example.variant}" tone="${tone}">
${body}
</gob-timeline>
`;
}
