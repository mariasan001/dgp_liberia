export const sheetStyles = `
:host {
  display: contents;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sh-vino: #9f2141;
  --gob-sh-vino-deep: #7a1832;
  --gob-sh-dorado: #bc945a;
  --gob-sh-title: #181511;
  --gob-sh-muted: #6f6a63;
  --gob-sh-border: rgba(24, 21, 17, 0.1);
  --gob-sh-bg: #ffffff;
  --gob-sh-fill: #f3f3f3;
  --gob-sh-accent: #9f2141;
  --gob-sh-max: 420px;
  --gob-sh-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

:host([preview]) {
  display: block;
  width: 100%;
  max-width: 440px;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: none;
  align-items: flex-end;
  justify-content: center;
  background: rgba(24, 21, 17, 0.48);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  animation: gob-sh-scrim 200ms var(--gob-sh-ease);
}

:host([open]) .backdrop { display: flex; }

:host([preview]) .backdrop,
:host([preview][open]) .backdrop {
  position: relative;
  inset: auto;
  z-index: auto;
  display: flex;
  min-height: 300px;
  padding: 0;
  background: #f3f3f3;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  animation: none;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--gob-sh-border);
  width: 100%;
}

.sheet {
  position: relative;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  width: min(560px, 100%);
  max-height: min(var(--gob-sh-max), 86vh);
  border-radius: 22px 22px 0 0;
  background: var(--gob-sh-bg);
  border: 1px solid var(--gob-sh-border);
  border-bottom: 0;
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 -18px 48px rgba(24, 21, 17, 0.16);
  animation: gob-sh-in 240ms var(--gob-sh-ease);
  overflow: hidden;
}

:host([preview]) .sheet {
  width: 100%;
  max-height: none;
  margin-top: auto;
  border-radius: 18px 18px 0 0;
  border-bottom: 0;
  box-shadow: 0 -8px 24px rgba(24, 21, 17, 0.08);
  animation: none;
}

.sheet::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  background: var(--gob-sh-accent);
  opacity: 0;
}

.backdrop[data-variant='complete'],
.backdrop[data-variant='brand'] { --gob-sh-accent: #bc945a; }
.backdrop[data-variant='danger'] { --gob-sh-accent: #c62828; }
.backdrop[data-variant='success'] { --gob-sh-accent: #1f8a55; }
.backdrop[data-variant='complete'] .sheet::before,
.backdrop[data-variant='danger'] .sheet::before,
.backdrop[data-variant='success'] .sheet::before,
.backdrop[data-variant='brand'] .sheet::before { opacity: 1; }

.backdrop[data-variant='peek'] { --gob-sh-max: 280px; }
.backdrop[data-variant='tall'] { --gob-sh-max: 560px; }

.handle {
  display: flex;
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
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: start;
  padding: 4px 20px 12px;
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
  color: var(--gob-sh-title);
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-sh-muted);
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
  color: var(--gob-sh-muted);
  cursor: pointer;
  transition: background 140ms var(--gob-sh-ease), color 140ms var(--gob-sh-ease);
}
.close:hover {
  background: var(--gob-sh-fill);
  color: var(--gob-sh-title);
}
.close svg { width: 14px; height: 14px; display: block; }

.body {
  padding: 0 20px 8px;
  overflow: auto;
}

.body-card {
  padding: 14px 15px;
  border-radius: 14px;
  background: var(--gob-sh-fill);
  color: var(--gob-sh-title);
  font-size: 13.5px;
  font-weight: 550;
  line-height: 1.5;
}

.action-list {
  display: none;
  gap: 6px;
  margin-top: 10px;
}
.action-item {
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--gob-sh-border);
  font-size: 13px;
  font-weight: 700;
  color: var(--gob-sh-title);
}
.backdrop[data-variant='actions'] .action-list { display: grid; }

.backdrop[data-variant='form'] .body-card {
  background: #fff;
  border: 1px dashed color-mix(in srgb, var(--gob-sh-border) 70%, #9f2141);
  color: var(--gob-sh-muted);
  min-height: 72px;
}
.backdrop[data-variant='danger'] .body-card {
  background: color-mix(in srgb, #c62828 6%, #fff);
  border: 1px solid color-mix(in srgb, #c62828 12%, transparent);
}
.backdrop[data-variant='success'] .body-card {
  background: color-mix(in srgb, #1f8a55 7%, #fff);
  border: 1px solid color-mix(in srgb, #1f8a55 12%, transparent);
}

.backdrop[data-variant='dense'] .head { padding: 2px 14px 8px; }
.backdrop[data-variant='dense'] .title { font-size: 15px; }
.backdrop[data-variant='dense'] .body { padding: 0 14px 6px; }
.backdrop[data-variant='dense'] .actions { padding: 12px 14px 14px; }
.backdrop[data-variant='dense'] .btn {
  min-height: 34px;
  border-radius: 10px;
  font-size: 12.5px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  padding: 16px 20px 20px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  background: color-mix(in srgb, var(--gob-sh-fill) 55%, #fff);
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
  transition: background 150ms var(--gob-sh-ease), border-color 150ms var(--gob-sh-ease), filter 150ms var(--gob-sh-ease);
}
.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-sh-accent) 45%, transparent);
  outline-offset: 2px;
}

.cancel {
  background: #fff;
  border-color: var(--gob-sh-border);
  color: var(--gob-sh-title);
}
.cancel:hover { background: var(--gob-sh-fill); }

.confirm {
  background: var(--gob-sh-accent);
  color: #fff;
}
.confirm:hover { filter: brightness(0.92); }

.backdrop[data-variant='brand'] .confirm,
.backdrop[data-variant='complete'] .confirm {
  background: var(--gob-sh-vino);
}

@keyframes gob-sh-scrim {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes gob-sh-in {
  from { transform: translateY(24px); opacity: 0.9; }
  to { transform: translateY(0); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop, .sheet { animation: none !important; }
}
`;
