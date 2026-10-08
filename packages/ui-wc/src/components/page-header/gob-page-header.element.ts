import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  PAGE_HEADER_OBSERVED_ATTRIBUTES,
  resolvePageHeaderSurface,
  resolvePageHeaderVariant,
  type PageHeaderSurface,
} from './page-header-constants';
import { pageHeaderStyles } from './page-header-styles';

class GobPageHeaderElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...PAGE_HEADER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = pageHeaderStyles;

    this.rootEl = document.createElement('header');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.setAttribute('part', 'breadcrumb');
    const breadcrumbSlot = document.createElement('slot');
    breadcrumbSlot.name = 'breadcrumb';
    breadcrumb.appendChild(breadcrumbSlot);

    const top = document.createElement('div');
    top.className = 'top';
    top.setAttribute('part', 'top');

    const main = document.createElement('div');
    main.className = 'main';
    main.setAttribute('part', 'main');

    const titleRow = document.createElement('div');
    titleRow.className = 'titleRow';
    titleRow.setAttribute('part', 'title-row');

    const title = document.createElement('div');
    title.className = 'title';
    title.setAttribute('part', 'title');
    const titleSlot = document.createElement('slot');
    titleSlot.name = 'title';
    title.appendChild(titleSlot);

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.setAttribute('part', 'meta');
    const metaSlot = document.createElement('slot');
    metaSlot.name = 'meta';
    meta.appendChild(metaSlot);

    titleRow.append(title, meta);

    const description = document.createElement('div');
    description.className = 'description';
    description.setAttribute('part', 'description');
    const descriptionSlot = document.createElement('slot');
    descriptionSlot.name = 'description';
    description.appendChild(descriptionSlot);

    main.append(titleRow, description);

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.setAttribute('part', 'actions');
    actions.appendChild(document.createElement('slot'));

    top.append(main, actions);
    this.rootEl.append(breadcrumb, top);
    shadow.append(style, this.rootEl);
  }

  get surface(): PageHeaderSurface {
    return resolvePageHeaderSurface(this.getAttribute('surface'));
  }

  set surface(value: PageHeaderSurface | string | null) {
    const next = resolvePageHeaderSurface(value == null ? null : String(value));
    if (next === 'plain') {
      // plain es el default: dejamos el attr explicito para que React/CSS lo lean
      this.setAttribute('surface', 'plain');
    } else {
      this.setAttribute('surface', next);
    }
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolvePageHeaderVariant(this.getAttribute('variant'));
    const surface = resolvePageHeaderSurface(this.getAttribute('surface'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.surface = surface;
  }
}

defineCustomElement('gob-page-header', GobPageHeaderElement);

export {};
