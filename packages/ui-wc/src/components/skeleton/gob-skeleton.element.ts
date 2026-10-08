import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import { SKELETON_OBSERVED_ATTRIBUTES } from './skeleton-constants';
import {
  renderSkeletonMarkup,
  resolveSkeletonAnimated,
  resolveSkeletonRows,
  resolveSkeletonVariant,
} from './skeleton-render';
import { skeletonStyles } from './skeleton-styles';

class GobSkeletonElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SKELETON_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = skeletonStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'status');
    this.rootEl.setAttribute('aria-live', 'polite');
    this.rootEl.setAttribute('aria-busy', 'true');

    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.sync();
  }

  attributeChangedCallback() {
    this.sync();
  }

  private sync() {
    const variant = resolveSkeletonVariant(this.getAttribute('variant'));
    const rows = resolveSkeletonRows(this.getAttribute('rows'));
    const animated = resolveSkeletonAnimated(this.getAttribute('animated'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.animated = animated ? 'true' : 'false';
    this.rootEl.setAttribute('aria-label', 'Cargando contenido');
    this.rootEl.innerHTML = renderSkeletonMarkup(variant, rows);
  }
}

defineCustomElement('gob-skeleton', GobSkeletonElement);

export {};
