import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  CHART_CARD_OBSERVED_ATTRIBUTES,
  resolveChartCardTone,
  resolveChartCardVariant,
} from './chart-card-constants';
import { chartCardStyles } from './chart-card-styles';

class GobChartCardElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...CHART_CARD_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = chartCardStyles;

    this.rootEl = document.createElement('article');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const head = document.createElement('div');
    head.className = 'head';
    head.setAttribute('part', 'head');

    const headText = document.createElement('div');
    headText.className = 'headText';

    const title = document.createElement('div');
    title.className = 'title';
    title.setAttribute('part', 'title');
    const titleSlot = document.createElement('slot');
    titleSlot.name = 'title';
    title.appendChild(titleSlot);

    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.setAttribute('part', 'subtitle');
    const subtitleSlot = document.createElement('slot');
    subtitleSlot.name = 'subtitle';
    subtitle.appendChild(subtitleSlot);

    headText.append(title, subtitle);

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.setAttribute('part', 'actions');
    const actionsSlot = document.createElement('slot');
    actionsSlot.name = 'actions';
    actions.appendChild(actionsSlot);

    head.append(headText, actions);

    const main = document.createElement('div');
    main.className = 'main';
    main.setAttribute('part', 'main');

    const chart = document.createElement('div');
    chart.className = 'chart';
    chart.setAttribute('part', 'chart');
    const chartSlot = document.createElement('slot');
    chart.appendChild(chartSlot);

    const legend = document.createElement('div');
    legend.className = 'legend';
    legend.setAttribute('part', 'legend');
    const legendSlot = document.createElement('slot');
    legendSlot.name = 'legend';
    legend.appendChild(legendSlot);

    main.append(chart, legend);

    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.setAttribute('part', 'footer');
    const footerSlot = document.createElement('slot');
    footerSlot.name = 'footer';
    footer.appendChild(footerSlot);

    this.rootEl.append(head, main, footer);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolveChartCardVariant(this.getAttribute('variant'));
    const tone = resolveChartCardTone(this.getAttribute('tone'));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
}

defineCustomElement('gob-chart-card', GobChartCardElement);

export {};
