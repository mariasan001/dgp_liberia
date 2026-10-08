import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SHEET_OBSERVED_ATTRIBUTES,
  resolveSheetVariant,
} from './sheet-constants';
import { sheetStyles } from './sheet-styles';

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

class GobSheetElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SHEET_OBSERVED_ATTRIBUTES];
  }

  private readonly backdropEl: HTMLElement;
  private readonly sheetEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly bodyCardEl: HTMLElement;
  private readonly confirmBtn: HTMLButtonElement;
  private readonly cancelBtn: HTMLButtonElement;
  private readonly closeBtn: HTMLButtonElement;
  private readonly titleId = `gob-sh-title-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = sheetStyles;

    this.backdropEl = document.createElement('div');
    this.backdropEl.className = 'backdrop';
    this.backdropEl.setAttribute('part', 'backdrop');

    this.sheetEl = document.createElement('div');
    this.sheetEl.className = 'sheet';
    this.sheetEl.setAttribute('part', 'sheet');
    this.sheetEl.setAttribute('role', 'dialog');
    this.sheetEl.setAttribute('aria-modal', 'true');
    this.sheetEl.setAttribute('aria-labelledby', this.titleId);

    const handle = document.createElement('div');
    handle.className = 'handle';
    handle.setAttribute('aria-hidden', 'true');
    handle.appendChild(document.createElement('i'));

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

    const actionList = document.createElement('div');
    actionList.className = 'action-list';
    for (const label of ['Compartir', 'Imprimir', 'Archivar']) {
      const item = document.createElement('div');
      item.className = 'action-item';
      item.textContent = label;
      actionList.appendChild(item);
    }

    body.append(this.bodyCardEl, actionList);

    const actions = document.createElement('div');
    actions.className = 'actions';

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.type = 'button';
    this.cancelBtn.className = 'btn cancel';

    this.confirmBtn = document.createElement('button');
    this.confirmBtn.type = 'button';
    this.confirmBtn.className = 'btn confirm';

    actions.append(this.cancelBtn, this.confirmBtn);
    this.sheetEl.append(handle, head, body, actions);
    this.backdropEl.appendChild(this.sheetEl);
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
      new CustomEvent('gob-sheet', {
        detail: { action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncFromAttributes() {
    const variant = resolveSheetVariant(this.getAttribute('variant'));
    const preview = this.hasAttribute('preview');
    const title = this.getAttribute('title')?.trim() || 'Acciones rapidas';
    const description =
      this.getAttribute('description')?.trim() ||
      'Elige una accion para continuar.';
    const body =
      this.getAttribute('body')?.trim() ||
      this.textContent?.trim() ||
      'Contenido de la hoja inferior.';
    const confirm =
      this.getAttribute('confirm-label')?.trim() || 'Continuar';
    const cancel = this.getAttribute('cancel-label')?.trim() || 'Cerrar';

    this.backdropEl.dataset.variant = variant;
    this.backdropEl.dataset.preview = preview ? 'true' : 'false';

    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.bodyCardEl.textContent = body;
    this.confirmBtn.textContent = confirm;
    this.cancelBtn.textContent = cancel;
    this.sheetEl.setAttribute('aria-modal', preview ? 'false' : 'true');
    this.closeBtn.tabIndex = preview ? -1 : 0;
  }
}

defineCustomElement('gob-sheet', GobSheetElement);
export {};
