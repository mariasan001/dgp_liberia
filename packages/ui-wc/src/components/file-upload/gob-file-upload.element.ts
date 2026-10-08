import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  FILE_UPLOAD_OBSERVED_ATTRIBUTES,
  fileMatchesAccept,
  formatBytes,
  parseMaxSize,
  resolveFileUploadSize,
  resolveFileUploadStatus,
  resolveFileUploadVariant,
  type FileUploadItem,
} from './file-upload-constants';
import { fileUploadStyles } from './file-upload-styles';

const ICONS = {
  upload: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V5.5M12 5.5L8 9.5M12 5.5l4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 18.5h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h6l4 4v11a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6"/><path d="M13.5 4.5v4h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};

function statusPill(status: string): string {
  switch (status) {
    case 'error':
      return 'Error';
    case 'success':
      return 'Valido';
    case 'warning':
      return 'Revision';
    case 'info':
      return 'Info';
    default:
      return '';
  }
}

class GobFileUploadElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...FILE_UPLOAD_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly headEl: HTMLElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly pillEl: HTMLSpanElement;
  private readonly dropEl: HTMLElement;
  private readonly titleEl: HTMLParagraphElement;
  private readonly hintEl: HTMLParagraphElement;
  private readonly browseBtn: HTMLButtonElement;
  private readonly inputEl: HTMLInputElement;
  private readonly filesEl: HTMLUListElement;
  private readonly helperEl: HTMLParagraphElement;

  private items: FileUploadItem[] = [];
  private fileMap = new Map<string, File>();
  private fieldId = `gob-fu-${Math.random().toString(36).slice(2, 9)}`;
  private dragDepth = 0;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = fileUploadStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';

    this.headEl = document.createElement('div');
    this.headEl.className = 'head';

    this.labelEl = document.createElement('label');
    this.labelEl.className = 'label';

    this.pillEl = document.createElement('span');
    this.pillEl.className = 'pill';
    this.pillEl.hidden = true;

    this.headEl.append(this.labelEl, this.pillEl);

    this.dropEl = document.createElement('div');
    this.dropEl.className = 'drop';
    this.dropEl.setAttribute('role', 'button');
    this.dropEl.tabIndex = 0;

    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.innerHTML = ICONS.upload;
    icon.setAttribute('aria-hidden', 'true');

    this.titleEl = document.createElement('p');
    this.titleEl.className = 'title';

    this.hintEl = document.createElement('p');
    this.hintEl.className = 'hint';

    this.browseBtn = document.createElement('button');
    this.browseBtn.type = 'button';
    this.browseBtn.className = 'browse';
    this.browseBtn.textContent = 'Elegir archivo';

    this.inputEl = document.createElement('input');
    this.inputEl.type = 'file';
    this.inputEl.className = 'input';
    this.inputEl.tabIndex = -1;

    this.dropEl.append(icon, this.titleEl, this.hintEl, this.browseBtn, this.inputEl);

    this.filesEl = document.createElement('ul');
    this.filesEl.className = 'files';
    this.filesEl.hidden = true;

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    this.rootEl.append(this.headEl, this.dropEl, this.filesEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.dropEl.addEventListener('click', this.onDropClick);
    this.dropEl.addEventListener('keydown', this.onDropKey);
    this.browseBtn.addEventListener('click', this.onBrowseClick);
    this.inputEl.addEventListener('change', this.onInputChange);
    this.dropEl.addEventListener('dragenter', this.onDragEnter);
    this.dropEl.addEventListener('dragleave', this.onDragLeave);
    this.dropEl.addEventListener('dragover', this.onDragOver);
    this.dropEl.addEventListener('drop', this.onDrop);
    this.syncFromAttributes();
  }

  disconnectedCallback() {
    this.dropEl.removeEventListener('click', this.onDropClick);
    this.dropEl.removeEventListener('keydown', this.onDropKey);
    this.browseBtn.removeEventListener('click', this.onBrowseClick);
    this.inputEl.removeEventListener('change', this.onInputChange);
    this.dropEl.removeEventListener('dragenter', this.onDragEnter);
    this.dropEl.removeEventListener('dragleave', this.onDragLeave);
    this.dropEl.removeEventListener('dragover', this.onDragOver);
    this.dropEl.removeEventListener('drop', this.onDrop);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.syncFromAttributes();
  }

  /** Public helper for demos / hosts. */
  getFiles(): File[] {
    return [...this.fileMap.values()];
  }

  private readonly onDropClick = (e: MouseEvent) => {
    if (this.hasAttribute('disabled')) return;
    if ((e.target as HTMLElement).closest('.browse')) return;
    this.inputEl.click();
  };

  private readonly onBrowseClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.hasAttribute('disabled')) return;
    this.inputEl.click();
  };

  private readonly onDropKey = (e: KeyboardEvent) => {
    if (this.hasAttribute('disabled')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.inputEl.click();
    }
  };

  private readonly onInputChange = () => {
    const files = [...(this.inputEl.files || [])];
    this.inputEl.value = '';
    this.addFiles(files);
  };

  private readonly onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    if (this.hasAttribute('disabled')) return;
    this.dragDepth += 1;
    this.rootEl.dataset.dragging = 'true';
  };

  private readonly onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    this.dragDepth = Math.max(0, this.dragDepth - 1);
    if (this.dragDepth === 0) this.rootEl.dataset.dragging = 'false';
  };

  private readonly onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  private readonly onDrop = (e: DragEvent) => {
    e.preventDefault();
    this.dragDepth = 0;
    this.rootEl.dataset.dragging = 'false';
    if (this.hasAttribute('disabled')) return;
    const files = [...(e.dataTransfer?.files || [])];
    this.addFiles(files);
  };

  private addFiles(incoming: File[]) {
    if (!incoming.length) return;

    const accept = this.getAttribute('accept') || '';
    const maxSize = parseMaxSize(this.getAttribute('max-size'));
    const maxFiles = Number(this.getAttribute('max-files') || 0) || Infinity;
    const multiple =
      this.hasAttribute('multiple') ||
      resolveFileUploadVariant(this.getAttribute('variant')) === 'multiple';

    let next = multiple ? [...this.items] : [];
    if (!multiple) this.fileMap.clear();

    for (const file of incoming) {
      if (!multiple && next.length >= 1) break;
      if (next.length >= maxFiles) break;

      const id = `f-${Math.random().toString(36).slice(2, 9)}`;
      let error: string | undefined;

      if (!fileMatchesAccept(file, accept)) {
        error = 'Tipo de archivo no permitido';
      } else if (maxSize !== null && file.size > maxSize) {
        error = `Excede ${this.getAttribute('max-size')}`;
      }

      const item: FileUploadItem = {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: error ? 0 : 100,
        error,
      };

      if (!error) this.fileMap.set(id, file);
      next.push(item);
    }

    this.items = next;
    this.renderFiles();
    this.emitChange();
  }

  private removeFile(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    this.fileMap.delete(id);
    this.renderFiles();
    this.emitChange();
  }

  private emitChange() {
    const files = this.getFiles();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-file-upload', {
        detail: {
          files,
          items: this.items.map(({ id, name, size, type, progress, error }) => ({
            id,
            name,
            size,
            type,
            progress,
            error: error || null,
          })),
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private renderFiles() {
    this.filesEl.replaceChildren();
    this.filesEl.hidden = this.items.length === 0;

    for (const item of this.items) {
      const li = document.createElement('li');
      li.className = 'file';
      li.dataset.error = item.error ? 'true' : 'false';
      li.dataset.done = !item.error && item.progress >= 100 ? 'true' : 'false';

      const icon = document.createElement('span');
      icon.className = 'file-icon';
      icon.innerHTML = ICONS.file;
      icon.setAttribute('aria-hidden', 'true');

      const meta = document.createElement('div');
      meta.className = 'file-meta';

      const name = document.createElement('p');
      name.className = 'file-name';
      name.textContent = item.name;

      const sub = document.createElement('p');
      sub.className = 'file-sub';
      sub.textContent = item.error || formatBytes(item.size);

      meta.append(name, sub);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'remove';
      remove.setAttribute('aria-label', `Quitar ${item.name}`);
      remove.innerHTML = ICONS.x;
      remove.disabled = this.hasAttribute('disabled');
      remove.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeFile(item.id);
      });

      const progress = document.createElement('div');
      progress.className = 'progress';
      progress.setAttribute('aria-hidden', 'true');
      const bar = document.createElement('span');
      bar.style.width = `${Math.max(0, Math.min(100, item.progress))}%`;
      progress.appendChild(bar);

      li.append(icon, meta, remove, progress);
      this.filesEl.appendChild(li);
    }
  }

  private syncFromAttributes() {
    const variant = resolveFileUploadVariant(this.getAttribute('variant'));
    const status = resolveFileUploadStatus(this.getAttribute('status'));
    const size = resolveFileUploadSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    const required = this.hasAttribute('required');
    const multiple =
      this.hasAttribute('multiple') || variant === 'multiple';
    const label = this.getAttribute('label')?.trim() || '';
    const helper = this.getAttribute('helper')?.trim() || '';
    const hint =
      this.getAttribute('hint')?.trim() ||
      'PDF, DOC o imagen. Arrastra o elige desde tu equipo.';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';

    this.inputEl.id = this.fieldId;
    this.inputEl.disabled = disabled;
    this.inputEl.multiple = multiple;
    this.inputEl.accept = this.getAttribute('accept') || '';
    this.inputEl.name = this.getAttribute('name') || '';
    this.inputEl.required = required && this.items.length === 0;
    this.labelEl.htmlFor = this.fieldId;

    const showLabel = Boolean(label) && variant !== 'basic';
    this.labelEl.hidden = !showLabel;
    this.labelEl.innerHTML = '';
    if (showLabel) {
      this.labelEl.append(document.createTextNode(label));
      if (required) {
        const req = document.createElement('span');
        req.className = 'req';
        req.textContent = '*';
        this.labelEl.append(req);
      }
    }

    const pill = statusPill(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.headEl.hidden = !showLabel && !pill;

    this.titleEl.innerHTML =
      variant === 'button' || variant === 'compact'
        ? 'Adjuntar archivo'
        : 'Arrastra archivos aqui o <em>explora</em>';
    this.hintEl.textContent = hint;
    this.browseBtn.textContent = multiple ? 'Elegir archivos' : 'Elegir archivo';
    this.browseBtn.disabled = disabled;
    this.dropEl.tabIndex = disabled ? -1 : 0;
    this.dropEl.setAttribute('aria-disabled', disabled ? 'true' : 'false');

    const showHelper =
      Boolean(helper) ||
      variant === 'helper' ||
      variant === 'complete' ||
      status !== 'default';
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent =
      helper ||
      (status === 'error'
        ? 'Debes cargar al menos un archivo'
        : status === 'success'
          ? 'Archivos listos'
          : status === 'warning'
            ? 'Revisa el formato'
            : '');

    this.renderFiles();
  }
}

defineCustomElement('gob-file-upload', GobFileUploadElement);

export {};
