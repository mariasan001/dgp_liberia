import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  DRAWER_OBSERVED_ATTRIBUTES,
  resolveDrawerSide,
  resolveDrawerSize,
  resolveDrawerVariant,
} from './drawer-constants';
import { drawerStyles } from './drawer-styles';

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

class GobDrawerElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...DRAWER_OBSERVED_ATTRIBUTES];
  }

  private readonly backdropEl: HTMLElement;
  private readonly panelEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly bodyCardEl: HTMLElement;
  private readonly confirmBtn: HTMLButtonElement;
  private readonly cancelBtn: HTMLButtonElement;
  private readonly closeBtn: HTMLButtonElement;
  private readonly titleId = `gob-dr-title-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = drawerStyles;

    this.backdropEl = document.createElement('div');
    this.backdropEl.className = 'backdrop';
    this.backdropEl.setAttribute('part', 'backdrop');

    this.panelEl = document.createElement('aside');
    this.panelEl.className = 'panel';
    this.panelEl.setAttribute('part', 'panel');
    this.panelEl.setAttribute('role', 'dialog');
    this.panelEl.setAttribute('aria-modal', 'true');
    this.panelEl.setAttribute('aria-labelledby', this.titleId);

    const head = document.createElement('div');
    head.className = 'head';

    const copy = document.createElement('div');
    copy.className = 'copy';

    this.titleEl = document.createElement('h2');
    this.titleEl.className = 'title';
    this.titleEl.id = this.titleId;

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';

    copy.append(this.titleEl, this.descEl);

    this.closeBtn = document.createElement('button');
    this.closeBtn.type = 'button';
    this.closeBtn.className = 'close';
    this.closeBtn.setAttribute('aria-label', 'Cerrar');
    this.closeBtn.innerHTML = CLOSE_SVG;

    head.append(copy, this.closeBtn);

    const body = document.createElement('div');
    body.className = 'body';
    body.setAttribute('part', 'body');

    this.bodyCardEl = document.createElement('div');
    this.bodyCardEl.className = 'body-card';
    body.appendChild(this.bodyCardEl);

    const actions = document.createElement('div');
    actions.className = 'actions';

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.type = 'button';
    this.cancelBtn.className = 'btn cancel';

    this.confirmBtn = document.createElement('button');
    this.confirmBtn.type = 'button';
    this.confirmBtn.className = 'btn confirm';

    actions.append(this.cancelBtn, this.confirmBtn);
    this.panelEl.append(head, body, actions);
    this.backdropEl.appendChild(this.panelEl);
    shadow.append(style, this.backdropEl);

    this.backdropEl.addEventListener('click', (event) => {
      if (this.hasAttribute('preview')) return;
      if (event.target === this.backdropEl) this.close('backdrop');
    });
    this.closeBtn.addEventListener('click', () => {
      if (this.hasAttribute('preview')) return;
      this.close('close');
    });
    this.cancelBtn.addEventListener('click', () => {
      if (this.hasAttribute('preview')) return;
      this.close('cancel');
    });
    this.confirmBtn.addEventListener('click', () => {
      if (this.hasAttribute('preview')) return;
      this.close('confirm');
    });
  }

  connectedCallback() {
    document.addEventListener('keydown', this.onKeyDown);
    this.syncFromAttributes();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === 'Escape' &&
      this.hasAttribute('open') &&
      !this.hasAttribute('preview')
    ) {
      this.close('escape');
    }
  };

  private close(action: string) {
    this.removeAttribute('open');
    this.dispatchEvent(
      new CustomEvent('gob-drawer', {
        detail: { action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncFromAttributes() {
    const variant = resolveDrawerVariant(this.getAttribute('variant'));
    const side = resolveDrawerSide(this.getAttribute('side'), variant);
    const size = resolveDrawerSize(this.getAttribute('size'));
    const preview = this.hasAttribute('preview');
    const title = this.getAttribute('title')?.trim() || 'Detalle del expediente';
    const description =
      this.getAttribute('description')?.trim() ||
      'Revisa o edita la informacion lateral.';
    const body =
      this.getAttribute('body')?.trim() ||
      this.textContent?.trim() ||
      'Contenido del panel deslizable.';
    const confirm =
      this.getAttribute('confirm-label')?.trim() || 'Aplicar';
    const cancel = this.getAttribute('cancel-label')?.trim() || 'Cerrar';

    this.backdropEl.dataset.variant = variant;
    this.backdropEl.dataset.side = side;
    this.backdropEl.dataset.size = size;
    this.backdropEl.dataset.preview = preview ? 'true' : 'false';

    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.bodyCardEl.textContent = body;
    this.confirmBtn.textContent = confirm;
    this.cancelBtn.textContent = cancel;
    this.panelEl.setAttribute('aria-modal', preview ? 'false' : 'true');
    this.closeBtn.tabIndex = preview ? -1 : 0;
  }
}

defineCustomElement('gob-drawer', GobDrawerElement);
export {};
