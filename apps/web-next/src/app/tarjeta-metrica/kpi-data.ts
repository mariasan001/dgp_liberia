import type { KpiTone, KpiVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

/** Misma paleta que Botones. */
export const COLOR_OPTIONS: { id: KpiTone; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
  { id: 'dark', label: 'Dark', swatch: '#181511' },
  { id: 'neutral', label: 'Neutral', swatch: '#FFFFFF' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

export type KpiExample = {
  id: KpiVariant;
  title: string;
  description: string;
  variant: KpiVariant;
  label: string;
  value: string;
  trend?: string;
  period?: string;
  compare?: string;
  secondaryLabel?: string;
  secondaryValue?: string;
  progress?: number;
  showIcon?: boolean;
};

export const KPI_EXAMPLES: KpiExample[] = [
  {
    id: 'basic',
    title: 'Basica',
    description: 'Etiqueta y valor, sin tendencia ni periodo.',
    variant: 'basic',
    label: 'Tramites',
    value: '1,284',
  },
  {
    id: 'trend-up',
    title: 'Tendencia al alza',
    description: 'Incluye indicador positivo de variacion.',
    variant: 'trend-up',
    label: 'Usuarios activos',
    value: '8,420',
    trend: '+12%',
  },
  {
    id: 'trend-down',
    title: 'Tendencia a la baja',
    description: 'Incluye indicador negativo de variacion.',
    variant: 'trend-down',
    label: 'Tiempo medio',
    value: '4.2 d',
    trend: '-8%',
  },
  {
    id: 'period',
    title: 'Con periodo',
    description: 'Valor acompanado del marco temporal.',
    variant: 'period',
    label: 'Ingresos',
    value: '$2.4M',
    period: 'Ultimos 30 dias',
  },
  {
    id: 'icon',
    title: 'Con icono',
    description: 'Icono de apoyo en la esquina superior.',
    variant: 'icon',
    label: 'Alertas',
    value: '36',
    showIcon: true,
  },
  {
    id: 'dense',
    title: 'Densa',
    description: 'Padding y tipografia compactos para grids densos.',
    variant: 'dense',
    label: 'Pendientes',
    value: '92',
    trend: '+3%',
    period: 'Hoy',
  },
  {
    id: 'complete',
    title: 'Completa',
    description: 'Icono, tendencia y periodo en una sola tarjeta.',
    variant: 'complete',
    label: 'Conversion',
    value: '64%',
    trend: '+5.1%',
    period: 'Este mes',
    showIcon: true,
  },
  {
    id: 'stripe',
    title: 'Con franja',
    description: 'Barra de acento lateral para jerarquia visual.',
    variant: 'stripe',
    label: 'Expedientes',
    value: '518',
    period: 'En revision',
  },
  {
    id: 'filled',
    title: 'Rellena',
    description: 'Fondo tintado con el color activo.',
    variant: 'filled',
    label: 'Satisfaccion',
    value: '4.8',
    showIcon: true,
  },
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: 'Etiqueta e icono a la izquierda, valor a la derecha.',
    variant: 'horizontal',
    label: 'Citas hoy',
    value: '24',
    showIcon: true,
  },
  {
    id: 'compare',
    title: 'Comparativa',
    description: 'Valor actual frente a un periodo anterior.',
    variant: 'compare',
    label: 'Altas',
    value: '312',
    compare: 'vs 278',
    period: 'Mes anterior',
  },
  {
    id: 'progress',
    title: 'Con progreso',
    description: 'Barra de avance hacia una meta (atributo progress).',
    variant: 'progress',
    label: 'Meta anual',
    value: '72%',
    progress: 72,
    period: 'Objetivo 100%',
  },
  {
    id: 'elevated',
    title: 'Elevada',
    description: 'Sombra suave para destacar en dashboards.',
    variant: 'elevated',
    label: 'NPS',
    value: '61',
    trend: '+4',
    period: 'Trimestre',
    showIcon: true,
  },
  {
    id: 'sparkline',
    title: 'Sparkline',
    description: 'Serie temporal embebida para lectura ejecutiva.',
    variant: 'sparkline',
    label: 'Trafico web',
    value: '128k',
    trend: '+18%',
    period: 'Ultimas 8 semanas',
  },
  {
    id: 'ring',
    title: 'Anillo',
    description: 'Indicador circular de cumplimiento (progress).',
    variant: 'ring',
    label: 'SLA resuelto',
    value: '86%',
    trend: '+2.4%',
    progress: 86,
    period: 'Acumulado del mes',
  },
  {
    id: 'split',
    title: 'Doble metrica',
    description: 'Dos KPIs relacionados en la misma tarjeta.',
    variant: 'split',
    label: 'Entrantes',
    value: '1,042',
    secondaryLabel: 'Resueltos',
    secondaryValue: '978',
    period: 'Hoy · 08:00–18:00',
  },
  {
    id: 'live',
    title: 'En vivo',
    description: 'Estado en tiempo real con pulso de actividad.',
    variant: 'live',
    label: 'Sesiones activas',
    value: '347',
    trend: '+21',
    period: 'Actualizado hace 12s',
  },
];

export const KPI_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | trend-up | trend-down | period | icon | dense | complete | stripe | filled | horizontal | compare | progress | elevated | sparkline | ring | split | live',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'primary | accent | dark | neutral | soft',
  },
  {
    name: 'progress',
    type: 'number',
    defaultValue: '64',
    body: 'Porcentaje 0–100 (variant=progress o ring).',
  },
  {
    name: 'slot=label',
    type: 'slot',
    defaultValue: '—',
    body: 'Etiqueta superior del indicador.',
  },
  {
    name: 'slot=value',
    type: 'slot',
    defaultValue: '—',
    body: 'Valor principal (numero o metrica).',
  },
  {
    name: 'slot=trend',
    type: 'slot',
    defaultValue: '—',
    body: 'Chip de tendencia.',
  },
  {
    name: 'slot=compare',
    type: 'slot',
    defaultValue: '—',
    body: 'Texto comparativo (variant=compare).',
  },
  {
    name: 'slot=secondary-label',
    type: 'slot',
    defaultValue: '—',
    body: 'Etiqueta secundaria (variant=split).',
  },
  {
    name: 'slot=secondary-value',
    type: 'slot',
    defaultValue: '—',
    body: 'Valor secundario (variant=split).',
  },
  {
    name: 'slot=period',
    type: 'slot',
    defaultValue: '—',
    body: 'Periodo o contexto temporal.',
  },
  {
    name: 'slot=icon',
    type: 'slot',
    defaultValue: '—',
    body: 'Icono opcional.',
  },
] as const;

