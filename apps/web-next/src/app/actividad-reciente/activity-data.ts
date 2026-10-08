import type { ActivityFeedVariant, Tone } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type ActivityExample = {
  id: ActivityFeedVariant;
  title: string;
  description: string;
  variant: ActivityFeedVariant;
};

export const ACTIVITY_EXAMPLES: ActivityExample[] = [
  {
    id: 'basic',
    title: 'Basica',
    description: 'Texto de actividad con marca de tiempo.',
    variant: 'basic',
  },
  {
    id: 'avatar',
    title: 'Con avatar',
    description: 'Iniciales del actor a la izquierda.',
    variant: 'avatar',
  },
  {
    id: 'actions',
    title: 'Con acciones',
    description: 'Boton rapido por fila (ver, aprobar).',
    variant: 'actions',
  },
  {
    id: 'dense',
    title: 'Compacta',
    description: 'Menor padding para paneles laterales.',
    variant: 'dense',
  },
  {
    id: 'grouped',
    title: 'Agrupada',
    description: 'Secciones Hoy / Ayer.',
    variant: 'grouped',
  },
  {
    id: 'unread',
    title: 'No leidas',
    description: 'Resalta items pendientes de lectura.',
    variant: 'unread',
  },
  {
    id: 'status',
    title: 'Con estatus',
    description: 'Pill de semaforo institucional por actividad.',
    variant: 'status',
  },
  {
    id: 'complete',
    title: 'Completa',
    description: 'Avatar, estatus, acciones y no leidas juntos.',
    variant: 'complete',
  },
  {
    id: 'icon',
    title: 'Con icono',
    description: 'Icono de tipo de evento (documento, usuario, check).',
    variant: 'icon',
  },
  {
    id: 'cards',
    title: 'En tarjetas',
    description: 'Cada actividad en un bloque con borde.',
    variant: 'cards',
  },
  {
    id: 'mentions',
    title: 'Con menciones',
    description: 'Resalta @usuarios mencionados en el texto.',
    variant: 'mentions',
  },
  {
    id: 'files',
    title: 'Con archivos',
    description: 'Chip de documento o adjunto por actividad.',
    variant: 'files',
  },
  {
    id: 'empty',
    title: 'Vacia',
    description: 'Estado sin actividad reciente.',
    variant: 'empty',
  },
];

export const ACTIVITY_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | avatar | actions | dense | grouped | unread | status | complete | icon | cards | mentions | files | empty',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'Marca fija vino + cafe (primary). No hay selector de color en docs.',
  },
] as const;

export type ActivityRow = {
  id: string;
  initials: string;
  actor: string;
  text: string;
  meta: string;
  group: string;
  unread: boolean;
  status: string;
  statusKey: 'alta' | 'revision' | 'cerrado' | 'rechazado';
  icon: 'Tray' | 'User' | 'CheckCircle' | 'FileText';
  mention?: string;
  file?: string;
};

export const SAMPLE_ACTIVITY: ActivityRow[] = [
  {
    id: '1',
    initials: 'MG',
    actor: 'Maria Gonzalez',
    text: 'cargo un documento en EXP-2026-01482',
    meta: 'hace 12 min',
    group: 'Hoy',
    unread: true,
    status: 'Alta',
    statusKey: 'alta',
    icon: 'Tray',
    mention: '@operaciones',
    file: 'oficio-01482.pdf',
  },
  {
    id: '2',
    initials: 'JR',
    actor: 'Jorge Ramirez',
    text: 'cambio el estatus a En revision',
    meta: 'hace 1 h',
    group: 'Hoy',
    unread: true,
    status: 'Revision',
    statusKey: 'revision',
    icon: 'User',
    mention: '@ana.lopez',
    file: 'checklist-revision.xlsx',
  },
  {
    id: '3',
    initials: 'AL',
    actor: 'Ana Lopez',
    text: 'cerro el expediente EXP-2026-01390',
    meta: 'ayer',
    group: 'Ayer',
    unread: false,
    status: 'Cerrado',
    statusKey: 'cerrado',
    icon: 'CheckCircle',
    mention: '@direccion',
    file: 'dictamen-01390.pdf',
  },
];

