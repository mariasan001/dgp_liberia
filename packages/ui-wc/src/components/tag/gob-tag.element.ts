import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TAG_CLOSE,
  TAG_OBSERVED_ATTRIBUTES,
  resolveTagIcon,
  resolveTagSize,
  resolveTagTone,
  resolveTagVariant,
} from './tag-constants';
import { tagStyles } from './tag-styles';

class GobTagElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TAG_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly iconEl: HTMLElement;
  private readonly labelEl: HTMLElement;
  private readonly removeBtn: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = tagStyles;

    this.rootEl = document.createElement('span');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'icon';
    this.iconEl.setAttribute('aria-hidden', 'true');

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'label';
    this.labelEl.setAttribute('part', 'label');

    this.removeBtn = document.createElement('button');
    this.removeBtn.type = 'button';
    this.removeBtn.className = 'remove';
    this.removeBtn.setAttribute('aria-label', 'Quitar');
    this.removeBtn.innerHTML = TAG_CLOSE;

    this.rootEl.append(this.iconEl, this.labelEl, this.removeBtn);
    shadow.append(style, this.rootEl);

    this.removeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.hasAttribute('disabled')) return;
      this.dispatchEvent(
        new CustomEvent('gob-tag', {
          detail: {
            action: 'remove',
            label: this.getAttribute('label') || this.labelEl.textContent,
          },
          bubbles: true,
          composed: true,
        }),
      );
      this.remove();
    });
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveTagVariant(this.getAttribute('variant'));
    const tone = resolveTagTone(this.getAttribute('tone'));
    const size = resolveTagSize(this.getAttribute('size'));
    const label =
      this.getAttribute('label')?.trim() ||
      this.textContent?.trim() ||
      'Etiqueta';
    const iconName = this.getAttribute('icon');
    const iconSvg = resolveTagIcon(iconName);
    const removable =
      this.hasAttribute('removable') ||
      variant === 'removable' ||
      variant === 'filter';
    const disabled = this.hasAttribute('disabled');
    const forceIcon = variant === 'icon' || variant === 'filter';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.removable = removable ? 'true' : 'false';
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.rootEl.dataset.hasIcon = iconSvg || forceIcon ? 'true' : 'false';

    this.labelEl.textContent = label;
    this.iconEl.innerHTML =
      iconSvg || (forceIcon ? resolveTagIcon('tag') || '' : '');
    this.removeBtn.hidden = !removable;
    this.removeBtn.disabled = disabled;
  }
}

defineCustomElement('gob-tag', GobTagElement);
export {};
