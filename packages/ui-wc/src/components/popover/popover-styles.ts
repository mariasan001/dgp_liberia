export const popoverStyles = `
:host {
  display: inline-flex;
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-po-vino: #9f2141;
  --gob-po-dorado: #bc945a;
  --gob-po-title: #181511;
  --gob-po-muted: #6f6a63;
  --gob-po-border: rgba(24, 21, 17, 0.1);
  --gob-po-bg: #ffffff;
  --gob-po-fill: #f3f3f3;
  --gob-po-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.trigger {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--gob-po-border);
  background: #fff;
  color: var(--gob-po-title);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: background 140ms var(--gob-po-ease), border-color 140ms var(--gob-po-ease);
}
.trigger:hover { background: var(--gob-po-fill); }
.root[data-open='true'] .trigger {
  border-color: color-mix(in srgb, var(--gob-po-vino) 28%, #d7dde6);
  color: var(--gob-po-vino);
}
.trigger:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-po-vino) 45%, transparent);
  outline-offset: 2px;
}

.trigger-caret {
  width: 12px;
  height: 12px;
  opacity: 0.5;
  transition: transform 150ms var(--gob-po-ease);
}
.trigger-caret svg { width: 12px; height: 12px; display: block; }
.root[data-open='true'] .trigger-caret { transform: rotate(180deg); }

.panel {
  position: absolute;
  z-index: 24;
  width: max-content;
  min-width: 200px;
  max-width: min(280px, 78vw);
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid var(--gob-po-border);
  background: var(--gob-po-bg);
  color: var(--gob-po-title);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 14px 32px rgba(24, 21, 17, 0.14);
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px) scale(0.98);
  transition:
    opacity 150ms var(--gob-po-ease),
    transform 150ms var(--gob-po-ease);
}

.root[data-open='true'] .panel {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

.panel-title {
  margin: 0 0 4px;
  font-size: 13.5px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.panel-desc {
  margin: 0;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-po-muted);
}

.menu {
  display: none;
  grid-template-columns: 1fr;
  gap: 2px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
}
.menu-item {
  display: flex;
  align-items: center;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 650;
  color: var(--gob-po-title);
}
.menu-item:hover { background: var(--gob-po-fill); }
.root[data-variant='menu'] .menu { display: grid; }
.root[data-variant='menu'] .panel-desc { display: none; }

.root[data-placement='top'] .panel {
  left: 50%;
  bottom: calc(100% + 10px);
  transform: translate(-50%, 4px) scale(0.98);
}
.root[data-placement='top'][data-open='true'] .panel {
  transform: translate(-50%, 0) scale(1);
}
.root[data-placement='bottom'] .panel {
  left: 50%;
  top: calc(100% + 10px);
  transform: translate(-50%, -4px) scale(0.98);
}
.root[data-placement='bottom'][data-open='true'] .panel {
  transform: translate(-50%, 0) scale(1);
}
.root[data-placement='left'] .panel {
  right: calc(100% + 10px);
  top: 50%;
  transform: translate(-4px, -50%) scale(0.98);
}
.root[data-placement='left'][data-open='true'] .panel {
  transform: translate(0, -50%) scale(1);
}
.root[data-placement='right'] .panel {
  left: calc(100% + 10px);
  top: 50%;
  transform: translate(4px, -50%) scale(0.98);
}
.root[data-placement='right'][data-open='true'] .panel {
  transform: translate(0, -50%) scale(1);
}

.root[data-variant='soft'] .panel { background: var(--gob-po-fill); }
.root[data-variant='solid'] .panel,
.root[data-variant='brand'] .panel {
  background: var(--gob-po-vino);
  border-color: transparent;
  color: #fff;
}
.root[data-variant='solid'] .panel-desc,
.root[data-variant='brand'] .panel-desc { color: rgba(255,255,255,0.78); }
.root[data-variant='solid'] .menu,
.root[data-variant='brand'] .menu { border-top-color: rgba(255,255,255,0.16); }
.root[data-variant='solid'] .menu-item:hover,
.root[data-variant='brand'] .menu-item:hover { background: rgba(255,255,255,0.12); }

.root[data-variant='outline'] .panel {
  border-color: color-mix(in srgb, var(--gob-po-vino) 28%, #d7dde6);
}
.root[data-variant='dense'] .panel {
  padding: 8px 10px;
  border-radius: 11px;
  min-width: 160px;
}
.root[data-variant='dense'] .panel-title { font-size: 12.5px; }
.root[data-variant='dense'] .panel-desc { font-size: 11.5px; }
.root[data-variant='rich'] .panel {
  max-width: min(320px, 84vw);
  padding: 14px 16px;
}
.root[data-variant='success'] .panel {
  background: #1f8a55;
  border-color: transparent;
  color: #fff;
}
.root[data-variant='success'] .panel-desc { color: rgba(255,255,255,0.8); }
.root[data-variant='complete'] .panel {
  border-left: 3px solid var(--gob-po-dorado);
}

@media (prefers-reduced-motion: reduce) {
  .panel, .trigger-caret { transition: none !important; }
}
`;
