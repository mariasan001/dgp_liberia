export const iconButtonStyles = `
:host {
  display: inline-flex;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ib-vino: #9f2141;
  --gob-ib-vino-deep: #7a1832;
  --gob-ib-dorado: #bc945a;
  --gob-ib-title: #181511;
  --gob-ib-muted: #6f6a63;
  --gob-ib-border: rgba(24, 21, 17, 0.1);
  --gob-ib-fill: #f3f3f3;
  --gob-ib-bg: #ffffff;
  --gob-ib-size: 42px;
  --gob-ib-icon: 18px;
  --gob-ib-radius: 14px;
  --gob-ib-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.btn {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--gob-ib-size);
  height: var(--gob-ib-size);
  padding: 0;
  border-radius: var(--gob-ib-radius);
  border: 1px solid transparent;
  background: var(--gob-ib-fill);
  color: var(--gob-ib-title);
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.03);
  transition:
    background 160ms var(--gob-ib-ease),
    color 160ms var(--gob-ib-ease),
    border-color 160ms var(--gob-ib-ease),
    box-shadow 160ms var(--gob-ib-ease),
    transform 140ms var(--gob-ib-ease);
}

.btn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--gob-ib-vino) 8%, #fff);
  color: var(--gob-ib-vino-deep);
  border-color: color-mix(in srgb, var(--gob-ib-vino) 16%, transparent);
}

.btn:active:not(:disabled) {
  transform: scale(0.95);
}

.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-ib-vino) 40%, transparent);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

.root[data-size='sm'] { --gob-ib-size: 34px; --gob-ib-icon: 15px; --gob-ib-radius: 11px; }
.root[data-size='lg'] { --gob-ib-size: 50px; --gob-ib-icon: 20px; --gob-ib-radius: 16px; }

.root[data-variant='basic'] .btn {
  background: var(--gob-ib-fill);
  color: var(--gob-ib-title);
  border-color: transparent;
  box-shadow: none;
}
.root[data-variant='solid'] .btn {
  background: var(--gob-ib-vino);
  color: #fff;
  border-color: var(--gob-ib-vino);
  box-shadow: none;
}
.root[data-variant='solid'] .btn:hover:not(:disabled) {
  background: var(--gob-ib-vino-deep);
  border-color: var(--gob-ib-vino-deep);
  color: #fff;
}
.root[data-variant='soft'] .btn {
  background: color-mix(in srgb, var(--gob-ib-vino) 9%, #fff);
  color: var(--gob-ib-vino-deep);
  border-color: color-mix(in srgb, var(--gob-ib-vino) 12%, transparent);
  box-shadow: none;
}
.root[data-variant='outline'] .btn {
  background: var(--gob-ib-bg);
  border-color: var(--gob-ib-border);
  color: var(--gob-ib-title);
}
.root[data-variant='outline'] .btn:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--gob-ib-vino) 40%, transparent);
  color: var(--gob-ib-vino);
}
.root[data-variant='ghost'] .btn {
  background: transparent;
  color: var(--gob-ib-muted);
  box-shadow: none;
}
.root[data-variant='ghost'] .btn:hover:not(:disabled) {
  background: rgba(24, 21, 17, 0.05);
  color: var(--gob-ib-title);
  border-color: transparent;
}
.root[data-variant='danger'] .btn {
  background: color-mix(in srgb, #c62828 8%, #fff);
  color: #c62828;
  border-color: color-mix(in srgb, #c62828 18%, transparent);
  box-shadow: none;
}
.root[data-variant='danger'] .btn:hover:not(:disabled) {
  background: #c62828;
  border-color: #c62828;
  color: #fff;
}
.root[data-variant='success'] .btn {
  background: color-mix(in srgb, #1f8a55 10%, #fff);
  color: #1f8a55;
  border-color: color-mix(in srgb, #1f8a55 18%, transparent);
  box-shadow: none;
}
.root[data-variant='success'] .btn:hover:not(:disabled) {
  background: #1f8a55;
  border-color: #1f8a55;
  color: #fff;
}
.root[data-variant='tonal'] .btn {
  background: color-mix(in srgb, var(--gob-ib-dorado) 16%, #fff);
  color: #3d3428;
  border-color: color-mix(in srgb, var(--gob-ib-dorado) 34%, transparent);
  box-shadow: none;
}
.root[data-variant='square'] .btn {
  border-radius: 10px;
  background: var(--gob-ib-bg);
  border-color: var(--gob-ib-border);
}
.root[data-variant='complete'] .btn {
  background: var(--gob-ib-bg);
  border: 1px solid var(--gob-ib-border);
  border-left: 3px solid var(--gob-ib-dorado);
  color: var(--gob-ib-vino-deep);
  box-shadow: none;
}

.icon {
  width: var(--gob-ib-icon);
  height: var(--gob-ib-icon);
  display: inline-flex;
}
.icon svg { width: var(--gob-ib-icon); height: var(--gob-ib-icon); display: block; }

.spinner {
  display: none;
  width: calc(var(--gob-ib-icon) - 2px);
  height: calc(var(--gob-ib-icon) - 2px);
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, currentColor 25%, transparent);
  border-top-color: currentColor;
  animation: gob-ib-spin 700ms linear infinite;
}

.root[data-loading='true'] .icon { display: none; }
.root[data-loading='true'] .spinner { display: block; }

@keyframes gob-ib-spin {
  to { transform: rotate(360deg); }
}
`;
