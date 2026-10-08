import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TOOLBAR_OBSERVED_ATTRIBUTES,
  resolveToolbarTone,
  resolveToolbarVariant,
  toolbarLightDomStyles,
} from './toolbar-constants';
import { toolbarStyles } from './toolbar-styles';

const LIGHT_STYLE_ID = 'gob-toolbar-light-dom';

function ensureLightDomStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LIGHT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = LIGHT_STYLE_ID;
  style.textContent = toolbarLightDomStyles;
  document.head.appendChild(style);
}

class GobToolbarElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TOOLBAR_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = toolbarStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'toolbar');

    const start = document.createElement('div');
    start.className = 'start';
    start.setAttribute('part', 'start');
    const startSlot = document.createElement('slot');
    startSlot.name = 'start';
    start.appendChild(startSlot);

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.setAttribute('part', 'actions');
    actions.appendChild(document.createElement('slot'));

    const end = document.createElement('div');
    end.className = 'end';
    end.setAttribute('part', 'end');
    const endSlot = document.createElement('slot');
    endSlot.name = 'end';
    end.appendChild(endSlot);

    this.rootEl.append(start, actions, end);
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
    const variant = resolveToolbarVariant(this.getAttribute('variant'));
    const tone = resolveToolbarTone(this.getAttribute('tone'));
    const dense =
      this.hasAttribute('dense') && this.getAttribute('dense') !== 'false';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.dense = dense ? 'true' : 'false';
  }
}

defineCustomElement('gob-toolbar', GobToolbarElement);

export {};
