import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  BADGE_OBSERVED_ATTRIBUTES,
  formatBadgeCount,
  resolveBadgeSize,
  resolveBadgeTone,
  resolveBadgeVariant,
} from './badge-constants';
import { badgeStyles } from './badge-styles';

class GobBadgeElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...BADGE_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly dotEl: HTMLElement;
  private readonly labelEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = badgeStyles;

    this.rootEl = document.createElement('span');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.dotEl = document.createElement('span');
    this.dotEl.className = 'dot';
    this.dotEl.setAttribute('aria-hidden', 'true');

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'label';

    this.rootEl.append(this.dotEl, this.labelEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveBadgeVariant(this.getAttribute('variant'));
    const tone = resolveBadgeTone(this.getAttribute('tone'));
    const size = resolveBadgeSize(this.getAttribute('size'));
    const label =
      this.getAttribute('label')?.trim() ||
      this.textContent?.trim() ||
      '';
    const count = formatBadgeCount(
      this.getAttribute('count'),
      this.getAttribute('max'),
    );

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.size = size;

    if (variant === 'dot') {
      this.labelEl.textContent = '';
      this.rootEl.setAttribute('aria-label', label || tone);
      return;
    }

    if (variant === 'count' || count) {
      this.labelEl.textContent = count || label || '0';
    } else {
      this.labelEl.textContent = label || 'Nuevo';
    }
  }
}

defineCustomElement('gob-badge', GobBadgeElement);
export {};
