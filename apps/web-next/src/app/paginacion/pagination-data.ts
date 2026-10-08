import type { PaginationVariant, Tone } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

/** Same swatches as Botones docs shell. */
export const COLOR_OPTIONS: { id: Tone; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
  { id: 'dark', label: 'Dark', swatch: '#181511' },
  { id: 'neutral', label: 'Neutral', swatch: '#FFFFFF' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

export type PaginationVariantDemo = {
  id: PaginationVariant;
  title: string;
  description: string;
  caption: string;
  page: number;
  total: number;
  metrics: { label: string; value: string }[];
};

export const ANATOMY_SAMPLES: PaginationVariantDemo[] = [
  {
    id: 'basic',
    title: 'Basica',
    caption: 'Solo numeros',
    description: 'Solo numeros de pagina, sin flechas.',
    page: 2,
    total: 5,
    metrics: [
      { label: 'Altura', value: '36px' },
      { label: 'Gap', value: '6px' },
      { label: 'Radio', value: '8px' },
    ],
  },
  {
    id: 'arrows',
    title: 'Con flechas',
    caption: 'Anterior y siguiente',
    description: 'Numeros con anterior y siguiente.',
    page: 3,
    total: 6,
    metrics: [
      { label: 'Altura', value: '36px' },
      { label: 'Controles', value: 'Flechas' },
      { label: 'Radio', value: '8px' },
    ],
  },
  {
    id: 'compact',
    title: 'Compacta',
    caption: 'Pagina / total',
    description: 'Muestra pagina actual sobre el total.',
    page: 4,
    total: 12,
    metrics: [
      { label: 'Altura', value: '36px' },
      { label: 'Formato', value: 'n / N' },
      { label: 'Radio', value: '8px' },
    ],
  },
];

export const CONTENT_SECTIONS: {
  id: string;
  title: string;
  description: string;
  variants: PaginationVariant[];
}[] = [
  {
    id: 'numeric',
    title: 'Numerica',
    description: 'Rangos de pagina con o sin flechas y elipsis.',
    variants: ['basic', 'arrows', 'ellipsis', 'edges'],
  },
  {
    id: 'compact',
    title: 'Compacta',
    description: 'Navegacion minima para espacios reducidos.',
    variants: ['compact', 'icons'],
  },
  {
    id: 'style',
    title: 'Estilo',
    description: 'Contorno, pills y enlaces de texto.',
    variants: ['outline', 'pills', 'text'],
  },
  {
    id: 'extra',
    title: 'Mas estilos',
    description: 'Simple, agrupada y resumen de resultados.',
    variants: ['simple', 'group', 'summary'],
  },
  {
    id: 'jump',
    title: 'Salto directo',
    description: 'Campo para escribir la pagina destino.',
    variants: ['jump'],
  },
];

export const PAGINATION_VARIANTS: PaginationVariantDemo[] = [
  {
    id: 'basic',
    title: 'Basica',
    caption: 'Solo numeros',
    description: 'Solo numeros de pagina, sin flechas.',
    page: 2,
    total: 5,
    metrics: [],
  },
  {
    id: 'arrows',
    title: 'Con flechas',
    caption: 'Anterior y siguiente',
    description: 'Numeros con anterior y siguiente.',
    page: 3,
    total: 6,
    metrics: [],
  },
  {
    id: 'ellipsis',
    title: 'Con elipsis',
    caption: 'Rangos largos',
    description: 'Trunca rangos largos con puntos suspensivos.',
    page: 8,
    total: 20,
    metrics: [],
  },
  {
    id: 'edges',
    title: 'Primera y ultima',
    caption: 'Saltos a extremos',
    description: 'Incluye saltos a la primera y ultima pagina.',
    page: 5,
    total: 18,
    metrics: [],
  },
  {
    id: 'compact',
    title: 'Compacta',
    caption: 'Pagina / total',
    description: 'Muestra pagina actual sobre el total.',
    page: 4,
    total: 12,
    metrics: [],
  },
  {
    id: 'icons',
    title: 'Solo iconos',
    caption: 'Solo flechas',
    description: 'Navegacion minima con flechas.',
    page: 2,
    total: 10,
    metrics: [],
  },
  {
    id: 'outline',
    title: 'Contorno',
    caption: 'Con borde',
    description: 'Botones con borde para superficies claras.',
    page: 1,
    total: 5,
    metrics: [],
  },
  {
    id: 'pills',
    title: 'Pills',
    caption: 'Redondeado completo',
    description: 'Numeros con forma redondeada completa.',
    page: 3,
    total: 7,
    metrics: [],
  },
  {
    id: 'text',
    title: 'Texto',
    caption: 'Enlaces de texto',
    description: 'Anterior y siguiente como enlaces de texto.',
    page: 6,
    total: 15,
    metrics: [],
  },
  {
    id: 'simple',
    title: 'Simple',
    caption: 'Anterior / Siguiente',
    description: 'Solo botones de texto con icono, estilo relleno.',
    page: 2,
    total: 8,
    metrics: [],
  },
  {
    id: 'group',
    title: 'Agrupada',
    caption: 'Segmentada',
    description: 'Numeros unidos en un bloque continuo.',
    page: 5,
    total: 16,
    metrics: [],
  },
  {
    id: 'summary',
    title: 'Resumen',
    caption: 'Rango de resultados',
    description: 'Muestra el rango de items con flechas de navegacion.',
    page: 3,
    total: 12,
    metrics: [],
  },
  {
    id: 'jump',
    title: 'Salto directo',
    caption: 'Input de pagina',
    description: 'Campo para escribir la pagina destino.',
    page: 9,
    total: 30,
    metrics: [],
  },
];

export function getVariant(id: PaginationVariant): PaginationVariantDemo {
  return PAGINATION_VARIANTS.find((item) => item.id === id) ?? PAGINATION_VARIANTS[0];
}

export function buildSnippet(opts: {
  lang: CodeLang;
  tone: Tone;
  variant: PaginationVariant;
  page: number;
  total: number;
}) {
  const attrs = `variant="${opts.variant}" tone="${opts.tone}" page="${opts.page}" total="${opts.total}" lang="es"`;

  if (opts.lang === 'react') {
    return `import { useEffect, useRef, useState } from 'react';
import '@mariasan001/ui-wc';

export function Paginacion() {
  const [page, setPage] = useState(${opts.page});
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onChange = (e) => setPage(e.detail.page);
    node.addEventListener('gob-page-change', onChange);
    return () => node.removeEventListener('gob-page-change', onChange);
  }, []);

  return (
    <>
      <p>Pagina {page} de ${opts.total}</p>
      <gob-pagination
        ref={ref}
        ${attrs.replace(`page="${opts.page}"`, 'page={String(page)}')}
      />
    </>
  );
}`;
  }

  if (opts.lang === 'vue') {
    return `<script setup>
import { ref } from 'vue';
import '@mariasan001/ui-wc';
const page = ref(${opts.page});
function onPage(e) { page.value = e.detail.page; }
</script>

<template>
  <p>Pagina {{ page }} de ${opts.total}</p>
  <gob-pagination
    ${attrs.replace(`page="${opts.page}"`, ':page="String(page)"')}
    @gob-page-change="onPage"
  ></gob-pagination>
</template>`;
  }

  if (opts.lang === 'angular') {
    return `// Escucha gob-page-change y actualiza [attr.page]
import '@mariasan001/ui-wc';

<gob-pagination ${attrs}></gob-pagination>`;
  }

  return `<!-- npm i @mariasan001/ui-wc -->
<script type="module">
  import '@mariasan001/ui-wc';
  const el = document.querySelector('gob-pagination');
  el.addEventListener('gob-page-change', (e) => {
    el.setAttribute('page', String(e.detail.page));
    console.log('Pagina', e.detail.page);
  });
</script>

<gob-pagination ${attrs}></gob-pagination>`;
}
