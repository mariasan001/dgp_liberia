import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import { BUTTON_ARIA_ATTRIBUTES, BUTTON_OBSERVED_ATTRIBUTES, resolveButtonType } from './button-constants';
import { buttonStyles } from './button-styles';

const CARET_SVG = `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

class GobButtonElement extends SafeHTMLElement {
  static readonly formAssociated = true;

  static get observedAttributes() {
    return [...BUTTON_OBSERVED_ATTRIBUTES];
  }

  private readonly internalsHandle: ElementInternals | null;
  private readonly buttonEl: HTMLButtonElement;
  private readonly caretEl: HTMLSpanElement;
  private readonly spinnerSelector = '.spinner';
  private fieldsetDisabled = false;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.internalsHandle = typeof this.attachInternals === 'function' ? this.attachInternals() : null;

    const style = document.createElement('style');
    style.textContent = buttonStyles;

    this.buttonEl = document.createElement('button');
    this.buttonEl.className = 'main';

    const content = document.createElement('span');
    content.className = 'content';

    const iconWrap = document.createElement('span');
    iconWrap.className = 'icon';
    const iconSlot = document.createElement('slot');
    iconSlot.name = 'icon';
    iconWrap.appendChild(iconSlot);

    const labelWrap = document.createElement('span');
    labelWrap.className = 'label';
    labelWrap.appendChild(document.createElement('slot'));

    content.append(iconWrap, labelWrap);

    this.caretEl = document.createElement('span');
    this.caretEl.className = 'caret';
    this.caretEl.setAttribute('aria-hidden', 'true');
    this.caretEl.innerHTML = CARET_SVG;

    this.buttonEl.append(content, this.caretEl);
    shadow.append(style, this.buttonEl);
  }

  connectedCallback() {
    this.buttonEl.addEventListener('click', this.handleClick);
    this.syncButtonState();
  }

  disconnectedCallback() {
    this.buttonEl.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback() {
    this.syncButtonState();
  }

  formDisabledCallback(disabled: boolean) {
    this.fieldsetDisabled = disabled;
    this.syncButtonState();
  }

  formResetCallback() {
    this.removeAttribute('loading');
  }

  private readonly handleClick = (event: MouseEvent) => {
    if (this.buttonEl.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const form = this.internalsHandle?.form ?? this.closest('form');
    if (!form) {
      return;
    }

    if (this.buttonEl.type === 'submit') {
      event.preventDefault();
      form.requestSubmit();
      return;
    }

    if (this.buttonEl.type === 'reset') {
      event.preventDefault();
      form.reset();
    }
  };

  private syncButtonState() {
    const loading = this.hasAttribute('loading');
    const disabled = this.hasAttribute('disabled') || this.fieldsetDisabled || loading;
    const iconOnly = this.hasAttribute('icon-only');
    const iconPosition = this.getAttribute('icon-position');
    const appearance = this.getAttribute('appearance') || 'solid';
    const demo = this.getAttribute('demo-state');
    const hasIcon = iconOnly || iconPosition === 'left' || iconPosition === 'right';

    this.buttonEl.dataset.tone = this.getAttribute('tone') || 'primary';
    this.buttonEl.dataset.appearance = appearance;
    this.buttonEl.dataset.size = this.getAttribute('size') || 'md';
    this.buttonEl.dataset.iconOnly = iconOnly ? 'true' : 'false';
    this.buttonEl.dataset.hasIcon = hasIcon ? 'true' : 'false';
    this.buttonEl.dataset.iconPos = iconPosition === 'right' ? 'right' : 'left';
    this.buttonEl.dataset.disabled = disabled ? 'true' : 'false';

    if (demo === 'hover' || demo === 'pressed') {
      this.buttonEl.dataset.demo = demo;
    } else {
      delete this.buttonEl.dataset.demo;
    }

    this.buttonEl.type = resolveButtonType(this.getAttribute('type'));
    this.buttonEl.disabled = disabled;
    this.buttonEl.setAttribute('aria-busy', loading ? 'true' : 'false');
    this.buttonEl.name = this.getAttribute('name') || '';
    this.buttonEl.value = this.getAttribute('value') || '';

    for (const attribute of BUTTON_ARIA_ATTRIBUTES) {
      const value = this.getAttribute(attribute);
      if (value === null) {
        this.buttonEl.removeAttribute(attribute);
      } else {
        this.buttonEl.setAttribute(attribute, value);
      }
    }

    const spinner = this.buttonEl.querySelector(this.spinnerSelector);
    const content = this.buttonEl.querySelector('.content');

    if (loading && !spinner) {
      const spinnerEl = document.createElement('span');
      spinnerEl.className = 'spinner';
      spinnerEl.setAttribute('aria-hidden', 'true');
      if (content) {
        content.insertBefore(spinnerEl, content.firstChild);
      } else {
        this.buttonEl.insertBefore(spinnerEl, this.buttonEl.firstChild);
      }
    }

    if (!loading && spinner) {
      spinner.remove();
    }
  }
}

defineCustomElement('gob-button', GobButtonElement);

export {};
