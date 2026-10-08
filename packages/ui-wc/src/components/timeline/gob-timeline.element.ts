import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TIMELINE_OBSERVED_ATTRIBUTES,
  resolveTimelineTone,
  resolveTimelineVariant,
  timelineLightDomStyles,
} from './timeline-constants';
import { timelineStyles } from './timeline-styles';

const LIGHT_STYLE_ID = 'gob-timeline-light-dom-v6';

function ensureLightDomStyles() {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById(LIGHT_STYLE_ID);
  if (existing) {
    existing.textContent = timelineLightDomStyles;
    return;
  }
  const style = document.createElement('style');
  style.id = LIGHT_STYLE_ID;
  style.textContent = timelineLightDomStyles;
  document.head.appendChild(style);
}

class GobTimelineElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TIMELINE_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = timelineStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'list');
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
    this.rootEl.dataset.variant = resolveTimelineVariant(
      this.getAttribute('variant'),
    );
    this.rootEl.dataset.tone = resolveTimelineTone(this.getAttribute('tone'));
  }
}

defineCustomElement('gob-timeline', GobTimelineElement);

export {};
