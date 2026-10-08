import type {
  PaginationBarSize,
  PaginationBarVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type PaginationBarExample = {
  id: string;
  title: string;
  description: string;
  variant: PaginationBarVariant;
  size?: PaginationBarSize;
  page?: number;
  total?: number;
  pageSize?: number;
  summary?: string;
  disabled?: boolean;
};

export const PAGINATION_BAR_EXAMPLES: PaginationBarExample[] = [
  { id: 'basic', title: 'Básico', description: 'Resumen corto + páginas.', variant: 'basic', page: 2, total: 48, pageSize: 10 },
  { id: 'summary', title: 'Con resumen', description: 'Título de consulta visible.', variant: 'summary', page: 1, total: 120, pageSize: 12, summary: 'Expedientes 2026' },
  { id: 'dense', title: 'Compacto denso', description: 'Menos botones de página.', variant: 'dense', page: 4, total: 80, pageSize: 10 },
  { id: 'soft', title: 'Suave', description: 'Fondo gris claro plano.', variant: 'soft', page: 3, total: 60, pageSize: 10, summary: 'Listado filtrado' },
  { id: 'bordered', title: 'Con borde', description: 'Contenedor con marco.', variant: 'bordered', page: 2, total: 36, pageSize: 8, summary: 'Tramites' },
  { id: 'compact', title: 'Compacto', description: 'Sin meta secundaria.', variant: 'compact', page: 1, total: 25, pageSize: 5, summary: 'Resultados' },
  { id: 'detailed', title: 'Detallado', description: 'Mas botones de página.', variant: 'detailed', page: 5, total: 200, pageSize: 10, summary: 'Consulta global' },
  { id: 'toolbar', title: 'Toolbar', description: 'Barra alineada a la izquierda.', variant: 'toolbar', page: 2, total: 40, pageSize: 10, summary: 'Tabla de ciudadanos' },
  { id: 'split', title: 'Dividido', description: 'Resumen a la izquierda, controles a la derecha.', variant: 'split', page: 3, total: 90, pageSize: 15, summary: 'Oficios' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', page: 2, total: 64, pageSize: 8, summary: 'Bandeja de revisión' },
  { id: 'disabled', title: 'Deshabilitado', description: 'Controles bloqueados.', variant: 'summary', page: 1, total: 30, pageSize: 10, summary: 'Sin permiso', disabled: true },
];

export const PAGINATION_BAR_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | summary | dense | soft | bordered | compact | detailed | toolbar | split | complete' },
  { name: 'page / total / page-size', type: 'number', defaultValue: '1 / 48 / 10', body: 'Estado de paginación.' },
  { name: 'summary', type: 'string', defaultValue: 'Resultadosâ€¦', body: 'Título del bloque de resumen.' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita controles.' },
] as const;

export function buildSnippet(lang: CodeLang, example: PaginationBarExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.page ? `page="${example.page}"` : null,
    example.total ? `total="${example.total}"` : null,
    example.pageSize ? `page-size="${example.pageSize}"` : null,
    example.summary ? `summary="${example.summary}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-pagination-bar ${attrs}></gob-pagination-bar>\n`;
}
