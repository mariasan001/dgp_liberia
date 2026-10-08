import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  MODAL_OBSERVED_ATTRIBUTES,
  resolveModalIcon,
  resolveModalSize,
  resolveModalVariant,
} from './modal-constants';
import { modalStyles } from './modal-styles';

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

class GobModalElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...MODAL_OBSERVED_ATTRIBUTES];
  }

  private readonly backdropEl: HTMLElement;
  private readonly dialogEl: HTMLElement;
  private readonly handleEl: HTMLElement;
  private readonly iconEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly bodyEl: HTMLElement;
  private readonly confirmBtn: HTMLButtonElement;
  private readonly cancelBtn: HTMLButtonElement;
  private readonly closeBtn: HTMLButtonElement;
  private readonly titleId = `gob-md-title-${Math.random().toString(36).slice(2, 9)}`;
  private readonly descId = `gob-md-desc-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = modalStyles;

    this.backdropEl = document.createElement('div');
    this.backdropEl.className = 'backdrop';
    this.backdropEl.setAttribute('part', 'backdrop');

    this.dialogEl = document.createElement('div');
    this.dialogEl.className = 'dialog';
    this.dialogEl.setAttribute('part', 'dialog');
    this.dialogEl.setAttribute('role', 'dialog');
    this.dialogEl.setAttribute('aria-modal', 'true');
    this.dialogEl.setAttribute('aria-labelledby', this.titleId);
    this.dialogEl.setAttribute('aria-describedby', this.descId);

    this.handleEl = document.createElement('div');
    this.handleEl.className = 'handle';
    this.handleEl.setAttribute('aria-hidden', 'true');
    const handleBar = document.createElement('i');
    this.handleEl.appendChild(handleBar);

    const head = document.createElement('div');
    head.className = 'head';

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'icon';
    this.iconEl.setAttribute('aria-hidden', 'true');
    this.iconEl.setAttribute('part', 'icon');

    const copy = document.createElement('div');
    copy.className = 'copy';

    this.titleEl = document.createElement('h2');
    this.titleEl.className = 'title';
    this.titleEl.id = this.titleId;

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';
    this.descEl.id = this.descId;

    copy.append(this.titleEl, this.descEl);

    this.closeBtn = document.createElement('button');
    this.closeBtn.type = 'button';
    this.closeBtn.className = 'close';
    this.closeBtn.setAttribute('aria-label', 'Cerrar');
    this.closeBtn.setAttribute('part', 'close');
    this.closeBtn.innerHTML = CLOSE_SVG;

    head.append(this.iconEl, copy, this.closeBtn);

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'body';
    this.bodyEl.setAttribute('part', 'body');

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.setAttribute('part', 'actions');

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.type = 'button';
    this.cancelBtn.className = 'btn cancel';
    this.cancelBtn.setAttribute('part', 'cancel');

    this.confirmBtn = document.createElement('button');
    this.confirmBtn.type = 'button';
    this.confirmBtn.className = 'btn confirm';
    this.confirmBtn.setAttribute('part', 'confirm');

    actions.append(this.cancelBtn, this.confirmBtn);
    this.dialogEl.append(this.handleEl, head, this.bodyEl, actions);
    this.backdropEl.appendChild(this.dialogEl);
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
      new CustomEvent('gob-modal', {
        detail: { action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncFromAttributes() {
    const variant = resolveModalVariant(this.getAttribute('variant'));
    const size = resolveModalSize(this.getAttribute('size'));
    const preview = this.hasAttribute('preview');
    const title = this.getAttribute('title')?.trim() || 'Confirmar accion';
    const description =
      this.getAttribute('description')?.trim() ||
      'Revisa la informacion antes de continuar.';
    const body =
      this.getAttribute('body')?.trim() ||
      this.textContent?.trim() ||
      'Esta accion puede afectar el expediente seleccionado.';
    const confirm =
      this.getAttribute('confirm-label')?.trim() || 'Confirmar';
    const cancel = this.getAttribute('cancel-label')?.trim() || 'Cancelar';
    const icon = resolveModalIcon(variant);

    this.backdropEl.dataset.variant = variant;
    this.backdropEl.dataset.size = size;
    this.backdropEl.dataset.hasIcon = icon ? 'true' : 'false';
    this.backdropEl.dataset.preview = preview ? 'true' : 'false';

    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.bodyEl.textContent = body;
    this.confirmBtn.textContent = confirm;
    this.cancelBtn.textContent = cancel;
    this.iconEl.innerHTML = icon || '';

    this.dialogEl.setAttribute('aria-modal', preview ? 'false' : 'true');
    this.closeBtn.tabIndex = preview ? -1 : 0;
    this.closeBtn.setAttribute('aria-hidden', preview ? 'true' : 'false');
  }
}

defineCustomElement('gob-modal', GobModalElement);
export {};
