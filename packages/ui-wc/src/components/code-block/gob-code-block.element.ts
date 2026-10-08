import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  CODE_BLOCK_OBSERVED_ATTRIBUTES,
  resolveCodeBlockVariant,
} from './code-block-constants';
import { codeBlockStyles } from './code-block-styles';

class GobCodeBlockElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...CODE_BLOCK_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly filenameEl: HTMLElement;
  private readonly languageEl: HTMLElement;
  private readonly copyBtn: HTMLButtonElement;
  private readonly linesEl: HTMLElement;
  private codeText = '';
  private copiedTimer: number | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = codeBlockStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const head = document.createElement('div');
    head.className = 'head';

    const meta = document.createElement('div');
    meta.className = 'meta';
    this.filenameEl = document.createElement('p');
    this.filenameEl.className = 'filename';
    this.languageEl = document.createElement('p');
    this.languageEl.className = 'language';
    meta.append(this.filenameEl, this.languageEl);

    this.copyBtn = document.createElement('button');
    this.copyBtn.type = 'button';
    this.copyBtn.className = 'copy';
    this.copyBtn.textContent = 'Copiar';
    this.copyBtn.setAttribute('part', 'copy');

    head.append(meta, this.copyBtn);

    const body = document.createElement('pre');
    body.className = 'body';
    body.setAttribute('part', 'body');
    this.linesEl = document.createElement('div');
    this.linesEl.className = 'lines';
    body.appendChild(this.linesEl);

    this.rootEl.append(head, body);
    shadow.append(style, this.rootEl);

    this.copyBtn.addEventListener('click', () => {
      void this.copyCode();
    });
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private async copyCode() {
    try {
      await navigator.clipboard.writeText(this.codeText);
      this.copyBtn.dataset.copied = 'true';
      this.copyBtn.textContent = 'Copiado';
      if (this.copiedTimer) window.clearTimeout(this.copiedTimer);
      this.copiedTimer = window.setTimeout(() => {
        this.copyBtn.dataset.copied = 'false';
        this.copyBtn.textContent = 'Copiar';
      }, 1200);
      this.dispatchEvent(
        new CustomEvent('gob-code-block', {
          detail: { action: 'copy' },
          bubbles: true,
          composed: true,
        }),
      );
    } catch {
      this.copyBtn.textContent = 'Error';
    }
  }

  private syncFromAttributes() {
    const variant = resolveCodeBlockVariant(this.getAttribute('variant'));
    this.rootEl.dataset.variant = variant;
    this.filenameEl.textContent =
      this.getAttribute('filename')?.trim() || 'snippet.ts';
    this.languageEl.textContent =
      this.getAttribute('language')?.trim() || 'TypeScript';
    this.codeText =
      this.getAttribute('code')?.trim() ||
      this.textContent?.trim() ||
      `import '@mariasan001/ui-wc';\n\n<gob-button label="Continuar"></gob-button>`;

    const lines = this.codeText.split('\n');
    this.linesEl.replaceChildren(
      ...lines.map((line, index) => {
        const row = document.createElement('div');
        row.className = 'line';
        const num = document.createElement('span');
        num.className = 'num';
        num.textContent = String(index + 1);
        const code = document.createElement('span');
        code.className = 'code';
        code.textContent = line.length ? line : ' ';
        row.append(num, code);
        return row;
      }),
    );
  }
}

defineCustomElement('gob-code-block', GobCodeBlockElement);
export {};
