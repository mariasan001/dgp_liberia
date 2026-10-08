import type { EmptyStateVariant, Tone } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type EmptyExample = {
  id: EmptyStateVariant;
  title: string;
  description: string;
  variant: EmptyStateVariant;
};

export const EMPTY_EXAMPLES: EmptyExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Título y texto cuando no hay datos.',
    variant: 'basic',
  },
  {
    id: 'icon',
    title: 'Con icono',
    description: 'Icono ilustrativo arriba del mensaje.',
    variant: 'icon',
  },
  {
    id: 'actions',
    title: 'Con CTA',
    description: 'Botones para crear o limpiar filtros.',
    variant: 'actions',
  },
  {
    id: 'search',
    title: 'Sin resultados',
    description: 'Vacío tipico tras una búsqueda.',
    variant: 'search',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Fallo al cargar con reintento (semáforo danger).',
    variant: 'error',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Menor altura para paneles laterales.',
    variant: 'dense',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Icono, mensaje y acciones juntos.',
    variant: 'complete',
  },
  {
    id: 'filter',
    title: 'Sin filtros',
    description: 'Ningun registro cumple los filtros (semáforo info).',
    variant: 'filter',
  },
  {
    id: 'permission',
    title: 'Sin permiso',
    description: 'Acceso restringido (semáforo warning).',
    variant: 'permission',
  },
  {
    id: 'success',
    title: 'Al dia',
    description: 'Nada pendiente por atender (semáforo success).',
    variant: 'success',
  },
  {
    id: 'upload',
    title: 'Carga vacia',
    description: 'Zona para subir el primer documento.',
    variant: 'upload',
  },
  {
    id: 'inline',
    title: 'Inline',
    description: 'Layout horizontal para barras y paneles estrechos.',
    variant: 'inline',
  },
];

export const EMPTY_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | icon | actions | search | error | dense | complete | filter | permission | success | upload | inline',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'Marca fija vino + dorado (primary). No hay selector de color en docs.',
  },
] as const;

export type EmptyCopy = {
  title: string;
  desc: string;
  pill?: string;
  pillTone?: 'info' | 'warning' | 'success' | 'danger';
  hints?: string[];
  primaryLabel?: string;
  secondaryLabel?: string;
};

export function copyFor(example: EmptyExample): EmptyCopy {
  switch (example.variant) {
    case 'search':
      return {
        title: 'Sin resultados',
        desc: 'No encontramos expedientes con esos criterios. Prueba otra búsqueda.',
        pill: 'Búsqueda',
        pillTone: 'info',
        primaryLabel: 'Nueva búsqueda',
        secondaryLabel: 'Limpiar filtros',
      };
    case 'error':
      return {
        title: 'No se pudo cargar',
        desc: 'Ocurrio un problema al obtener los datos. Intenta de nuevo.',
        pill: 'Error',
        pillTone: 'danger',
        primaryLabel: 'Reintentar',
        secondaryLabel: 'Reportar',
      };
    case 'dense':
      return {
        title: 'Sin actividad',
        desc: 'Aun no hay eventos en este periodo.',
      };
    case 'filter':
      return {
        title: 'Ningun expediente coincide',
        desc: 'Ajusta o limpia los filtros para ver resultados.',
        pill: 'Filtros',
        pillTone: 'info',
        hints: ['Estatus', 'Fecha', 'Region'],
        primaryLabel: 'Limpiar filtros',
        secondaryLabel: 'Ver todos',
      };
    case 'permission':
      return {
        title: 'No tienes acceso',
        desc: 'Tu perfil no incluye permisos para ver este modulo. Solicita acceso.',
        pill: 'Restringido',
        pillTone: 'warning',
        primaryLabel: 'Solicitar acceso',
        secondaryLabel: 'Volver',
      };
    case 'success':
      return {
        title: 'Todo al dia',
        desc: 'No hay pendientes. Los nuevos movimientos apareceran aquí.',
        pill: 'Al dia',
        pillTone: 'success',
        primaryLabel: 'Ver historial',
      };
    case 'upload':
      return {
        title: 'Sin documentos',
        desc: 'Arrastra un archivo o selecciona uno para iniciar el expediente.',
        primaryLabel: 'Subir archivo',
        secondaryLabel: 'Crear vacío',
      };
    case 'inline':
      return {
        title: 'Sin notificaciones',
        desc: 'Cuando haya avisos apareceran en esta barra.',
        primaryLabel: 'Actualizar',
      };
    default:
      return {
        title: 'Sin expedientes',
        desc: 'Cuando existan registros apareceran aquí. Puedes crear el primero.',
        primaryLabel: 'Nuevo expediente',
        secondaryLabel: 'Limpiar filtros',
      };
  }
}