function iconMarkup(lang: CodeLang, name: string, size = 16): string {
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

function primaryText(example: ActivityExample, row: ActivityRow): string {
  if (example.variant === 'mentions' && row.mention) {
    return `<strong>${row.actor}</strong> menciono a <span class="gob-af-mention">${row.mention}</span> en ${row.text}`;
  }
  return `<strong>${row.actor}</strong> ${row.text}`;
}

function itemMarkup(
  lang: CodeLang,
  example: ActivityExample,
  row: ActivityRow,
): string {
  const i = '  ';
  const v = example.variant;
  const showAvatar =
    v === 'avatar' ||
    v === 'complete' ||
    v === 'dense' ||
    v === 'unread' ||
    v === 'status' ||
    v === 'cards' ||
    v === 'mentions' ||
    v === 'files';
  const showIcon = v === 'icon';
  const showActions = v === 'actions' || v === 'complete';
  const showStatus = v === 'status' || v === 'complete' || v === 'unread';
  const showFile = v === 'files';
  const unread = (v === 'unread' || v === 'complete') && row.unread;

  const lead = showIcon
    ? `${i}  <span class="gob-af-icon">${iconMarkup(lang, row.icon, 16)}</span>`
    : showAvatar
      ? `${i}  <span class="gob-af-avatar">${row.initials}</span>`
      : `${i}  <span class="gob-af-dot"></span>`;

  return `${i}<div class="gob-af-item"${unread ? ' data-unread="true"' : ''} role="article">
${lead}
${i}  <div class="gob-af-body">
${i}    <div class="gob-af-head">
${i}      <p class="gob-af-primary">${primaryText(example, row)}</p>
${showStatus ? `${i}      <span class="gob-af-pill" data-status="${row.statusKey}">${row.status}</span>` : ''}
${i}    </div>
${i}    <p class="gob-af-secondary">${row.meta}</p>
${showFile ? `${i}    <span class="gob-af-file">${iconMarkup(lang, 'FileText', 14)} ${row.file}</span>` : ''}
${i}  </div>
${showActions ? `${i}  <button type="button" class="gob-af-action">Ver</button>` : `${i}  <span class="gob-af-meta">${row.meta}</span>`}
${i}</div>`;
}

export function buildSnippet(
  lang: CodeLang,
  example: ActivityExample,
  tone: Tone = 'primary',
): string {
  const v = example.variant;

  if (v === 'empty') {
    const emptyIcon = iconMarkup(lang, 'Tray', 22);
    const imports =
      lang === 'react'
        ? `import { Tray } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`
        : lang === 'html'
          ? `<!-- Phosphor thin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css" />

`
          : `import '@mariasan001/ui-wc';

`;
    return `${imports}<gob-activity-feed variant="empty" tone="${tone}">
  <div class="gob-af-empty" role="status">
    <span class="gob-af-empty-icon">${emptyIcon}</span>
    <p class="gob-af-empty-title">Sin actividad reciente</p>
    <p class="gob-af-empty-desc">Cuando haya movimientos en expedientes, apareceran aqui.</p>
  </div>
</gob-activity-feed>
`;
  }

  let body: string;
  if (v === 'grouped') {
    let last = '';
    body = SAMPLE_ACTIVITY.map((row) => {
      const group =
        row.group !== last
          ? `  <div class="gob-af-group">${row.group}</div>\n`
          : '';
      last = row.group;
      return `${group}${itemMarkup(lang, example, row)}`;
    }).join('\n');
  } else {
    body = SAMPLE_ACTIVITY.map((r) => itemMarkup(lang, example, r)).join('\n');
  }

  const needsIcons = v === 'icon' || v === 'files';
  const iconNames =
    v === 'files'
      ? ['FileText']
      : [...new Set(SAMPLE_ACTIVITY.map((e) => e.icon))];

  const imports =
    lang === 'react' && needsIcons
      ? `import { ${iconNames.join(', ')} } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`
      : lang === 'html' && needsIcons
        ? `<!-- Phosphor thin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css" />

`
        : lang === 'html'
          ? ''
          : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-activity-feed variant="${example.variant}" tone="${tone}">
${body}
</gob-activity-feed>
`;
}
