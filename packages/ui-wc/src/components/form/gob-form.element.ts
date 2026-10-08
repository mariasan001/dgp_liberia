import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  FORM_OBSERVED_ATTRIBUTES,
  resolveFormColumns,
  resolveFormGap,
  resolveFormVariant,
} from './form-constants';
import { formStyles } from './form-styles';

class GobFormElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...FORM_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly headEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descriptionEl: HTMLElement;
  private readonly bodyEl: HTMLElement;
  private readonly actionsEl: HTMLElement;
  private readonly actionsSlot: HTMLSlotElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = formStyles;

    this.rootEl = document.createElement('form');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.addEventListener('submit', (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('gob-form-submit', {
          detail: {},
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.headEl = document.createElement('div');
    this.headEl.className = 'head';
    this.headEl.setAttribute('part', 'head');

    this.titleEl = document.createElement('h3');
    this.titleEl.className = 'title';
    this.titleEl.setAttribute('part', 'title');

    this.descriptionEl = document.createElement('p');
    this.descriptionEl.className = 'description';
    this.descriptionEl.setAttribute('part', 'description');

    this.headEl.append(this.titleEl, this.descriptionEl);

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'body';
    this.bodyEl.setAttribute('part', 'body');
    this.bodyEl.appendChild(document.createElement('slot'));

    this.actionsEl = document.createElement('div');
    this.actionsEl.className = 'actions';
    this.actionsEl.setAttribute('part', 'actions');
    this.actionsSlot = document.createElement('slot');
    this.actionsSlot.name = 'actions';
    this.actionsEl.appendChild(this.actionsSlot);

    this.rootEl.append(this.headEl, this.bodyEl, this.actionsEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.actionsSlot.addEventListener('slotchange', this.onActionsChange);
    this.syncFromAttributes();
    this.onActionsChange();
  }

  disconnectedCallback() {
    this.actionsSlot.removeEventListener('slotchange', this.onActionsChange);
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private readonly onActionsChange = () => {
    const hasActions = this.actionsSlot.assignedNodes({ flatten: true }).length > 0;
    const variant = resolveFormVariant(this.getAttribute('variant'));
    this.actionsEl.hidden =
      !hasActions &&
      variant !== 'complete' &&
      variant !== 'panel' &&
      variant !== 'dashboard' &&
      variant !== 'toolbar' &&
      variant !== 'bleed';
  };

  private syncFromAttributes() {
    const variant = resolveFormVariant(this.getAttribute('variant'));
    const gap = resolveFormGap(this.getAttribute('gap'));
    const columns = resolveFormColumns(this.getAttribute('columns'), variant);
    const title = this.getAttribute('title')?.trim() || '';
    const description = this.getAttribute('description')?.trim() || '';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.gap = gap;
    this.rootEl.dataset.columns = String(columns);

    const showHead =
      Boolean(title) ||
      Boolean(description) ||
      variant === 'card' ||
      variant === 'sections' ||
      variant === 'complete' ||
      variant === 'outline' ||
      variant === 'rail' ||
      variant === 'inset' ||
      variant === 'flat' ||
      variant === 'wide' ||
      variant === 'split' ||
      variant === 'panel' ||
      variant === 'bleed' ||
      variant === 'dashboard';
    this.headEl.hidden = !showHead || variant === 'toolbar';
    this.titleEl.hidden =
      (!title &&
        variant !== 'complete' &&
        variant !== 'card' &&
        variant !== 'panel' &&
        variant !== 'dashboard') ||
      variant === 'toolbar';
    this.titleEl.textContent = title || 'Formulario';
    this.descriptionEl.hidden = !description || variant === 'dashboard' || variant === 'toolbar';
    this.descriptionEl.textContent = description;
    this.onActionsChange();
  }
}

defineCustomElement('gob-form', GobFormElement);

export {};
