import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  EMPTY_STATE_OBSERVED_ATTRIBUTES,
  emptyStateLightDomStyles,
  resolveEmptyStateTone,
  resolveEmptyStateVariant,
} from './empty-state-constants';
import { emptyStateStyles } from './empty-state-styles';

const LIGHT_STYLE_ID = 'gob-empty-state-light-dom-v2';

function ensureLightDomStyles() {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById(LIGHT_STYLE_ID);
  if (existing) {
    existing.textContent = emptyStateLightDomStyles;
    return;
  }
  const style = document.createElement('style');
  style.id = LIGHT_STYLE_ID;
  style.textContent = emptyStateLightDomStyles;
  document.head.appendChild(style);
}

class GobEmptyStateElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...EMPTY_STATE_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = emptyStateStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.appendChild(document.createElement('slot'));

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
    this.rootEl.dataset.variant = resolveEmptyStateVariant(
      this.getAttribute('variant'),
    );
    this.rootEl.dataset.tone = resolveEmptyStateTone(this.getAttribute('tone'));
  }
}

defineCustomElement('gob-empty-state', GobEmptyStateElement);

export {};
