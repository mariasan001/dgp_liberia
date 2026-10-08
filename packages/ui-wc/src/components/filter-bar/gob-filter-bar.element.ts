import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  FILTER_BAR_OBSERVED_ATTRIBUTES,
  filterBarLightDomStyles,
  resolveFilterBarTone,
  resolveFilterBarVariant,
} from './filter-bar-constants';
import { filterBarStyles } from './filter-bar-styles';

const LIGHT_STYLE_ID = 'gob-filter-bar-light-dom';

function ensureLightDomStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LIGHT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = LIGHT_STYLE_ID;
  style.textContent = filterBarLightDomStyles;
  document.head.appendChild(style);
}

class GobFilterBarElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...FILTER_BAR_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = filterBarStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'search');

    const search = document.createElement('div');
    search.className = 'search';
    search.setAttribute('part', 'search');
    const searchSlot = document.createElement('slot');
    searchSlot.name = 'search';
    search.appendChild(searchSlot);

    const filters = document.createElement('div');
    filters.className = 'filters';
    filters.setAttribute('part', 'filters');
    filters.appendChild(document.createElement('slot'));

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.setAttribute('part', 'actions');
    const actionsSlot = document.createElement('slot');
    actionsSlot.name = 'actions';
    actions.appendChild(actionsSlot);

    this.rootEl.append(search, filters, actions);
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
    const variant = resolveFilterBarVariant(this.getAttribute('variant'));
    const tone = resolveFilterBarTone(this.getAttribute('tone'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
}

defineCustomElement('gob-filter-bar', GobFilterBarElement);

export {};