function iconImports(lang: CodeLang): string {
  if (lang === 'html') return '';
  return `import '@mariasan001/ui-wc';

`;
}

function slotsMarkup(example: KpiExample, indent: string): string {
  const lines = [
    `${indent}<span slot="label">${example.label}</span>`,
    `${indent}<span slot="value">${example.value}</span>`,
  ];
  if (example.trend) {
    lines.push(`${indent}<span slot="trend">${example.trend}</span>`);
  }
  if (example.compare) {
    lines.push(`${indent}<span slot="compare">${example.compare}</span>`);
  }
  if (example.secondaryLabel) {
    lines.push(
      `${indent}<span slot="secondary-label">${example.secondaryLabel}</span>`,
    );
  }
  if (example.secondaryValue) {
    lines.push(
      `${indent}<span slot="secondary-value">${example.secondaryValue}</span>`,
    );
  }
  if (example.period) {
    lines.push(`${indent}<span slot="period">${example.period}</span>`);
  }
  if (example.showIcon) {
    lines.push(`${indent}<span slot="icon">★</span>`);
  }
  return lines.join('\n');
}

export function buildSnippet(
  lang: CodeLang,
  example: KpiExample,
  tone: KpiTone,
): string {
  const progressAttr =
    example.progress != null ? ` progress="${example.progress}"` : '';
  const attrs = ` variant="${example.variant}" tone="${tone}"${progressAttr}`;
  const bodyHtml = slotsMarkup(example, '  ');
  const bodyReact = slotsMarkup(example, '      ');

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<script type="module">import '@mariasan001/ui-wc';</script>

<gob-kpi-card${attrs}>
${bodyHtml}
</gob-kpi-card>`;
  }

  if (lang === 'react') {
    return `${iconImports(lang)}export function TarjetaMetrica() {
  return (
    <gob-kpi-card${attrs}>
${bodyReact}
    </gob-kpi-card>
  );
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
${iconImports(lang).trimEnd()}
</script>

<template>
  <gob-kpi-card${attrs}>
${slotsMarkup(example, '    ')}
  </gob-kpi-card>
</template>`;
  }

  return `// app.component.html
${iconImports(lang)}<gob-kpi-card${attrs}>
${bodyHtml}
</gob-kpi-card>`;
}
