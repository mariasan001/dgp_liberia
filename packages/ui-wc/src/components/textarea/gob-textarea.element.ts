import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TEXTAREA_OBSERVED_ATTRIBUTES,
  resolveTextareaSize,
  resolveTextareaStatus,
  resolveTextareaVariant,
} from './textarea-constants';
import { textareaStyles } from './textarea-styles';

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

class GobTextareaElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TEXTAREA_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly field: HTMLTextAreaElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly counterEl: HTMLParagraphElement;
  private readonly headEl: HTMLElement;
  private readonly footEl: HTMLElement;
  private readonly pillEl: HTMLSpanElement;
  private readonly controlEl: HTMLElement;
  private readonly floatLabelEl: HTMLSpanElement;

  private fieldId = `gob-ta-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = textareaStyles;

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

    this.field = document.createElement('textarea');
    this.field.className = 'field';
    this.field.setAttribute('part', 'textarea');

    this.controlEl.append(this.floatLabelEl, this.field);

    this.footEl = document.createElement('div');
    this.footEl.className = 'foot';

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    this.counterEl = document.createElement('p');
    this.counterEl.className = 'counter';
    this.counterEl.hidden = true;

    this.footEl.append(this.helperEl, this.counterEl);
    this.rootEl.append(this.headEl, this.controlEl, this.footEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.field.addEventListener('focus', this.onFocus);
    this.field.addEventListener('blur', this.onBlur);
    this.field.addEventListener('input', this.onInput);
    this.sync();
  }

  disconnectedCallback() {
    this.field.removeEventListener('focus', this.onFocus);
    this.field.removeEventListener('blur', this.onBlur);
    this.field.removeEventListener('input', this.onInput);
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
    this.updateCounter();
    this.autoGrow();
    this.dispatchEvent(
      new CustomEvent('gob-textarea', {
        detail: { value: this.field.value },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private updateCounter() {
    const variant = resolveTextareaVariant(this.getAttribute('variant'));
    const maxAttr = this.getAttribute('maxlength');
    const max =
      maxAttr && !Number.isNaN(Number(maxAttr))
        ? Number(maxAttr)
        : variant === 'counter'
          ? 280
          : 0;
    const show = variant === 'counter' || max > 0;
    this.counterEl.hidden = !show;
    if (!show) return;

    const len = this.field.value.length;
    const limit = max > 0 ? max : 280;
    this.counterEl.textContent = `${len}/${limit}`;
    this.counterEl.dataset.warn = len >= limit * 0.85 ? 'true' : 'false';
    this.counterEl.dataset.over = len >= limit ? 'true' : 'false';
  }

  private autoGrow() {
    const variant = resolveTextareaVariant(this.getAttribute('variant'));
    if (variant !== 'auto') {
      this.field.style.height = '';
      return;
    }
    this.field.style.height = 'auto';
    this.field.style.height = `${Math.max(this.field.scrollHeight, 72)}px`;
  }

  private sync() {
    const variant = resolveTextareaVariant(this.getAttribute('variant'));
    const status = resolveTextareaStatus(this.getAttribute('status'));
    const size = resolveTextareaSize(this.getAttribute('size'));
    const label = this.getAttribute('label')?.trim() || '';
    const placeholder = this.getAttribute('placeholder') ?? '';
    const helper = this.getAttribute('helper')?.trim() || '';
    const name = this.getAttribute('name') ?? '';
    const rowsAttr = this.getAttribute('rows');
    const maxAttr = this.getAttribute('maxlength');
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
        variant === 'counter' ||
        variant === 'auto' ||
        variant === 'dense' ||
        variant === 'filled' ||
        variant === 'soft' ||
        variant === 'resize' ||
        variant === 'code' ||
        variant === 'complete');

    this.headEl.hidden = !showLabel && status === 'default';
    this.labelEl.hidden = !showLabel;
    this.labelEl.replaceChildren();
    this.labelEl.append(document.createTextNode(label || 'Area de texto'));
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
    this.field.placeholder = isFloating ? ' ' : placeholder;
    this.field.name = name;
    this.field.disabled = disabled;
    this.field.readOnly = readonly;
    this.field.required = required;

    const rows =
      rowsAttr && !Number.isNaN(Number(rowsAttr))
        ? Number(rowsAttr)
        : variant === 'dense'
          ? 2
          : variant === 'auto'
            ? 2
            : 4;
    this.field.rows = rows;

    if (maxAttr && !Number.isNaN(Number(maxAttr))) {
      this.field.maxLength = Number(maxAttr);
    } else if (variant === 'counter') {
      this.field.maxLength = 280;
    } else {
      this.field.removeAttribute('maxlength');
    }

    if (this.field.value !== value) this.field.value = value;
    this.rootEl.dataset.filled = this.field.value ? 'true' : 'false';

    if (isFloating) {
      this.floatLabelEl.hidden = false;
      this.floatLabelEl.textContent = label || 'Observaciones';
    } else {
      this.floatLabelEl.hidden = true;
      this.floatLabelEl.textContent = '';
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

    this.updateCounter();
    this.autoGrow();
    this.footEl.hidden = this.helperEl.hidden && this.counterEl.hidden;
  }
}

defineCustomElement('gob-textarea', GobTextareaElement);

export {};
