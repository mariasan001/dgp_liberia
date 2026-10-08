import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  CONTENT_SECTION_OBSERVED_ATTRIBUTES,
  resolveContentSectionVariant,
} from './content-section-constants';
import { contentSectionStyles } from './content-section-styles';

function parseSteps(body: string): string[] {
  const byDot = body
    .split(/\s*[·|]\s*/)
    .map((part) => part.replace(/^\d+\)\s*/, '').trim())
    .filter(Boolean);
  if (byDot.length >= 2) return byDot.slice(0, 4);

  const byNumber = body
    .split(/\s*(?=\d+\))/)
    .map((part) => part.replace(/^\d+\)\s*/, '').trim())
    .filter(Boolean);
  if (byNumber.length >= 2) return byNumber.slice(0, 4);

  return [body];
}

class GobContentSectionElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...CONTENT_SECTION_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly copyEl: HTMLElement;
  private readonly eyebrowEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly bodyEl: HTMLElement;
  private readonly stepsEl: HTMLOListElement;
  private readonly mediaEl: HTMLElement;
  private readonly actionsEl: HTMLElement;
  private readonly actionBtn: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = contentSectionStyles;

    this.rootEl = document.createElement('section');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const mark = document.createElement('div');
    mark.className = 'mark';
    mark.setAttribute('aria-hidden', 'true');

    this.copyEl = document.createElement('div');
    this.copyEl.className = 'copy';

    this.eyebrowEl = document.createElement('p');
    this.eyebrowEl.className = 'eyebrow';

    this.titleEl = document.createElement('h2');
    this.titleEl.className = 'title';
    this.titleEl.setAttribute('part', 'title');

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';

    this.bodyEl = document.createElement('p');
    this.bodyEl.className = 'body';
    this.bodyEl.setAttribute('part', 'body');

    this.stepsEl = document.createElement('ol');
    this.stepsEl.className = 'steps';
    this.stepsEl.hidden = true;

    this.actionsEl = document.createElement('div');
    this.actionsEl.className = 'actions';

    this.actionBtn = document.createElement('button');
    this.actionBtn.type = 'button';
    this.actionBtn.className = 'action';
    this.actionBtn.setAttribute('part', 'action');
    this.actionsEl.appendChild(this.actionBtn);

    this.copyEl.append(
      this.eyebrowEl,
      this.titleEl,
      this.descEl,
      this.bodyEl,
      this.stepsEl,
      this.actionsEl,
    );

    this.mediaEl = document.createElement('div');
    this.mediaEl.className = 'media';
    this.mediaEl.setAttribute('aria-hidden', 'true');
    this.mediaEl.setAttribute('part', 'media');
    this.mediaEl.innerHTML = `
      <span class="media-grid"></span>
      <span class="media-orb media-orb-a"></span>
      <span class="media-orb media-orb-b"></span>
      <span class="media-frame"></span>
      <span class="media-chip"></span>
    `;

    this.rootEl.append(mark, this.copyEl, this.mediaEl);
    shadow.append(style, this.rootEl);

    this.actionBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('gob-content-section', {
          detail: { action: 'action' },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveContentSectionVariant(this.getAttribute('variant'));
    const eyebrow = this.getAttribute('eyebrow')?.trim() || 'Seccion';
    const title =
      this.getAttribute('title')?.trim() || 'Contenido institucional';
    const description =
      this.getAttribute('description')?.trim() ||
      'Bloque de seccion para landing y documentacion.';
    const body =
      this.getAttribute('body')?.trim() ||
      this.textContent?.trim() ||
      'Usa este bloque para explicar un servicio, requisito o beneficio.';
    const action =
      this.getAttribute('action-label')?.trim() || 'Conocer mas';

    this.rootEl.dataset.variant = variant;
    this.eyebrowEl.textContent = eyebrow;
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.actionBtn.textContent = action;

    const isSteps = variant === 'steps';
    if (isSteps) {
      const steps = parseSteps(body);
      this.stepsEl.replaceChildren(
        ...steps.map((label, index) => {
          const item = document.createElement('li');
          item.className = 'step';
          const num = document.createElement('span');
          num.className = 'step-num';
          num.textContent = String(index + 1);
          const text = document.createElement('span');
          text.className = 'step-label';
          text.textContent = label;
          item.append(num, text);
          return item;
        }),
      );
      this.stepsEl.hidden = false;
      this.bodyEl.hidden = true;
      this.bodyEl.textContent = '';
    } else {
      this.stepsEl.hidden = true;
      this.stepsEl.replaceChildren();
      this.bodyEl.hidden = false;
      this.bodyEl.textContent = body;
    }
  }
}

defineCustomElement('gob-content-section', GobContentSectionElement);
export {};
