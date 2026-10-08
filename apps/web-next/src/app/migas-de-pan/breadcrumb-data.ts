import type { BreadcrumbVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export const COLOR_OPTIONS: { id: 'primary' | 'accent'; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
];

export type BreadcrumbTone = (typeof COLOR_OPTIONS)[number]['id'];

export type BreadcrumbExample = {
  id: BreadcrumbVariant;
  title: string;
  description: string;
  variant: BreadcrumbVariant;
};

export const BREADCRUMB_EXAMPLES: BreadcrumbExample[] = [
  {
    id: 'basic',
    title: 'Basica',
    description: 'Ruta corta con separador diagonal. Lectura limpia.',
    variant: 'basic',
  },
  {
    id: 'chevron',
    title: 'Con chevron',
    description: 'Misma ruta con separador angular para jerarquias densas.',
    variant: 'chevron',
  },
  {
    id: 'icons',
    title: 'Con icono',
    description: 'Inicio con icono de casa para anclar el arbol.',
    variant: 'icons',
  },
  {
    id: 'collapsed',
    title: 'Colapsada',
    description: 'Niveles intermedios resumidos con puntos suspensivos.',
    variant: 'collapsed',
  },
  {
    id: 'underline',
    title: 'Con subrayado',
    description: 'Enlaces con subrayado al pasar para reforzar la accion.',
    variant: 'underline',
  },
  {
    id: 'dense',
    title: 'Compacta',
    description: 'Tipografia y huecos menores para barras densas.',
    variant: 'dense',
  },
  {
    id: 'complete',
    title: 'Completa',
    description: 'Ruta larga con icono, varios niveles y pagina actual.',
    variant: 'complete',
  },
  {
    id: 'dot',
    title: 'Con puntos',
    description: 'Separador puntual para rutas cortas y discretas.',
    variant: 'dot',
  },
  {
    id: 'arrow',
    title: 'Con flecha',
    description: 'Separador con flecha para marcar el avance de la ruta.',
    variant: 'arrow',
  },
  {
    id: 'back',
    title: 'Con volver',
    description: 'Accion de regreso al inicio de la jerarquia.',
    variant: 'back',
  },
];

export const BREADCRUMB_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | chevron | icons | collapsed | underline | dense | complete | dot | arrow | back',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'Color de enlaces y acento: primary | accent',
  },
] as const;

function sep(variant: BreadcrumbVariant): string {
  if (variant === 'chevron') return '›';
  if (variant === 'dot') return '·';
  if (variant === 'arrow') return '→';
  return '/';
}

function bodyFor(lang: CodeLang, example: BreadcrumbExample): string {
  const i = '  ';
  const s = sep(example.variant);
  const mark = `${i}<span data-sep aria-hidden="true">${s}</span>`;

  if (example.variant === 'collapsed') {
    return `${i}<a href="#">Inicio</a>
${mark}
${i}<span data-sep aria-hidden="true">…</span>
${mark}
${i}<a href="#">Expedientes</a>
${mark}
${i}<strong aria-current="page">Detalle</strong>`;
  }

  if (example.variant === 'icons' || example.variant === 'complete') {
    const home =
      lang === 'react'
        ? `${i}<a href="#" data-crumb class="crumb-icon">${icon(lang, 'House', 14)} Inicio</a>`
        : `${i}<a href="#" data-crumb class="crumb-icon">${icon(lang, 'House', 14)} Inicio</a>`;

    if (example.variant === 'icons') {
      return `${home}
${mark}
${i}<a href="#">Expedientes</a>
${mark}
${i}<strong aria-current="page">Detalle</strong>`;
    }

    return `${home}
${mark}
${i}<a href="#">Operaciones</a>
${mark}
${i}<a href="#">Expedientes</a>
${mark}
${i}<a href="#">2026</a>
${mark}
${i}<strong aria-current="page">EXP-1842</strong>`;
  }

  if (example.variant === 'back') {
    return `${i}<a href="#" data-crumb class="crumb-back">${icon(lang, 'ArrowLeft', 14)} Volver</a>
${mark}
${i}<a href="#">Expedientes</a>
${mark}
${i}<strong aria-current="page">Detalle</strong>`;
  }

  return `${i}<a href="#">Inicio</a>
${mark}
${i}<a href="#">Expedientes</a>
${mark}
${i}<strong aria-current="page">Detalle</strong>`;
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

function iconImports(lang: CodeLang, example: BreadcrumbExample): string {
  const needsHouse = example.variant === 'icons' || example.variant === 'complete';
  const needsBack = example.variant === 'back';
  if (lang === 'html') {
    return needsHouse || needsBack
      ? `<!-- Phosphor thin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css" />

`
      : '';
  }
  if (lang === 'react') {
    if (needsHouse) {
      return `import { House } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`;
    }
    if (needsBack) {
      return `import { ArrowLeft } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`;
    }
    return `import '@mariasan001/ui-wc';

`;
  }
  if (lang === 'vue') {
    if (needsHouse) {
      return `import { PhHouse } from '@phosphor-icons/vue';
import '@mariasan001/ui-wc';

`;
    }
    if (needsBack) {
      return `import { PhArrowLeft } from '@phosphor-icons/vue';
import '@mariasan001/ui-wc';

`;
    }
    return `import '@mariasan001/ui-wc';

`;
  }
  return `import '@mariasan001/ui-wc';

`;
}

export function buildSnippet(
  lang: CodeLang,
  example: BreadcrumbExample,
  tone: BreadcrumbTone,
): string {
  const attrs = ` variant="${example.variant}" tone="${tone}"`;
  const body = bodyFor(lang, example);

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<!-- gob-breadcrumb estiliza; navegar/expandir lo cables tu. -->
<script type="module">import '@mariasan001/ui-wc';</script>
${iconImports(lang, example)}<gob-breadcrumb${attrs}>
${body}
</gob-breadcrumb>`;
  }

  if (lang === 'react') {
    return `// Interaccion en React: truncar ruta al hacer clic en un ancestro.
import { useState } from 'react';
${example.variant === 'icons' || example.variant === 'complete' ? `import { House } from '@phosphor-icons/react';\n` : ''}${example.variant === 'back' ? `import { ArrowLeft } from '@phosphor-icons/react';\n` : ''}import '@mariasan001/ui-wc';

const FULL = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'exp', label: 'Expedientes' },
  { id: 'det', label: 'Detalle' },
];

export function MigasDePan() {
  const [index, setIndex] = useState(FULL.length - 1);
  const trail = FULL.slice(0, index + 1);

  return (
    <gob-breadcrumb${attrs}>
      {trail.map((crumb, i) => (
        <span key={crumb.id}>
          {i > 0 ? <span data-sep> / </span> : null}
          {i === index ? (
            <strong aria-current="page">{crumb.label}</strong>
          ) : (
            <button type="button" onClick={() => setIndex(i)}>
${example.variant === 'icons' || example.variant === 'complete' ? `              {i === 0 ? <House weight="thin" size={14} /> : null}\n` : ''}              {crumb.label}
            </button>
          )}
        </span>
      ))}
    </gob-breadcrumb>
  );
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
import { ref } from 'vue';
${iconImports(lang, example).trimEnd()}
const index = ref(2);
</script>

<template>
  <gob-breadcrumb${attrs}>
${body}
  </gob-breadcrumb>
</template>`;
  }

  return `// app.component.html
${iconImports(lang, example)}<gob-breadcrumb${attrs}>
${body}
</gob-breadcrumb>`;
}
