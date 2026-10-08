import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  DATA_GRID_OBSERVED_ATTRIBUTES,
  dataGridLightDomStyles,
  resolveDataGridTone,
  resolveDataGridVariant,
} from './data-grid-constants';
import { dataGridStyles } from './data-grid-styles';

const LIGHT_STYLE_ID = 'gob-data-grid-light-dom';

function ensureLightDomStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LIGHT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = LIGHT_STYLE_ID;
  style.textContent = dataGridLightDomStyles;
  document.head.appendChild(style);
}

class GobDataGridElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...DATA_GRID_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = dataGridStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const head = document.createElement('div');
    head.className = 'head';
    head.setAttribute('part', 'head');

    const headText = document.createElement('div');
    headText.className = 'headText';

    const title = document.createElement('div');
    title.className = 'title';
    const titleSlot = document.createElement('slot');
    titleSlot.name = 'title';
    title.appendChild(titleSlot);

    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    const subtitleSlot = document.createElement('slot');
    subtitleSlot.name = 'subtitle';
    subtitle.appendChild(subtitleSlot);

    headText.append(title, subtitle);

    const actions = document.createElement('div');
    actions.className = 'actions';
    const actionsSlot = document.createElement('slot');
    actionsSlot.name = 'actions';
    actions.appendChild(actionsSlot);

    head.append(headText, actions);

    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    tabs.setAttribute('part', 'tabs');
    const tabsSlot = document.createElement('slot');
    tabsSlot.name = 'tabs';
    tabs.appendChild(tabsSlot);

    const filters = document.createElement('div');
    filters.className = 'filters';
    filters.setAttribute('part', 'filters');
    const filtersSlot = document.createElement('slot');
    filtersSlot.name = 'filters';
    filters.appendChild(filtersSlot);

    const bulk = document.createElement('div');
    bulk.className = 'bulk';
    bulk.setAttribute('part', 'bulk');
    const bulkSlot = document.createElement('slot');
    bulkSlot.name = 'bulk';
    bulk.appendChild(bulkSlot);

    const scroll = document.createElement('div');
    scroll.className = 'scroll';
    scroll.setAttribute('part', 'scroll');
    const defaultSlot = document.createElement('slot');
    scroll.appendChild(defaultSlot);

    const foot = document.createElement('div');
    foot.className = 'foot';
    foot.setAttribute('part', 'foot');
    const footSlot = document.createElement('slot');
    footSlot.name = 'footer';
    foot.appendChild(footSlot);

    this.rootEl.append(head, tabs, filters, bulk, scroll, foot);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    ensureLightDomStyles();
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolveDataGridVariant(this.getAttribute('variant'));
    const tone = resolveDataGridTone(this.getAttribute('tone'));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
}

defineCustomElement('gob-data-grid', GobDataGridElement);

export {};
