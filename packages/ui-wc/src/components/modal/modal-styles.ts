export const modalStyles = `
:host {
  display: contents;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-md-vino: #9f2141;
  --gob-md-vino-deep: #7a1832;
  --gob-md-dorado: #bc945a;
  --gob-md-title: #181511;
  --gob-md-muted: #6f6a63;
  --gob-md-border: rgba(24, 21, 17, 0.1);
  --gob-md-bg: #ffffff;
  --gob-md-fill: #f3f3f3;
  --gob-md-accent: #9f2141;
  --gob-md-accent-soft: color-mix(in srgb, #9f2141 10%, #fff);
  --gob-md-width: 440px;
  --gob-md-radius: 22px;
  --gob-md-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

:host([preview]) {
  display: block;
  width: 100%;
  max-width: var(--gob-md-width);
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
  animation: gob-md-scrim 200ms var(--gob-md-ease);
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
  grid-template-rows: auto 1fr auto;
  gap: 0;
  width: min(var(--gob-md-width), 100%);
  max-height: min(86vh, 720px);
  overflow: hidden;
  border-radius: var(--gob-md-radius);
  border: 1px solid var(--gob-md-border);
  background: var(--gob-md-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 18px 40px rgba(24, 21, 17, 0.16),
    0 48px 80px rgba(24, 21, 17, 0.12);
  animation: gob-md-in 220ms var(--gob-md-ease);
}

:host([preview]) .dialog {
  max-height: none;
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
  background: var(--gob-md-accent);
  opacity: 0;
}

.backdrop[data-size='sm'] .dialog { --gob-md-width: 360px; }
.backdrop[data-size='lg'] .dialog { --gob-md-width: 560px; }
.backdrop[data-variant='wide'] .dialog { --gob-md-width: 640px; }

.backdrop[data-variant='danger'] {
  --gob-md-accent: #c62828;
  --gob-md-accent-soft: color-mix(in srgb, #c62828 10%, #fff);
}
.backdrop[data-variant='success'] {
  --gob-md-accent: #1f8a55;
  --gob-md-accent-soft: color-mix(in srgb, #1f8a55 10%, #fff);
}
.backdrop[data-variant='confirm'],
.backdrop[data-variant='basic'],
.backdrop[data-variant='center'],
.backdrop[data-variant='wide'],
.backdrop[data-variant='form'] {
  --gob-md-accent: #9f2141;
  --gob-md-accent-soft: color-mix(in srgb, #9f2141 10%, #fff);
}
.backdrop[data-variant='complete'] {
  --gob-md-accent: #bc945a;
  --gob-md-accent-soft: color-mix(in srgb, #bc945a 14%, #fff);
}
.backdrop[data-variant='complete'] .dialog::before,
.backdrop[data-variant='danger'] .dialog::before,
.backdrop[data-variant='success'] .dialog::before {
  opacity: 1;
}

.backdrop[data-variant='dense'] .dialog {
  --gob-md-radius: 16px;
}
.backdrop[data-variant='dense'] .head {
  padding: 14px 16px 12px;
  gap: 10px;
}
.backdrop[data-variant='dense'] .copy { gap: 2px; }
.backdrop[data-variant='dense'] .title { font-size: 15px; }
.backdrop[data-variant='dense'] .description { font-size: 12.5px; }
.backdrop[data-variant='dense'] .body {
  margin: 0 16px 14px;
  padding: 10px 12px;
}
.backdrop[data-variant='dense'] .actions {
  padding: 12px 16px;
  gap: 6px;
}
.backdrop[data-variant='dense'] .btn {
  min-height: 34px;
  padding: 0 12px;
  font-size: 12.5px;
  border-radius: 10px;
}

.backdrop[data-variant='sheet'] {
  align-items: flex-end;
  padding: 0;
}
.backdrop[data-variant='sheet'] .dialog {
  width: 100%;
  max-width: 100%;
  max-height: min(78vh, 640px);
  border-radius: 24px 24px 0 0;
  animation: gob-md-sheet 240ms var(--gob-md-ease);
}
:host([preview]) .backdrop[data-variant='sheet'] .dialog {
  border-radius: 22px;
  animation: none;
}
.backdrop[data-variant='sheet'] .handle {
  display: flex;
}

.handle {
  display: none;
  justify-content: center;
  padding: 10px 0 2px;
}
.handle > i {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: rgba(24, 21, 17, 0.16);
}

.head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px 14px;
  align-items: start;
  padding: 20px 20px 14px;
}

.icon {
  width: 40px;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: var(--gob-md-accent-soft);
  color: var(--gob-md-accent);
  flex: 0 0 auto;
}
.icon svg { width: 20px; height: 20px; display: block; }
.backdrop[data-has-icon='true'] .icon { display: inline-flex; }
.backdrop[data-has-icon='false'] .head {
  grid-template-columns: 1fr auto;
}
.backdrop[data-has-icon='false'] .icon { display: none; }

.copy {
  display: grid;
  gap: 4px;
  min-width: 0;
  padding-top: 1px;
}

.title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--gob-md-title);
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-md-muted);
}

.close {
  appearance: none;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: -2px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: var(--gob-md-muted);
  cursor: pointer;
  transition: background 140ms var(--gob-md-ease), color 140ms var(--gob-md-ease);
}
.close:hover {
  background: var(--gob-md-fill);
  color: var(--gob-md-title);
}
.close:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-md-vino) 45%, transparent);
  outline-offset: 2px;
}
.close svg { width: 14px; height: 14px; display: block; }

.body {
  margin: 0 20px 4px;
  padding: 14px 15px;
  border-radius: 14px;
  background: var(--gob-md-fill);
  color: var(--gob-md-title);
  font-size: 13.5px;
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: -0.01em;
  overflow: auto;
}

.backdrop[data-variant='form'] .body {
  background: #fff;
  border: 1px dashed color-mix(in srgb, var(--gob-md-border) 80%, #9f2141);
  min-height: 72px;
  color: var(--gob-md-muted);
}

.backdrop[data-variant='danger'] .body {
  background: color-mix(in srgb, #c62828 6%, #fff);
  border: 1px solid color-mix(in srgb, #c62828 12%, transparent);
}

.backdrop[data-variant='success'] .body {
  background: color-mix(in srgb, #1f8a55 7%, #fff);
  border: 1px solid color-mix(in srgb, #1f8a55 12%, transparent);
}

.actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding: 16px 20px 20px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  background: color-mix(in srgb, var(--gob-md-fill) 55%, #fff);
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
  transition:
    background 150ms var(--gob-md-ease),
    color 150ms var(--gob-md-ease),
    border-color 150ms var(--gob-md-ease),
    transform 150ms var(--gob-md-ease);
}
.btn:active { transform: translateY(1px); }
.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-md-accent) 50%, transparent);
  outline-offset: 2px;
}

.cancel {
  background: #fff;
  border-color: var(--gob-md-border);
  color: var(--gob-md-title);
}
.cancel:hover {
  background: var(--gob-md-fill);
  border-color: color-mix(in srgb, var(--gob-md-border) 70%, #181511);
}

.confirm {
  background: var(--gob-md-accent);
  color: #fff;
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.08);
}
.confirm:hover {
  filter: brightness(0.92);
}

.backdrop[data-variant='danger'] .confirm {
  background: #c62828;
}
.backdrop[data-variant='success'] .confirm {
  background: #1f8a55;
}
.backdrop[data-variant='complete'] .confirm {
  background: var(--gob-md-vino);
}

@keyframes gob-md-scrim {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes gob-md-in {
  from { opacity: 0; transform: translateY(12px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes gob-md-sheet {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop,
  .dialog {
    animation: none !important;
  }
  .btn:active { transform: none; }
}
`;
