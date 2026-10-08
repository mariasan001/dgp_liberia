import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  NOTIFICATION_CENTER_OBSERVED_ATTRIBUTES,
  parseNotificationItems,
  resolveNotificationCenterVariant,
} from './notification-center-constants';
import { notificationCenterStyles } from './notification-center-styles';

class GobNotificationCenterElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...NOTIFICATION_CENTER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly badgeEl: HTMLElement;
  private readonly listEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = notificationCenterStyles;

    this.rootEl = document.createElement('section');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const head = document.createElement('div');
    head.className = 'head';
    this.titleEl = document.createElement('h2');
    this.titleEl.className = 'title';
    this.badgeEl = document.createElement('span');
    this.badgeEl.className = 'badge';
    head.append(this.titleEl, this.badgeEl);

    this.listEl = document.createElement('div');
    this.listEl.className = 'list';

    const foot = document.createElement('div');
    foot.className = 'foot';
    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'action';
    action.textContent = 'Ver todas';
    action.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('gob-notification-center', {
          detail: { action: 'view-all' },
          bubbles: true,
          composed: true,
        }),
      );
    });
    foot.appendChild(action);

    this.rootEl.append(head, this.listEl, foot);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveNotificationCenterVariant(
      this.getAttribute('variant'),
    );
    this.rootEl.dataset.variant = variant;
    this.titleEl.textContent =
      this.getAttribute('title')?.trim() || 'Notificaciones';

    const items = parseNotificationItems(this.getAttribute('items'));
    const unread = items.filter((item) => item.unread).length;
    this.badgeEl.textContent = String(unread);
    this.badgeEl.hidden = unread === 0;

    this.listEl.replaceChildren(
      ...items.map((item, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'item';
        btn.dataset.unread = String(item.unread);

        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.setAttribute('aria-hidden', 'true');

        const copy = document.createElement('div');
        copy.className = 'copy';
        const title = document.createElement('p');
        title.className = 'item-title';
        title.textContent = item.title;
        const body = document.createElement('p');
        body.className = 'item-body';
        body.textContent = item.body;
        copy.append(title, body);

        const time = document.createElement('p');
        time.className = 'time';
        time.textContent = item.time;

        btn.append(dot, copy, time);
        btn.addEventListener('click', () => {
          this.dispatchEvent(
            new CustomEvent('gob-notification-center', {
              detail: { action: 'select', index, title: item.title },
              bubbles: true,
              composed: true,
            }),
          );
        });
        return btn;
      }),
    );
  }
}

defineCustomElement('gob-notification-center', GobNotificationCenterElement);
export {};
