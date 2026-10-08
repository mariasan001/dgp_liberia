import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  ACTIVITY_FEED_OBSERVED_ATTRIBUTES,
  activityFeedLightDomStyles,
  resolveActivityFeedTone,
  resolveActivityFeedVariant,
} from './activity-feed-constants';
import { activityFeedStyles } from './activity-feed-styles';

const LIGHT_STYLE_ID = 'gob-activity-feed-light-dom-v3';

function ensureLightDomStyles() {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById(LIGHT_STYLE_ID);
  if (existing) {
    existing.textContent = activityFeedLightDomStyles;
    return;
  }
  const style = document.createElement('style');
  style.id = LIGHT_STYLE_ID;
  style.textContent = activityFeedLightDomStyles;
  document.head.appendChild(style);
}

class GobActivityFeedElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...ACTIVITY_FEED_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = activityFeedStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'feed');
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
    this.rootEl.dataset.variant = resolveActivityFeedVariant(
      this.getAttribute('variant'),
    );
    this.rootEl.dataset.tone = resolveActivityFeedTone(
      this.getAttribute('tone'),
    );
  }
}

defineCustomElement('gob-activity-feed', GobActivityFeedElement);

export {};
