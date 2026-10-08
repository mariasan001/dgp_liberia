export const confirmDialogStyles = `
:host {
  display: contents;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-cd-vino: #9f2141;
  --gob-cd-vino-deep: #7a1832;
  --gob-cd-dorado: #bc945a;
  --gob-cd-title: #181511;
  --gob-cd-muted: #6f6a63;
  --gob-cd-border: rgba(24, 21, 17, 0.1);
  --gob-cd-bg: #ffffff;
  --gob-cd-fill: #f3f3f3;
  --gob-cd-accent: #9f2141;
  --gob-cd-accent-soft: color-mix(in srgb, #9f2141 10%, #fff);
  --gob-cd-width: 420px;
  --gob-cd-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

:host([preview]) {
  display: block;
  width: 100%;
  max-width: var(--gob-cd-width);
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  background: rgba(24, 21, 17, 0.48);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  animation: gob-cd-scrim 200ms var(--gob-cd-ease);
}

:host([open]) .backdrop { display: flex; }

:host([preview]) .backdrop,
:host([preview][open]) .backdrop {
  position: relative;
  inset: auto;
  z-index: auto;
  display: flex;
  padding: 0;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  animation: none;
  width: 100%;
}

.dialog {
  position: relative;
  display: grid;
  gap: 0;
  width: min(var(--gob-cd-width), 100%);
  border-radius: 20px;
  border: 1px solid var(--gob-cd-border);
  background: var(--gob-cd-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 18px 40px rgba(24, 21, 17, 0.16);
  animation: gob-cd-in 220ms var(--gob-cd-ease);
  overflow: hidden;
}

:host([preview]) .dialog {
  width: 100%;
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 12px 28px rgba(24, 21, 17, 0.08);
  animation: none;
}

.dialog::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  background: var(--gob-cd-accent);
  opacity: 0;
}

.backdrop[data-variant='danger'] {
  --gob-cd-accent: #c62828;
  --gob-cd-accent-soft: color-mix(in srgb, #c62828 10%, #fff);
}
.backdrop[data-variant='warning'] {
  --gob-cd-accent: #b87712;
  --gob-cd-accent-soft: color-mix(in srgb, #b87712 11%, #fff);
}
.backdrop[data-variant='success'] {
  --gob-cd-accent: #1f8a55;
  --gob-cd-accent-soft: color-mix(in srgb, #1f8a55 10%, #fff);
}
.backdrop[data-variant='info'],
.backdrop[data-variant='basic'],
.backdrop[data-variant='soft'],
.backdrop[data-variant='outline'] {
  --gob-cd-accent: #9f2141;
  --gob-cd-accent-soft: color-mix(in srgb, #9f2141 10%, #fff);
}
.backdrop[data-variant='complete'],
.backdrop[data-variant='brand'] {
  --gob-cd-accent: #bc945a;
  --gob-cd-accent-soft: color-mix(in srgb, #bc945a 14%, #fff);
}

.backdrop[data-variant='danger'] .dialog::before,
.backdrop[data-variant='warning'] .dialog::before,
.backdrop[data-variant='success'] .dialog::before,
.backdrop[data-variant='complete'] .dialog::before { opacity: 1; }

.head {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px 14px;
  align-items: start;
  padding: 20px 20px 12px;
}

.icon {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: var(--gob-cd-accent-soft);
  color: var(--gob-cd-accent);
}
.icon svg { width: 20px; height: 20px; display: block; }

.copy { display: grid; gap: 4px; min-width: 0; padding-top: 2px; }

.title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--gob-cd-title);
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-cd-muted);
}

.body {
  margin: 0 20px 4px;
  padding: 14px 15px;
  border-radius: 14px;
  background: var(--gob-cd-fill);
  color: var(--gob-cd-title);
  font-size: 13.5px;
  font-weight: 550;
  line-height: 1.5;
}

.backdrop[data-variant='danger'] .body {
  background: color-mix(in srgb, #c62828 6%, #fff);
  border: 1px solid color-mix(in srgb, #c62828 12%, transparent);
}
.backdrop[data-variant='warning'] .body {
  background: color-mix(in srgb, #b87712 8%, #fff);
  border: 1px solid color-mix(in srgb, #b87712 14%, transparent);
}
.backdrop[data-variant='success'] .body {
  background: color-mix(in srgb, #1f8a55 7%, #fff);
  border: 1px solid color-mix(in srgb, #1f8a55 12%, transparent);
}
.backdrop[data-variant='soft'] .dialog { background: var(--gob-cd-fill); }
.backdrop[data-variant='outline'] .dialog {
  border-color: color-mix(in srgb, var(--gob-cd-accent) 28%, #d7dde6);
}
.backdrop[data-variant='dense'] .head { padding: 14px 14px 8px; gap: 10px; }
.backdrop[data-variant='dense'] .icon { width: 34px; height: 34px; border-radius: 11px; }
.backdrop[data-variant='dense'] .icon svg { width: 16px; height: 16px; }
.backdrop[data-variant='dense'] .title { font-size: 15px; }
.backdrop[data-variant='dense'] .body { margin: 0 14px 2px; padding: 10px 12px; }
.backdrop[data-variant='dense'] .actions { padding: 12px 14px 14px; }
.backdrop[data-variant='dense'] .btn { min-height: 34px; border-radius: 10px; font-size: 12.5px; }

.actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
  padding: 16px 20px 20px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  background: color-mix(in srgb, var(--gob-cd-fill) 55%, #fff);
}

.btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: background 150ms var(--gob-cd-ease), border-color 150ms var(--gob-cd-ease), filter 150ms var(--gob-cd-ease);
}
.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-cd-accent) 45%, transparent);
  outline-offset: 2px;
}

.cancel {
  background: #fff;
  border-color: var(--gob-cd-border);
  color: var(--gob-cd-title);
}
.cancel:hover { background: var(--gob-cd-fill); }

.confirm {
  background: var(--gob-cd-accent);
  color: #fff;
}
.confirm:hover { filter: brightness(0.92); }

.backdrop[data-variant='complete'] .confirm,
.backdrop[data-variant='brand'] .confirm {
  background: var(--gob-cd-vino);
}

@keyframes gob-cd-scrim {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes gob-cd-in {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop, .dialog { animation: none !important; }
}
`;
