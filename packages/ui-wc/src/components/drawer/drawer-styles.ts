export const drawerStyles = `
:host {
  display: contents;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-dr-vino: #9f2141;
  --gob-dr-vino-deep: #7a1832;
  --gob-dr-dorado: #bc945a;
  --gob-dr-title: #181511;
  --gob-dr-muted: #6f6a63;
  --gob-dr-border: rgba(24, 21, 17, 0.1);
  --gob-dr-bg: #ffffff;
  --gob-dr-fill: #f3f3f3;
  --gob-dr-accent: #9f2141;
  --gob-dr-width: 400px;
  --gob-dr-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

:host([preview]) {
  display: block;
  width: 100%;
  max-width: min(var(--gob-dr-width), 100%);
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: none;
  background: rgba(24, 21, 17, 0.48);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  animation: gob-dr-scrim 200ms var(--gob-dr-ease);
}

:host([open]) .backdrop { display: block; }

:host([preview]) .backdrop,
:host([preview][open]) .backdrop {
  position: relative;
  inset: auto;
  z-index: auto;
  display: block;
  width: 100%;
  min-height: 340px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--gob-dr-border);
  background: #f3f3f3;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  animation: none;
}

.panel {
  position: absolute;
  top: 0;
  bottom: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: min(var(--gob-dr-width), 100%);
  background: var(--gob-dr-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    -18px 0 48px rgba(24, 21, 17, 0.16);
  animation: gob-dr-in-right 240ms var(--gob-dr-ease);
}

.backdrop[data-side='right'] .panel { right: 0; }
.backdrop[data-side='left'] .panel {
  left: 0;
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    18px 0 48px rgba(24, 21, 17, 0.16);
  animation-name: gob-dr-in-left;
}

:host([preview]) .panel {
  animation: none;
  width: 100%;
  box-shadow: none;
}

.panel::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--gob-dr-accent);
  opacity: 0;
}
.backdrop[data-side='right'] .panel::before { left: 0; }
.backdrop[data-side='left'] .panel::before { right: 0; }
.backdrop[data-variant='complete'] .panel::before,
.backdrop[data-variant='danger'] .panel::before { opacity: 1; }
.backdrop[data-variant='complete'] { --gob-dr-accent: #bc945a; }
.backdrop[data-variant='danger'] { --gob-dr-accent: #c62828; }

.backdrop[data-size='sm'] { --gob-dr-width: 320px; }
.backdrop[data-size='lg'],
.backdrop[data-variant='wide'] { --gob-dr-width: 480px; }
.backdrop[data-variant='filters'] { --gob-dr-width: 360px; }

.head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: start;
  padding: 22px 20px 14px;
}

.copy {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding-right: 8px;
}

.title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--gob-dr-title);
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-dr-muted);
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
  color: var(--gob-dr-muted);
  cursor: pointer;
  transition: background 140ms var(--gob-dr-ease), color 140ms var(--gob-dr-ease);
}
.close:hover {
  background: var(--gob-dr-fill);
  color: var(--gob-dr-title);
}
.close:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-dr-vino) 45%, transparent);
  outline-offset: 2px;
}
.close svg { width: 14px; height: 14px; display: block; }

.body {
  padding: 4px 20px 8px;
  overflow: auto;
}

.body-card {
  padding: 14px 15px;
  border-radius: 14px;
  background: var(--gob-dr-fill);
  color: var(--gob-dr-title);
  font-size: 13.5px;
  font-weight: 550;
  line-height: 1.5;
}

.backdrop[data-variant='filters'] .body-card,
.backdrop[data-variant='form'] .body-card {
  background: #fff;
  border: 1px dashed color-mix(in srgb, var(--gob-dr-border) 70%, #9f2141);
  color: var(--gob-dr-muted);
  min-height: 88px;
}

.backdrop[data-variant='danger'] .body-card {
  background: color-mix(in srgb, #c62828 6%, #fff);
  border: 1px solid color-mix(in srgb, #c62828 12%, transparent);
}

.backdrop[data-variant='dense'] .head { padding: 14px 14px 10px; }
.backdrop[data-variant='dense'] .title { font-size: 15px; }
.backdrop[data-variant='dense'] .body { padding: 0 14px 6px; }
.backdrop[data-variant='dense'] .actions { padding: 12px 14px 14px; gap: 6px; }
.backdrop[data-variant='dense'] .btn {
  min-height: 34px;
  padding: 0 12px;
  font-size: 12.5px;
  border-radius: 10px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  padding: 16px 20px 20px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  background: color-mix(in srgb, var(--gob-dr-fill) 55%, #fff);
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
  transition: background 150ms var(--gob-dr-ease), border-color 150ms var(--gob-dr-ease), color 150ms var(--gob-dr-ease);
}
.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-dr-accent) 45%, transparent);
  outline-offset: 2px;
}

.cancel {
  background: #fff;
  border-color: var(--gob-dr-border);
  color: var(--gob-dr-title);
}
.cancel:hover { background: var(--gob-dr-fill); }

.confirm {
  background: var(--gob-dr-vino);
  color: #fff;
}
.confirm:hover { background: var(--gob-dr-vino-deep); }

.backdrop[data-variant='danger'] .confirm { background: #c62828; }
.backdrop[data-variant='danger'] .confirm:hover { background: #a51f1f; }
.backdrop[data-variant='complete'] .confirm { background: var(--gob-dr-vino); }

@keyframes gob-dr-scrim {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes gob-dr-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes gob-dr-in-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop, .panel { animation: none !important; }
}
`;
