import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  LINK_ICONS,
  LINK_OBSERVED_ATTRIBUTES,
  resolveLinkSize,
  resolveLinkTone,
  resolveLinkVariant,
} from './link-constants';
import { linkStyles } from './link-styles';

class GobLinkElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...LINK_OBSERVED_ATTRIBUTES];
  }

  private readonly anchorEl: HTMLAnchorElement;
  private readonly labelEl: HTMLElement;
  private readonly iconEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = linkStyles;

    this.anchorEl = document.createElement('a');
    this.anchorEl.className = 'root';
    this.anchorEl.setAttribute('part', 'root');

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'label';
    this.labelEl.setAttribute('part', 'label');

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'icon';
    this.iconEl.setAttribute('aria-hidden', 'true');
    this.iconEl.setAttribute('part', 'icon');

    this.anchorEl.append(this.labelEl, this.iconEl);
    shadow.append(style, this.anchorEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveLinkVariant(this.getAttribute('variant'));
    const tone = resolveLinkTone(this.getAttribute('tone'));
    const size = resolveLinkSize(this.getAttribute('size'));
    const href = this.getAttribute('href')?.trim() || '#';
    const label =
      this.getAttribute('label')?.trim() ||
      this.textContent?.trim() ||
      'Enlace';
    const external =
      this.hasAttribute('external') || variant === 'external' || variant === 'complete';
    const disabled = this.hasAttribute('disabled');

    this.anchorEl.dataset.variant = variant;
    this.anchorEl.dataset.tone = tone;
    this.anchorEl.dataset.size = size;
    this.anchorEl.dataset.external = external ? 'true' : 'false';
    this.anchorEl.dataset.disabled = disabled ? 'true' : 'false';

    this.anchorEl.href = disabled ? '#' : href;
    if (disabled) this.anchorEl.setAttribute('aria-disabled', 'true');
    else this.anchorEl.removeAttribute('aria-disabled');

    if (external && !disabled) {
      this.anchorEl.target = '_blank';
      this.anchorEl.rel = 'noopener noreferrer';
    } else {
      this.anchorEl.removeAttribute('target');
      this.anchorEl.removeAttribute('rel');
    }

    this.labelEl.textContent = label;
    this.iconEl.innerHTML =
      variant === 'nav' ? LINK_ICONS.arrow : LINK_ICONS.external;
  }
}

defineCustomElement('gob-link', GobLinkElement);
export {};
