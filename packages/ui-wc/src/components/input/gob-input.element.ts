import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  INPUT_OBSERVED_ATTRIBUTES,
  resolveInputSize,
  resolveInputStatus,
  resolveInputVariant,
  type InputVariant,
} from './input-constants';
import { inputStyles } from './input-styles';

const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.6"/><path d="M16.2 16.2L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.25" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 18.5c1.6-2.6 3.8-3.9 6.5-3.9s4.9 1.3 6.5 3.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.8 12s3.4-6 9.2-6 9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6"/></svg>`,
  eyeOff: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4l16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9.5 9.6A3 3 0 0 0 14.4 14.5M7.1 7.3C4.7 8.7 3 12 3 12s3.4 6 9 6c1.7 0 3.2-.5 4.5-1.2M10.2 6.3C10.8 6.1 11.4 6 12 6c5.6 0 9 6 9 6a14.7 14.7 0 0 1-1.8 2.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="16.2" r="1" fill="currentColor"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 7.5L12 13l7.5-5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.2 4.8h2.3l1.1 3.2-1.5 1.1a11.5 11.5 0 0 0 5.3 5.3l1.1-1.5 3.2 1.1v2.3c0 .7-.5 1.3-1.2 1.4A14.7 14.7 0 0 1 6.8 6c.1-.7.7-1.2 1.4-1.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};

function statusPill(status: string): string {
  switch (status) {
    case 'error':
      return 'Error';
    case 'success':
      return 'Valido';
    case 'warning':
      return 'Revision';
    case 'info':
      return 'Info';
    default:
      return '';
  }
}

class GobInputElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...INPUT_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly field: HTMLInputElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly headEl: HTMLElement;
  private readonly pillEl: HTMLSpanElement;
  private readonly controlEl: HTMLElement;
  private readonly leadEl: HTMLSpanElement;
  private readonly trailEl: HTMLSpanElement;
  private readonly toggleBtn: HTMLButtonElement;
  private readonly clearBtn: HTMLButtonElement;
  private readonly floatLabelEl: HTMLSpanElement;
  private showPassword = false;

  private fieldId = `gob-in-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = inputStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';

    this.headEl = document.createElement('div');
    this.headEl.className = 'head';

    this.labelEl = document.createElement('label');
    this.labelEl.className = 'label';

    this.pillEl = document.createElement('span');
    this.pillEl.className = 'pill';
    this.pillEl.hidden = true;

    this.headEl.append(this.labelEl, this.pillEl);

    this.controlEl = document.createElement('div');
    this.controlEl.className = 'control';
    this.controlEl.setAttribute('part', 'control');

    this.floatLabelEl = document.createElement('span');
    this.floatLabelEl.className = 'float-label';
    this.floatLabelEl.hidden = true;

    this.leadEl = document.createElement('span');
    this.leadEl.className = 'affix';
    this.leadEl.hidden = true;

    this.field = document.createElement('input');
    this.field.className = 'field';
    this.field.setAttribute('part', 'input');

    this.trailEl = document.createElement('span');
    this.trailEl.className = 'affix';
    this.trailEl.hidden = true;

    this.toggleBtn = document.createElement('button');
    this.toggleBtn.type = 'button';
    this.toggleBtn.className = 'toggle';
    this.toggleBtn.hidden = true;
    this.toggleBtn.setAttribute('aria-label', 'Mostrar contrasena');

    this.clearBtn = document.createElement('button');
    this.clearBtn.type = 'button';
    this.clearBtn.className = 'clear';
    this.clearBtn.hidden = true;
    this.clearBtn.setAttribute('aria-label', 'Limpiar');
    this.clearBtn.innerHTML = ICONS.x;

    this.controlEl.append(
      this.floatLabelEl,
      this.leadEl,
      this.field,
      this.trailEl,
      this.clearBtn,
      this.toggleBtn,
    );

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    this.rootEl.append(this.headEl, this.controlEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.field.addEventListener('focus', this.onFocus);
    this.field.addEventListener('blur', this.onBlur);
    this.field.addEventListener('input', this.onInput);
    this.toggleBtn.addEventListener('click', this.onToggle);
    this.clearBtn.addEventListener('click', this.onClear);
    this.sync();
  }

  disconnectedCallback() {
    this.field.removeEventListener('focus', this.onFocus);
    this.field.removeEventListener('blur', this.onBlur);
    this.field.removeEventListener('input', this.onInput);
    this.toggleBtn.removeEventListener('click', this.onToggle);
    this.clearBtn.removeEventListener('click', this.onClear);
  }

  attributeChangedCallback() {
    this.sync();
  }

  private readonly onFocus = () => {
    this.rootEl.dataset.focused = 'true';
  };

  private readonly onBlur = () => {
    this.rootEl.dataset.focused = 'false';
  };

  private readonly onInput = () => {
    this.rootEl.dataset.filled = this.field.value ? 'true' : 'false';
    this.updateClearButton();
    this.dispatchEvent(
      new CustomEvent('gob-input', {
        detail: { value: this.field.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private readonly onToggle = () => {
    this.showPassword = !this.showPassword;
    this.sync();
  };

  private readonly onClear = () => {
    this.field.value = '';
    this.rootEl.dataset.filled = 'false';
    this.updateClearButton();
    this.field.focus();
    this.dispatchEvent(
      new CustomEvent('gob-input', {
        detail: { value: '' },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private updateClearButton() {
    const variant = resolveInputVariant(this.getAttribute('variant'));
    const show =
      variant === 'clearable' &&
      Boolean(this.field.value) &&
      !this.hasAttribute('disabled') &&
      !this.hasAttribute('readonly');
    this.clearBtn.hidden = !show;
  }

  private leadingFor(variant: InputVariant): string | null {
    if (variant === 'search' || variant === 'pill') return ICONS.search;
    if (variant === 'icon' || variant === 'complete') return ICONS.user;
    if (variant === 'soft') return ICONS.mail;
    return null;
  }

  private sync() {
    const variant = resolveInputVariant(this.getAttribute('variant'));
    const status = resolveInputStatus(this.getAttribute('status'));
    const size = resolveInputSize(this.getAttribute('size'));
    const label = this.getAttribute('label')?.trim() || '';
    const placeholder = this.getAttribute('placeholder') ?? '';
    const helper = this.getAttribute('helper')?.trim() || '';
    const lead = this.getAttribute('lead')?.trim() || '';
    const suffix = this.getAttribute('suffix')?.trim() || '';
    const name = this.getAttribute('name') ?? '';
    const rawType = this.getAttribute('type') || 'text';
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const required = this.hasAttribute('required');
    const value = this.getAttribute('value') ?? '';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.rootEl.dataset.readonly = readonly ? 'true' : 'false';

    const isFloating = variant === 'floating';
    const showLabel =
      !isFloating &&
      (Boolean(label) ||
        variant === 'labeled' ||
        variant === 'helper' ||
        variant === 'complete' ||
        variant === 'underline' ||
        variant === 'pill' ||
        variant === 'clearable' ||
        variant === 'code' ||
        variant === 'soft');
    this.headEl.hidden = !showLabel && status === 'default';
    this.labelEl.hidden = !showLabel;
    this.labelEl.replaceChildren();
    this.labelEl.append(document.createTextNode(label || 'Campo'));
    if (required) {
      const req = document.createElement('span');
      req.className = 'req';
      req.textContent = '*';
      this.labelEl.appendChild(req);
    }

    const pill = statusPill(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;

    this.field.id = this.fieldId;
    this.labelEl.htmlFor = this.fieldId;

    const isPassword = variant === 'password' || rawType === 'password';
    this.field.type = isPassword
      ? this.showPassword
        ? 'text'
        : 'password'
      : variant === 'search'
        ? 'search'
        : variant === 'soft'
          ? 'email'
          : rawType;
    this.field.placeholder = isFloating ? ' ' : placeholder;
    this.field.name = name;
    this.field.disabled = disabled;
    this.field.readOnly = readonly;
    this.field.required = required;
    if (variant === 'code') {
      this.field.maxLength = 6;
      this.field.autocomplete = 'one-time-code';
      this.field.inputMode = 'numeric';
    } else {
      this.field.removeAttribute('maxlength');
      this.field.autocomplete = 'on';
      this.field.inputMode = 'text';
    }
    if (this.field.value !== value) this.field.value = value;
    this.rootEl.dataset.filled = this.field.value ? 'true' : 'false';

    if (isFloating) {
      this.floatLabelEl.hidden = false;
      this.floatLabelEl.textContent = label || 'Etiqueta';
    } else {
      this.floatLabelEl.hidden = true;
      this.floatLabelEl.textContent = '';
    }

    const leadIcon = this.leadingFor(variant);
    const showPrefix =
      variant === 'prefix' || Boolean(lead) || variant === 'soft';
    const showSuffix = variant === 'suffix' || Boolean(suffix);
    const showStatusIcon =
      status === 'error' || status === 'success' || status === 'warning';

    if (showPrefix && lead) {
      this.leadEl.hidden = false;
      this.leadEl.textContent = lead;
      this.leadEl.innerHTML = '';
      this.leadEl.style.color = 'var(--gob-in-dorado)';
    } else if (leadIcon) {
      this.leadEl.hidden = false;
      this.leadEl.innerHTML = leadIcon;
      this.leadEl.style.color = '';
    } else {
      this.leadEl.hidden = true;
      this.leadEl.textContent = '';
      this.leadEl.innerHTML = '';
    }

    if (isPassword) {
      this.toggleBtn.hidden = false;
      this.toggleBtn.innerHTML = this.showPassword ? ICONS.eyeOff : ICONS.eye;
      this.toggleBtn.setAttribute(
        'aria-label',
        this.showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena',
      );
      this.trailEl.hidden = true;
      this.clearBtn.hidden = true;
    } else {
      this.toggleBtn.hidden = true;
      if (showSuffix && suffix) {
        this.trailEl.hidden = false;
        this.trailEl.textContent = suffix;
        this.trailEl.innerHTML = '';
      } else if (showStatusIcon) {
        this.trailEl.hidden = false;
        this.trailEl.innerHTML =
          status === 'success' ? ICONS.check : ICONS.alert;
        this.trailEl.textContent = '';
      } else {
        this.trailEl.hidden = true;
        this.trailEl.textContent = '';
        this.trailEl.innerHTML = '';
      }
      this.updateClearButton();
    }

    const showHelper =
      Boolean(helper) ||
      variant === 'helper' ||
      variant === 'complete' ||
      status !== 'default';
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent =
      helper ||
      (status === 'error'
        ? 'Revisa este campo'
        : status === 'success'
          ? 'Se ve correcto'
          : status === 'warning'
            ? 'Requiere revision'
            : '');
  }
}

defineCustomElement('gob-input', GobInputElement);

export {};
