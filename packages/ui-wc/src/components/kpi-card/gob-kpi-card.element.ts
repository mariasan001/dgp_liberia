import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  KPI_OBSERVED_ATTRIBUTES,
  resolveKpiProgress,
  resolveKpiTone,
  resolveKpiVariant,
} from './kpi-card-constants';
import { kpiCardStyles } from './kpi-card-styles';

const SPARK_PATH =
  'M2 28 L10 22 L18 24 L26 14 L34 18 L42 10 L50 12 L58 6 L66 9 L74 4';

class GobKpiCardElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...KPI_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly ringFgEl: SVGCircleElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = kpiCardStyles;

    this.rootEl = document.createElement('article');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const head = document.createElement('div');
    head.className = 'head';
    head.setAttribute('part', 'head');

    const label = document.createElement('div');
    label.className = 'label';
    label.setAttribute('part', 'label');
    const labelSlot = document.createElement('slot');
    labelSlot.name = 'label';
    label.appendChild(labelSlot);

    const live = document.createElement('div');
    live.className = 'live';
    live.setAttribute('part', 'live');
    live.innerHTML = '<i></i><span>En vivo</span>';

    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.setAttribute('part', 'icon');
    const iconSlot = document.createElement('slot');
    iconSlot.name = 'icon';
    icon.appendChild(iconSlot);

    const headAside = document.createElement('div');
    headAside.className = 'headAside';
    headAside.append(live, icon);
    head.append(label, headAside);

    const body = document.createElement('div');
    body.className = 'body';
    body.setAttribute('part', 'body');

    const ringWrap = document.createElement('div');
    ringWrap.className = 'ringWrap';
    ringWrap.setAttribute('part', 'ring');
    ringWrap.setAttribute('aria-hidden', 'true');

    const ringSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ringSvg.setAttribute('viewBox', '0 0 72 72');
    ringSvg.setAttribute('class', 'ringSvg');

    const ringBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ringBg.setAttribute('class', 'ringBg');
    ringBg.setAttribute('cx', '36');
    ringBg.setAttribute('cy', '36');
    ringBg.setAttribute('r', '30');

    this.ringFgEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle',
    );
    this.ringFgEl.setAttribute('class', 'ringFg');
    this.ringFgEl.setAttribute('cx', '36');
    this.ringFgEl.setAttribute('cy', '36');
    this.ringFgEl.setAttribute('r', '30');
    ringSvg.append(ringBg, this.ringFgEl);
    ringWrap.appendChild(ringSvg);

    const valueRow = document.createElement('div');
    valueRow.className = 'valueRow';
    valueRow.setAttribute('part', 'value-row');

    const value = document.createElement('div');
    value.className = 'value';
    value.setAttribute('part', 'value');
    const valueSlot = document.createElement('slot');
    valueSlot.name = 'value';
    value.appendChild(valueSlot);

    const trend = document.createElement('div');
    trend.className = 'trend';
    trend.setAttribute('part', 'trend');
    const trendSlot = document.createElement('slot');
    trendSlot.name = 'trend';
    trend.appendChild(trendSlot);

    const compare = document.createElement('div');
    compare.className = 'compare';
    compare.setAttribute('part', 'compare');
    const compareSlot = document.createElement('slot');
    compareSlot.name = 'compare';
    compare.appendChild(compareSlot);

    valueRow.append(value, trend, compare);

    const secondary = document.createElement('div');
    secondary.className = 'secondary';
    secondary.setAttribute('part', 'secondary');

    const secLabel = document.createElement('div');
    secLabel.className = 'secLabel';
    const secLabelSlot = document.createElement('slot');
    secLabelSlot.name = 'secondary-label';
    secLabel.appendChild(secLabelSlot);

    const secValue = document.createElement('div');
    secValue.className = 'secValue';
    const secValueSlot = document.createElement('slot');
    secValueSlot.name = 'secondary-value';
    secValue.appendChild(secValueSlot);
    secondary.append(secLabel, secValue);

    body.append(ringWrap, valueRow, secondary);

    const meter = document.createElement('div');
    meter.className = 'meter';
    meter.setAttribute('part', 'meter');
    const meterFill = document.createElement('span');
    meterFill.className = 'meterFill';
    meterFill.setAttribute('part', 'meter-fill');
    meter.appendChild(meterFill);

    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.setAttribute('part', 'spark');
    spark.setAttribute('aria-hidden', 'true');
    spark.innerHTML = `<svg viewBox="0 0 76 32" preserveAspectRatio="none"><path class="sparkArea" d="${SPARK_PATH} L74 32 L2 32 Z"/><path class="sparkLine" d="${SPARK_PATH}" fill="none"/></svg>`;

    const period = document.createElement('div');
    period.className = 'period';
    period.setAttribute('part', 'period');
    const periodSlot = document.createElement('slot');
    periodSlot.name = 'period';
    period.appendChild(periodSlot);

    this.rootEl.append(head, body, meter, spark, period);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolveKpiVariant(this.getAttribute('variant'));
    const tone = resolveKpiTone(this.getAttribute('tone'));
    const progress = resolveKpiProgress(this.getAttribute('progress'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.style.setProperty('--gob-kpi-progress', `${progress}%`);

    const circumference = 2 * Math.PI * 30;
    const offset = circumference * (1 - progress / 100);
    this.ringFgEl.style.strokeDasharray = `${circumference}`;
    this.ringFgEl.style.strokeDashoffset = `${offset}`;

    const trend = this.rootEl.querySelector('.trend') as HTMLElement | null;
    if (trend) {
      if (variant === 'trend-down') trend.dataset.dir = 'down';
      else trend.dataset.dir = 'up';
    }
  }
}

defineCustomElement('gob-kpi-card', GobKpiCardElement);

export {};
