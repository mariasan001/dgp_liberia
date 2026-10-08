import type { ChartCardTone, ChartCardVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

/** Misma paleta que Botones. */
export const COLOR_OPTIONS: {
  id: ChartCardTone;
  label: string;
  swatch: string;
}[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
  { id: 'dark', label: 'Dark', swatch: '#181511' },
  { id: 'neutral', label: 'Neutral', swatch: '#FFFFFF' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

/**
 * Apache ECharts — core vanilla compatible con HTML / React / Vue / Angular.
 * Wrappers: echarts-for-react, vue-echarts, ngx-echarts.
 */
export const CHART_LIB = {
  name: 'Apache ECharts',
  npm: 'echarts',
  license: 'Apache-2.0',
  docs: 'https://echarts.apache.org',
} as const;

export type ChartKind =
  | 'bars'
  | 'area'
  | 'line'
  | 'donut'
  | 'heatmap'
  | 'gauge'
  | 'radar'
  | 'hbar'
  | 'stacked-bar'
  | 'stepline'
  | 'scatter'
  | 'bubble'
  | 'funnel'
  | 'treemap'
  | 'rose'
  | 'pie'
  | 'waterfall';

export type ChartExample = {
  id: ChartCardVariant;
  title: string;
  description: string;
  variant: ChartCardVariant;
  cardTitle: string;
  subtitle?: string;
  footer?: string;
  showActions?: boolean;
  showLegend?: boolean;
  chart: ChartKind;
  legend?: { label: string; tone: 'a' | 'b' | 'c' }[];
};

export const CHART_EXAMPLES: ChartExample[] = [
  {
    id: 'basic',
    title: 'Basica · Barras',
    description: 'Columnas planas con pista de fondo (ECharts bar).',
    variant: 'basic',
    cardTitle: 'Tramites por mes',
    chart: 'bars',
  },
  {
    id: 'legend',
    title: 'Leyenda · Area apilada',
    description: 'Areas planas apiladas para comparar canales.',
    variant: 'legend',
    cardTitle: 'Canales de atencion',
    chart: 'area',
    showLegend: true,
    legend: [
      { label: 'Presencial', tone: 'a' },
      { label: 'Digital', tone: 'b' },
      { label: 'Telefonico', tone: 'c' },
    ],
  },
  {
    id: 'actions',
    title: 'Acciones · Linea + meta',
    description: 'Serie real vs meta con tipografia limpia.',
    variant: 'actions',
    cardTitle: 'Ingresos vs meta',
    chart: 'line',
    showActions: true,
  },
  {
    id: 'period',
    title: 'Periodo · Mapa de calor',
    description: 'Heatmap de carga operativa por dia y franja.',
    variant: 'period',
    cardTitle: 'Carga operativa',
    subtitle: 'Enero – Junio 2026',
    chart: 'heatmap',
  },
  {
    id: 'side-legend',
    title: 'Lateral · Donut',
    description: 'Anillo con total central y leyenda a la derecha.',
    variant: 'side-legend',
    cardTitle: 'Distribucion por region',
    chart: 'donut',
    showLegend: true,
    legend: [
      { label: 'Norte', tone: 'a' },
      { label: 'Centro', tone: 'b' },
      { label: 'Sur', tone: 'c' },
    ],
  },
  {
    id: 'dense',
    title: 'Densa · Gauge',
    description: 'Indicador circular compacto para grids densos.',
    variant: 'dense',
    cardTitle: 'Cumplimiento SLA',
    chart: 'gauge',
    showLegend: true,
    legend: [
      { label: 'Meta 80', tone: 'a' },
      { label: 'Actual 74', tone: 'b' },
    ],
  },
  {
    id: 'elevated',
    title: 'Elevada · Radar',
    description: 'Radar multidimensional de satisfaccion ciudadana.',
    variant: 'elevated',
    cardTitle: 'Satisfaccion ciudadana',
    subtitle: 'Ultimos 90 dias',
    chart: 'radar',
    showActions: true,
    showLegend: true,
    legend: [
      { label: 'Actual', tone: 'a' },
      { label: 'Meta', tone: 'b' },
    ],
  },
  {
    id: 'footer',
    title: 'Footer · Barras horizontales',
    description: 'Ranking horizontal con nota al pie.',
    variant: 'footer',
    cardTitle: 'Prioridad ciudadana',
    chart: 'hbar',
    footer: 'Fuente: encuesta Q2 · n=1,240',
  },
  {
    id: 'stripe',
    title: 'Franja · Barras apiladas',
    description: 'Apilado de estados con acento lateral.',
    variant: 'stripe',
    cardTitle: 'Flujo de tickets',
    subtitle: 'Ultimas 6 semanas',
    chart: 'stacked-bar',
  },
  {
    id: 'framed',
    title: 'Enmarcada · Escalonada',
    description: 'Linea step dentro de un marco suave.',
    variant: 'framed',
    cardTitle: 'Citas confirmadas',
    subtitle: 'Esta semana',
    chart: 'stepline',
  },
  {
    id: 'toolbar',
    title: 'Toolbar · Dispersion',
    description: 'Scatter con acciones de exportar en el encabezado.',
    variant: 'toolbar',
    cardTitle: 'Tiempo vs resolucion',
    subtitle: 'Correlacion operativa',
    chart: 'scatter',
    showActions: true,
  },
  {
    id: 'minimal',
    title: 'Minimal · Burbujas',
    description: 'Bubble chart compacto, solo titulo.',
    variant: 'minimal',
    cardTitle: 'Volumen por zona',
    chart: 'bubble',
  },
  {
    id: 'compare',
    title: 'Comparar · Pie',
    description: 'Pastel completo con leyenda lateral.',
    variant: 'compare',
    cardTitle: 'Modo de atencion',
    chart: 'pie',
    showLegend: true,
    legend: [
      { label: 'Digital', tone: 'a' },
      { label: 'Presencial', tone: 'b' },
      { label: 'Mixto', tone: 'c' },
    ],
  },
  {
    id: 'funnel',
    title: 'Embudo · Conversion',
    description: 'Funnel de etapas del tramite digital.',
    variant: 'funnel',
    cardTitle: 'Embudo de alta',
    chart: 'funnel',
  },
  {
    id: 'treemap',
    title: 'Treemap · Composicion',
    description: 'Mapa rectangular de participacion por servicio.',
    variant: 'treemap',
    cardTitle: 'Mix de servicios',
    subtitle: 'Participacion relativa',
    chart: 'treemap',
  },
  {
    id: 'rose',
    title: 'Rosa · Nightingale',
    description: 'Pie rosa (area) para categorias de impacto.',
    variant: 'rose',
    cardTitle: 'Impacto por eje',
    chart: 'rose',
    showLegend: true,
    legend: [
      { label: 'A–C', tone: 'a' },
      { label: 'D–F', tone: 'b' },
    ],
  },
  {
    id: 'waterfall',
    title: 'Cascada · Variacion',
    description: 'Waterfall de altas, bajas y total del periodo.',
    variant: 'waterfall',
    cardTitle: 'Variacion de expedientes',
    subtitle: 'Mes actual',
    chart: 'waterfall',
    footer: 'Neto del periodo: +90 expedientes',
  },
];

export const CHART_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | legend | actions | period | side-legend | dense | elevated | footer | stripe | framed | toolbar | minimal | compare | funnel | treemap | rose | waterfall',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'primary | accent | dark | neutral | soft',
  },
  {
    name: 'slot=title',
    type: 'slot',
    defaultValue: '—',
    body: 'Titulo de la tarjeta.',
  },
  {
    name: 'slot=subtitle',
    type: 'slot',
    defaultValue: '—',
    body: 'Periodo o contexto.',
  },
  {
    name: 'slot=actions',
    type: 'slot',
    defaultValue: '—',
    body: 'Acciones del encabezado.',
  },
  {
    name: 'slot=default',
    type: 'slot',
    defaultValue: '—',
    body: 'Contenedor de la grafica (recomendado: Apache ECharts).',
  },
  {
    name: 'slot=legend',
    type: 'slot',
    defaultValue: '—',
    body: 'Leyenda de series.',
  },
  {
    name: 'slot=footer',
    type: 'slot',
    defaultValue: '—',
    body: 'Nota al pie (footer / waterfall).',
  },
] as const;

function chartTypeLabel(kind: ChartKind): string {
  switch (kind) {
    case 'area':
      return 'line + areaStyle (stacked)';
    case 'line':
      return 'line (smooth)';
    case 'donut':
      return 'pie (donut)';
    case 'heatmap':
      return 'heatmap';
    case 'gauge':
      return 'gauge';
    case 'radar':
      return 'radar';
    case 'hbar':
      return 'bar (horizontal)';
    case 'stacked-bar':
      return 'bar (stacked)';
    case 'stepline':
      return 'line (step)';
    case 'scatter':
      return 'scatter';
    case 'bubble':
      return 'scatter (bubble)';
    case 'funnel':
      return 'funnel';
    case 'treemap':
      return 'treemap';
    case 'rose':
      return 'pie (rose)';
    case 'pie':
      return 'pie';
    case 'waterfall':
      return 'bar (waterfall)';
    default:
      return 'bar';
  }
}

function sampleOptionHint(kind: ChartKind): string {
  switch (kind) {
    case 'area':
      return `{ series: [{ type: 'line', stack: 'total', areaStyle: {} }] }`;
    case 'line':
      return `{ series: [{ type: 'line', smooth: 0.35 }] }`;
    case 'donut':
      return `{ series: [{ type: 'pie', radius: ['56%', '76%'] }] }`;
    case 'heatmap':
      return `{ series: [{ type: 'heatmap', data: [[0,0,5], ...] }] }`;
    case 'gauge':
      return `{ series: [{ type: 'gauge', progress: { show: true } }] }`;
    case 'radar':
      return `{ radar: { indicator: [...] }, series: [{ type: 'radar' }] }`;
    case 'hbar':
      return `{ yAxis: { type: 'category' }, series: [{ type: 'bar' }] }`;
    case 'stacked-bar':
      return `{ series: [{ type: 'bar', stack: 'total' }] }`;
    case 'stepline':
      return `{ series: [{ type: 'line', step: 'middle' }] }`;
    case 'scatter':
      return `{ series: [{ type: 'scatter', data: [[12,44], ...] }] }`;
    case 'bubble':
      return `{ series: [{ type: 'scatter', symbolSize: (d) => d[2] }] }`;
    case 'funnel':
      return `{ series: [{ type: 'funnel', data: [...] }] }`;
    case 'treemap':
      return `{ series: [{ type: 'treemap', data: [...] }] }`;
    case 'rose':
      return `{ series: [{ type: 'pie', roseType: 'area' }] }`;
    case 'pie':
      return `{ series: [{ type: 'pie', radius: '70%' }] }`;
    case 'waterfall':
      return `{ series: [{ type: 'bar', stack: 'all' }, ...] }`;
    default:
      return `{ series: [{ type: 'bar' }] }`;
  }
}

function slotsOnly(example: ChartExample, indent: string): string {
  const lines = [`${indent}<span slot="title">${example.cardTitle}</span>`];
  if (example.subtitle) {
    lines.push(`${indent}<span slot="subtitle">${example.subtitle}</span>`);
  }
  if (example.showActions) {
    lines.push(
      `${indent}<button slot="actions" type="button">Exportar</button>`,
    );
  }
  if (example.showLegend && example.legend) {
    for (const item of example.legend) {
      lines.push(`${indent}<span slot="legend">${item.label}</span>`);
    }
  }
  if (example.footer) {
    lines.push(`${indent}<span slot="footer">${example.footer}</span>`);
  }
  return lines.join('\n');
}

export function buildSnippet(
  lang: CodeLang,
  example: ChartExample,
  tone: ChartCardTone,
): string {
  const attrs = ` variant="${example.variant}" tone="${tone}"`;
  const kind = example.chart;
  const optionHint = sampleOptionHint(kind);

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc echarts -->
<!-- Libreria: Apache ECharts (HTML / React / Vue / Angular) -->
<script type="module">
  import '@mariasan001/ui-wc';
  import * as echarts from 'echarts';

  const el = document.querySelector('#chart');
  const chart = echarts.init(el);
  chart.setOption(${optionHint});
  // tipo demo: ${chartTypeLabel(kind)}
</script>

<gob-chart-card${attrs}>
${slotsOnly(example, '  ')}
  <div id="chart" style="width:100%;height:220px"></div>
</gob-chart-card>`;
  }

  if (lang === 'react') {
    return `// npm i @mariasan001/ui-wc echarts
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import '@mariasan001/ui-wc';

export function TarjetaGrafica() {
  const ref = useRef(null);
  const [flash, setFlash] = useState('');
  useEffect(() => {
    const chart = echarts.init(ref.current);
    chart.setOption(${optionHint});
    return () => chart.dispose();
  }, []);

  return (
    <gob-chart-card${attrs}>
      <span slot="title">${example.cardTitle}</span>
${example.subtitle ? `      <span slot="subtitle">${example.subtitle}</span>\n` : ''}${example.showActions ? `      <span slot="actions">
        <button type="button" onClick={() => setFlash('Grafica exportada')}>Exportar</button>
        <button type="button" onClick={() => setFlash('Mas opciones')}>Mas</button>
      </span>\n` : ''}      <div ref={ref} style={{ width: '100%', height: 220 }} />
      <span slot="footer">{flash || '${example.footer || 'Actualizado hace 5 min'}'}</span>
    </gob-chart-card>
  );
}`;
  }

  if (lang === 'vue') {
    return `<!-- npm i @mariasan001/ui-wc echarts -->
<!-- Opcional wrapper: vue-echarts -->
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as echarts from 'echarts';
import '@mariasan001/ui-wc';

const host = ref(null);
let chart;
onMounted(() => {
  chart = echarts.init(host.value);
  chart.setOption(${optionHint});
});
onBeforeUnmount(() => chart?.dispose());
</script>

<template>
  <gob-chart-card${attrs}>
${slotsOnly(example, '    ')}
    <div ref="host" style="width:100%;height:220px" />
  </gob-chart-card>
</template>`;
  }

  return `// npm i @mariasan001/ui-wc echarts ngx-echarts
// app.component.ts
import * as echarts from 'echarts';
import { AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@ViewChild('chartHost', { static: true }) host!: ElementRef<HTMLDivElement>;
private chart?: echarts.ECharts;

ngAfterViewInit() {
  this.chart = echarts.init(this.host.nativeElement);
  this.chart.setOption(${optionHint});
}
ngOnDestroy() { this.chart?.dispose(); }

// app.component.html
<gob-chart-card${attrs}>
${slotsOnly(example, '  ')}
  <div #chartHost style="width:100%;height:220px"></div>
</gob-chart-card>`;
}
