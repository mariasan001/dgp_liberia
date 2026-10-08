import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TOOLTIP_OBSERVED_ATTRIBUTES,
  resolveTooltipPlacement,
  resolveTooltipVariant,
} from './tooltip-constants';
import { tooltipStyles } from './tooltip-styles';

class GobTooltipElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TOOLTIP_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly triggerEl: HTMLButtonElement;
  private readonly bubbleEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = tooltipStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.triggerEl = document.createElement('button');
    this.triggerEl.type = 'button';
    this.triggerEl.className = 'trigger';
    this.triggerEl.setAttribute('part', 'trigger');

    this.bubbleEl = document.createElement('div');
    this.bubbleEl.className = 'bubble';
    this.bubbleEl.setAttribute('part', 'bubble');
    this.bubbleEl.setAttribute('role', 'tooltip');

    this.rootEl.append(this.triggerEl, this.bubbleEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveTooltipVariant(this.getAttribute('variant'));
    const placement = resolveTooltipPlacement(this.getAttribute('placement'));
    const label =
      this.getAttribute('label')?.trim() ||
      'Ayuda contextual del control.';
    const trigger =
      this.getAttribute('trigger')?.trim() ||
      this.textContent?.trim() ||
      'Pasa el cursor';
    const open = this.hasAttribute('open');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.placement = placement;
    this.rootEl.dataset.open = open ? 'true' : 'false';

    this.triggerEl.textContent = trigger;
    this.triggerEl.setAttribute('aria-describedby', 'tip');
    this.bubbleEl.id = 'tip';
    this.bubbleEl.textContent = label;
  }
}

defineCustomElement('gob-tooltip', GobTooltipElement);
export {};