function icon(lang: CodeLang, name: string, size = 24): string {
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

export function iconNameFor(variant: EmptyStateVariant): string {
  switch (variant) {
    case 'error':
      return 'WarningCircle';
    case 'search':
    case 'filter':
      return 'MagnifyingGlass';
    case 'permission':
      return 'Lock';
    case 'success':
      return 'CheckCircle';
    case 'upload':
      return 'UploadSimple';
    case 'inline':
      return 'Bell';
    default:
      return 'FolderOpen';
  }
}

export function buildSnippet(
  lang: CodeLang,
  example: EmptyExample,
  tone: Tone = 'primary',
): string {
  const v = example.variant;
  const copy = copyFor(example);
  const showIcon =
    v === 'icon' ||
    v === 'complete' ||
    v === 'search' ||
    v === 'error' ||
    v === 'dense' ||
    v === 'filter' ||
    v === 'permission' ||
    v === 'success' ||
    v === 'upload' ||
    v === 'inline';
  const showActions =
    v === 'actions' ||
    v === 'complete' ||
    v === 'error' ||
    v === 'filter' ||
    v === 'permission' ||
    v === 'success' ||
    v === 'upload' ||
    v === 'inline' ||
    v === 'search';
  const showPill = Boolean(copy.pill);
  const showHints = Boolean(copy.hints?.length);
  const iconName = iconNameFor(v);
  const iconSize = v === 'inline' || v === 'dense' ? 20 : 24;

  const i = '  ';
  const parts: string[] = [`${i}<div class="gob-es-inner">`];
  if (showIcon) {
    parts.push(
      `${i}  <span class="gob-es-icon">${icon(lang, iconName, iconSize)}</span>`,
    );
  }
  if (showPill && copy.pill && copy.pillTone) {
    parts.push(
      `${i}  <span class="gob-es-pill" data-tone="${copy.pillTone}">${copy.pill}</span>`,
    );
  }
  parts.push(`${i}  <p class="gob-es-title">${copy.title}</p>`);
  parts.push(`${i}  <p class="gob-es-desc">${copy.desc}</p>`);
  if (showHints && copy.hints) {
    parts.push(`${i}  <div class="gob-es-hints">`);
    copy.hints.forEach((h) => {
      parts.push(`${i}    <span class="gob-es-hint">${h}</span>`);
    });
    parts.push(`${i}  </div>`);
  }
  if (showActions) {
    const secondary = copy.secondaryLabel ?? 'Limpiar filtros';
    const primary = copy.primaryLabel ?? 'Nuevo expediente';
    const hasSecondary = Boolean(copy.secondaryLabel) || v === 'actions' || v === 'complete';
    parts.push(`${i}  <div class="gob-es-actions">`);
    if (hasSecondary && copy.secondaryLabel !== undefined) {
      parts.push(
        `${i}    <button type="button" class="gob-es-btn">${secondary}</button>`,
      );
    } else if (v === 'actions' || v === 'complete') {
      parts.push(
        `${i}    <button type="button" class="gob-es-btn">${secondary}</button>`,
      );
    }
    parts.push(
      `${i}    <button type="button" class="gob-es-btn gob-es-btn-primary">${primary}</button>`,
    );
    parts.push(`${i}  </div>`);
  }
  parts.push(`${i}</div>`);

  const iconImport = iconName;
  const imports =
    lang === 'react'
      ? `import { ${iconImport} } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`
      : lang === 'html'
        ? `<!-- Phosphor thin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css" />

`
        : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-empty-state variant="${example.variant}" tone="${tone}">
${parts.join('\n')}
</gob-empty-state>
`;
}
