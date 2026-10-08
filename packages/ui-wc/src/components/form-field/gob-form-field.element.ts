import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  FORM_FIELD_OBSERVED_ATTRIBUTES,
  resolveFormFieldSize,
  resolveFormFieldStatus,
  resolveFormFieldVariant,
  statusPill,
} from './form-field-constants';
import { formFieldStyles } from './form-field-styles';

class GobFormFieldElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...FORM_FIELD_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly headEl: HTMLElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly hintEl: HTMLElement;
  private readonly pillEl: HTMLElement;
  private readonly controlEl: HTMLElement;
  private readonly fallbackEl: HTMLElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly slotEl: HTMLSlotElement;
  private readonly fieldId = `gob-ff-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = formFieldStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.headEl = document.createElement('div');
    this.headEl.className = 'head';
    this.headEl.setAttribute('part', 'head');

    this.labelEl = document.createElement('label');
    this.labelEl.className = 'label';
    this.labelEl.setAttribute('part', 'label');

    this.hintEl = document.createElement('span');
    this.hintEl.className = 'hint';
    this.hintEl.setAttribute('part', 'hint');

    this.pillEl = document.createElement('span');
    this.pillEl.className = 'pill';
    this.pillEl.setAttribute('part', 'pill');

    this.headEl.append(this.labelEl, this.hintEl, this.pillEl);

    const row = document.createElement('div');
    row.className = 'control-row';
    row.setAttribute('part', 'control-row');

    this.controlEl = document.createElement('div');
    this.controlEl.className = 'control';
    this.controlEl.setAttribute('part', 'control');

    this.slotEl = document.createElement('slot');
    this.fallbackEl = document.createElement('div');
    this.fallbackEl.className = 'fallback';
    this.fallbackEl.textContent = 'Control del formulario';
    this.fallbackEl.hidden = true;
    this.controlEl.append(this.slotEl, this.fallbackEl);

    const endSlot = document.createElement('slot');
    endSlot.name = 'end';
    row.append(this.controlEl, endSlot);

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.setAttribute('part', 'helper');
    this.helperEl.hidden = true;

    this.rootEl.append(this.headEl, row, this.helperEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.slotEl.addEventListener('slotchange', this.onSlotChange);
    this.syncFromAttributes();
    this.onSlotChange();
  }

  disconnectedCallback() {
    this.slotEl.removeEventListener('slotchange', this.onSlotChange);
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private readonly onSlotChange = () => {
    const hasNodes = this.slotEl.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      return Boolean(node.textContent?.trim());
    });
    this.fallbackEl.hidden = hasNodes;
  };

  private syncFromAttributes() {
    const variant = resolveFormFieldVariant(this.getAttribute('variant'));
    const status = resolveFormFieldStatus(this.getAttribute('status'));
    const size = resolveFormFieldSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    const required = this.hasAttribute('required');
    const label = this.getAttribute('label')?.trim() || '';
    const helper = this.getAttribute('helper')?.trim() || '';
    const hint = this.getAttribute('hint')?.trim() || '';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';

    const showLabel =
      Boolean(label) ||
      variant === 'labeled' ||
      variant === 'helper' ||
      variant === 'horizontal' ||
      variant === 'stacked' ||
      variant === 'inline' ||
      variant === 'complete';

    this.labelEl.hidden = !showLabel;
    this.labelEl.htmlFor = this.fieldId;
    this.labelEl.innerHTML = '';
    if (showLabel) {
      this.labelEl.append(document.createTextNode(label || 'Campo'));
      if (required) {
        const req = document.createElement('span');
        req.className = 'req';
        req.textContent = '*';
        this.labelEl.append(req);
      }
    }

    this.hintEl.hidden = !hint;
    this.hintEl.textContent = hint;

    const pill = statusPill(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.headEl.hidden = !showLabel && !hint && !pill;

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
          ? 'Campo valido'
          : status === 'warning'
            ? 'Revisa la informacion'
            : status === 'info'
              ? 'Dato de apoyo'
              : '');
  }
}

defineCustomElement('gob-form-field', GobFormFieldElement);

export {};
