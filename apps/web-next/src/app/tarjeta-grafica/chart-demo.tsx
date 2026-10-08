'use client';

import { useEffect, useState } from 'react';
import { DownloadSimple, DotsThree } from '@phosphor-icons/react';

import type { ChartCardTone } from '@mariasan001/ui-wc';

import type { ChartExample } from './chart-data';
import { EchartsCanvas } from './echarts-canvas';
import local from './chart.module.css';

export function ChartDemo({
  example,
  tone,
}: {
  example: ChartExample;
  tone: ChartCardTone;
}) {
  const [flash, setFlash] = useState('');

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  return (
    <div className={local.stageInner}>
      <gob-chart-card
        key={`${example.id}-${tone}`}
        variant={example.variant}
        tone={tone}
      >
        <span slot="title">{example.cardTitle}</span>
        {example.subtitle ? (
          <span slot="subtitle">{example.subtitle}</span>
        ) : null}
        {example.showActions ? (
          <span slot="actions" className={local.actions}>
            <button
              type="button"
              className={local.actionBtn}
              aria-label="Exportar"
              onClick={() => setFlash('Grafica exportada (PNG)')}
            >
              <DownloadSimple weight="bold" size={14} />
            </button>
            <button
              type="button"
              className={local.actionBtn}
              aria-label="Mas"
              onClick={() => setFlash('Menu: compartir · imprimir · datos')}
            >
              <DotsThree weight="bold" size={16} />
            </button>
          </span>
        ) : null}
        <EchartsCanvas
          kind={example.chart}
          tone={tone}
          compact={
            example.variant === 'dense' || example.variant === 'minimal'
          }
        />
        {example.showLegend && example.legend
          ? example.legend.map((item) => (
              <span
                key={item.label}
                slot="legend"
                className={local.legendItem}
                data-tone={item.tone}
              >
                <i />
                {item.label}
              </span>
            ))
          : null}
        <span slot="footer">{flash || example.footer || ' '}</span>
      </gob-chart-card>
    </div>
  );
}
