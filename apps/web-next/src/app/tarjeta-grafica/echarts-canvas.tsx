'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  BarChart,
  FunnelChart,
  GaugeChart,
  HeatmapChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  TreemapChart,
} from 'echarts/charts';
import {
  GraphicComponent,
  GridComponent,
  RadarComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { ChartCardTone } from '@mariasan001/ui-wc';

import type { ChartKind } from './chart-data';
import { buildChartOption, paletteForTone } from './echarts-options';
import local from './chart.module.css';

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  HeatmapChart,
  GaugeChart,
  ScatterChart,
  FunnelChart,
  TreemapChart,
  GridComponent,
  TooltipComponent,
  RadarComponent,
  VisualMapComponent,
  GraphicComponent,
  CanvasRenderer,
]);

export function EchartsCanvas({
  kind,
  tone,
  compact = false,
}: {
  kind: ChartKind;
  tone: ChartCardTone;
  compact?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const chart = echarts.init(host, undefined, {
      renderer: 'canvas',
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    });
    chartRef.current = chart;

    const onResize = () => chart.resize();
    window.addEventListener('resize', onResize);

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => chart.resize())
        : null;
    ro?.observe(host);

    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const palette = paletteForTone(tone);
    chart.setOption(buildChartOption(kind, palette), true);
    chart.resize();
  }, [kind, tone]);

  return (
    <div
      ref={hostRef}
      className={compact ? local.chartHostCompact : local.chartHost}
      role="img"
      aria-label={`Grafica ${kind}`}
    />
  );
}
