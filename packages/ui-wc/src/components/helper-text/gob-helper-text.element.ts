import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  HELPER_ICONS,
  HELPER_TEXT_OBSERVED_ATTRIBUTES,
  resolveHelperTextTone,
  resolveHelperTextVariant,
} from './helper-text-constants';
import { helperTextStyles } from './helper-text-styles';

class GobHelperTextElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...HELPER_TEXT_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly iconEl: HTMLElement;
  private readonly bodyEl: HTMLElement;
  private readonly labelEl: HTMLElement;
  private readonly counterEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = helperTextStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'icon';
    this.iconEl.setAttribute('aria-hidden', 'true');

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'body';

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'label';

    this.counterEl = document.createElement('span');
    this.counterEl.className = 'counter';

    this.bodyEl.append(this.labelEl, this.counterEl);
    this.rootEl.append(this.iconEl, this.bodyEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveHelperTextVariant(this.getAttribute('variant'));
    const tone = resolveHelperTextTone(this.getAttribute('tone'));
    const label =
      this.getAttribute('label')?.trim() ||
      this.textContent?.trim() ||
      'Texto de apoyo del campo.';
    const count = this.getAttribute('count');
    const max = this.getAttribute('max');
    const hasCounter =
      variant === 'counter' || (count != null && count !== '');

    const iconKey =
      variant === 'error'
        ? 'danger'
        : variant === 'hint' || variant === 'icon'
          ? 'hint'
          : variant === 'success' ||
              variant === 'warning' ||
              variant === 'info'
            ? variant
            : tone === 'danger'
              ? 'danger'
              : tone === 'success' || tone === 'warning' || tone === 'info'
                ? tone
                : null;

    const showIcon =
      Boolean(iconKey) ||
      variant === 'icon' ||
      variant === 'error' ||
      variant === 'complete';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.hasIcon = showIcon ? 'true' : 'false';
    this.rootEl.dataset.hasCounter = hasCounter ? 'true' : 'false';

    if (variant === 'error') {
      this.rootEl.setAttribute('role', 'alert');
    } else {
      this.rootEl.removeAttribute('role');
    }

    this.labelEl.textContent = label;
    this.iconEl.innerHTML = showIcon
      ? HELPER_ICONS[iconKey || 'hint'] || HELPER_ICONS.hint
      : '';

    if (hasCounter) {
      const c = count?.trim() || '0';
      const m = max?.trim();
      this.counterEl.textContent = m ? `${c}/${m}` : c;
    } else {
      this.counterEl.textContent = '';
    }
  }
}

defineCustomElement('gob-helper-text', GobHelperTextElement);
export {};
