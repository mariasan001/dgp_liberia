export const fabStyles = `
:host {
  display: inline-flex;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-fab-vino: #9f2141;
  --gob-fab-vino-deep: #7a1832;
  --gob-fab-dorado: #bc945a;
  --gob-fab-title: #181511;
  --gob-fab-muted: #6f6a63;
  --gob-fab-border: rgba(24, 21, 17, 0.1);
  --gob-fab-fill: #f3f3f3;
  --gob-fab-bg: #ffffff;
  --gob-fab-size: 56px;
  --gob-fab-icon: 22px;
  --gob-fab-radius: 18px;
  --gob-fab-font: 14px;
  --gob-fab-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  position: relative;
  display: inline-flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 10px;
}

.actions {
  display: none;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 10px;
  padding-bottom: 2px;
}

.root[data-variant='actions'][data-open='true'] .actions {
  display: flex;
}

.actionRow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  animation: gob-fab-rise 160ms var(--gob-fab-ease) both;
}

.actionLabel {
  padding: 6px 10px;
  border-radius: 10px;
  background: var(--gob-fab-bg);
  border: 1px solid var(--gob-fab-border);
  color: var(--gob-fab-title);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.015em;
  white-space: nowrap;
  box-shadow: 0 6px 16px rgba(24, 21, 17, 0.08);
}

.actionBtn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 14px;
  border: 1px solid var(--gob-fab-border);
  background: var(--gob-fab-bg);
  color: var(--gob-fab-vino-deep);
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(24, 21, 17, 0.1);
  transition:
    background 150ms var(--gob-fab-ease),
    color 150ms var(--gob-fab-ease),
    transform 150ms var(--gob-fab-ease);
}

.actionBtn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--gob-fab-vino) 8%, #fff);
  color: var(--gob-fab-vino);
  transform: translateY(-1px);
}

.actionBtn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-fab-vino) 45%, transparent);
  outline-offset: 2px;
}

.actionBtn:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.actionBtn .icon {
  width: 18px;
  height: 18px;
}
.actionBtn .icon svg { width: 18px; height: 18px; }

.root[data-variant='actions'] .btn .icon {
  transition: transform 180ms var(--gob-fab-ease);
}
.root[data-variant='actions'][data-open='true'] .btn .icon {
  transform: rotate(45deg);
}

.root[data-variant='actions'][data-open='true'] .btn {
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 0 0 3px color-mix(in srgb, var(--gob-fab-vino) 16%, transparent),
    0 14px 28px rgba(159, 33, 65, 0.32);
}

@keyframes gob-fab-rise {
  from { opacity: 0; transform: translateY(8px) scale(0.92); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: var(--gob-fab-size);
  min-height: var(--gob-fab-size);
  padding: 0;
  border-radius: var(--gob-fab-radius);
  border: 1px solid transparent;
  background: var(--gob-fab-vino);
  color: #fff;
  font: inherit;
  font-size: var(--gob-fab-font);
  font-weight: 700;
  letter-spacing: -0.02em;
  cursor: pointer;
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 10px 24px rgba(159, 33, 65, 0.28);
  transition:
    background 160ms var(--gob-fab-ease),
    color 160ms var(--gob-fab-ease),
    border-color 160ms var(--gob-fab-ease),
    box-shadow 180ms var(--gob-fab-ease),
    transform 160ms var(--gob-fab-ease);
}

.btn:hover:not(:disabled) {
  background: var(--gob-fab-vino-deep);
  transform: translateY(-1px);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 14px 28px rgba(159, 33, 65, 0.32);
}

.btn:active:not(:disabled) {
  transform: translateY(0) scale(0.97);
}

.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-fab-vino) 45%, transparent);
  outline-offset: 3px;
}

.btn:disabled {
  opacity: 0.42;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.root[data-size='sm'] { --gob-fab-size: 44px; --gob-fab-icon: 18px; --gob-fab-radius: 14px; --gob-fab-font: 12.5px; }
.root[data-size='lg'] { --gob-fab-size: 64px; --gob-fab-icon: 24px; --gob-fab-radius: 22px; --gob-fab-font: 15px; }

.root[data-variant='mini'] { --gob-fab-size: 40px; --gob-fab-icon: 17px; --gob-fab-radius: 14px; }

.root[data-variant='basic'] .btn,
.root[data-variant='solid'] .btn {
  background: var(--gob-fab-vino);
  color: #fff;
}

.root[data-variant='soft'] .btn {
  background: color-mix(in srgb, var(--gob-fab-vino) 10%, #fff);
  color: var(--gob-fab-vino-deep);
  border-color: color-mix(in srgb, var(--gob-fab-vino) 14%, transparent);
  box-shadow: 0 8px 20px rgba(24, 21, 17, 0.08);
}
.root[data-variant='soft'] .btn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--gob-fab-vino) 16%, #fff);
  color: var(--gob-fab-vino-deep);
}

.root[data-variant='tonal'] .btn {
  background: color-mix(in srgb, var(--gob-fab-dorado) 18%, #fff);
  color: #3d3428;
  border-color: color-mix(in srgb, var(--gob-fab-dorado) 34%, transparent);
  box-shadow: 0 8px 20px rgba(188, 148, 90, 0.2);
}
.root[data-variant='tonal'] .btn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--gob-fab-dorado) 26%, #fff);
  color: #3d3428;
}

.root[data-variant='outline'] .btn {
  background: var(--gob-fab-bg);
  color: var(--gob-fab-vino-deep);
  border-color: var(--gob-fab-border);
  box-shadow: 0 8px 20px rgba(24, 21, 17, 0.08);
}
.root[data-variant='outline'] .btn:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--gob-fab-vino) 35%, transparent);
  background: #fff;
  color: var(--gob-fab-vino);
}

.root[data-variant='danger'] .btn {
  background: #c62828;
  box-shadow: 0 10px 24px rgba(198, 40, 40, 0.28);
}
.root[data-variant='danger'] .btn:hover:not(:disabled) {
  background: #a51f1f;
}

.root[data-variant='success'] .btn {
  background: #1f8a55;
  box-shadow: 0 10px 24px rgba(31, 138, 85, 0.28);
}
.root[data-variant='success'] .btn:hover:not(:disabled) {
  background: #187246;
}

.root[data-variant='complete'] .btn {
  background: var(--gob-fab-bg);
  color: var(--gob-fab-vino-deep);
  border: 1px solid var(--gob-fab-border);
  border-left: 3px solid var(--gob-fab-dorado);
  box-shadow: 0 8px 20px rgba(24, 21, 17, 0.08);
}
.root[data-variant='complete'] .btn:hover:not(:disabled) {
  background: #fff;
  color: var(--gob-fab-vino);
}

.root[data-variant='extended'] .btn {
  padding: 0 20px 0 16px;
  min-width: auto;
  border-radius: 999px;
}

.label {
  display: none;
  white-space: nowrap;
}
.root[data-variant='extended'] .label { display: inline; }

.icon {
  width: var(--gob-fab-icon);
  height: var(--gob-fab-icon);
  display: inline-flex;
  flex: 0 0 auto;
}
.icon svg { width: var(--gob-fab-icon); height: var(--gob-fab-icon); display: block; }
`;
