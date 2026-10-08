import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  CONFIRM_DIALOG_OBSERVED_ATTRIBUTES,
  resolveConfirmDialogVariant,
  resolveConfirmIcon,
} from './confirm-dialog-constants';
import { confirmDialogStyles } from './confirm-dialog-styles';

class GobConfirmDialogElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...CONFIRM_DIALOG_OBSERVED_ATTRIBUTES];
  }

  private readonly backdropEl: HTMLElement;
  private readonly dialogEl: HTMLElement;
  private readonly iconEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly bodyEl: HTMLElement;
  private readonly confirmBtn: HTMLButtonElement;
  private readonly cancelBtn: HTMLButtonElement;
  private readonly titleId = `gob-cd-title-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = confirmDialogStyles;

    this.backdropEl = document.createElement('div');
    this.backdropEl.className = 'backdrop';
    this.backdropEl.setAttribute('part', 'backdrop');

    this.dialogEl = document.createElement('div');
    this.dialogEl.className = 'dialog';
    this.dialogEl.setAttribute('part', 'dialog');
    this.dialogEl.setAttribute('role', 'alertdialog');
    this.dialogEl.setAttribute('aria-modal', 'true');
    this.dialogEl.setAttribute('aria-labelledby', this.titleId);

    const head = document.createElement('div');
    head.className = 'head';

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'icon';
    this.iconEl.setAttribute('aria-hidden', 'true');

    const copy = document.createElement('div');
    copy.className = 'copy';

    this.titleEl = document.createElement('h2');
    this.titleEl.className = 'title';
    this.titleEl.id = this.titleId;

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';

    copy.append(this.titleEl, this.descEl);
    head.append(this.iconEl, copy);

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'body';
    this.bodyEl.setAttribute('part', 'body');

    const actions = document.createElement('div');
    actions.className = 'actions';

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.type = 'button';
    this.cancelBtn.className = 'btn cancel';

    this.confirmBtn = document.createElement('button');
    this.confirmBtn.type = 'button';
    this.confirmBtn.className = 'btn confirm';

    actions.append(this.cancelBtn, this.confirmBtn);
    this.dialogEl.append(head, this.bodyEl, actions);
    this.backdropEl.appendChild(this.dialogEl);
    shadow.append(style, this.backdropEl);

    this.backdropEl.addEventListener('click', (event) => {
      if (this.hasAttribute('preview')) return;
      if (event.target === this.backdropEl) this.close('backdrop');
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
      new CustomEvent('gob-confirm-dialog', {
        detail: { action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncFromAttributes() {
    const variant = resolveConfirmDialogVariant(this.getAttribute('variant'));
    const preview = this.hasAttribute('preview');
    const title = this.getAttribute('title')?.trim() || 'Confirmar accion';
    const description =
      this.getAttribute('description')?.trim() ||
      'Esta decision puede tener efectos permanentes.';
    const body =
      this.getAttribute('body')?.trim() ||
      this.textContent?.trim() ||
      'Revisa el impacto antes de continuar.';
    const confirm =
      this.getAttribute('confirm-label')?.trim() || 'Confirmar';
    const cancel = this.getAttribute('cancel-label')?.trim() || 'Cancelar';

    this.backdropEl.dataset.variant = variant;
    this.backdropEl.dataset.preview = preview ? 'true' : 'false';

    this.iconEl.innerHTML = resolveConfirmIcon(variant);
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.bodyEl.textContent = body;
    this.confirmBtn.textContent = confirm;
    this.cancelBtn.textContent = cancel;
    this.dialogEl.setAttribute('aria-modal', preview ? 'false' : 'true');
  }
}

defineCustomElement('gob-confirm-dialog', GobConfirmDialogElement);
export {};
