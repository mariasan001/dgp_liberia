export const accordionStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ac-title: #181511;
  --gob-ac-muted: #6f6a63;
  --gob-ac-border: rgba(24, 21, 17, 0.1);
  --gob-ac-bg: #ffffff;
  --gob-ac-fill: #f3f3f3;
  --gob-ac-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: grid;
  gap: 0;
  width: 100%;
  border: 1px solid var(--gob-ac-border);
  border-radius: 16px;
  background: var(--gob-ac-bg);
  overflow: hidden;
}

.item {
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  background: transparent;
}
.item:last-child { border-bottom: 0; }

.trigger {
  appearance: none;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  min-height: 52px;
  padding: 14px 16px;
  border: 0;
  background: transparent;
  color: var(--gob-ac-title);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 140ms var(--gob-ac-ease);
}
.trigger:hover { background: #fafafa; }
.item[data-open='true'] .trigger { background: #fafafa; }

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.icon {
  width: 18px;
  height: 18px;
  color: var(--gob-ac-muted);
  transition: transform 160ms var(--gob-ac-ease);
}
.icon svg { width: 18px; height: 18px; display: block; }
.item[data-open='true'] .icon { transform: rotate(180deg); }

.panel {
  display: none;
  padding: 0 16px 16px;
}
.item[data-open='true'] .panel { display: block; }

.body {
  margin: 0;
  padding: 0;
  color: var(--gob-ac-muted);
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.55;
}

.root[data-variant='soft'] {
  background: var(--gob-ac-fill);
  border-color: transparent;
}
.root[data-variant='soft'] .trigger:hover,
.root[data-variant='soft'] .item[data-open='true'] .trigger {
  background: rgba(255, 255, 255, 0.55);
}
.root[data-variant='soft'] .body { color: var(--gob-ac-title); }

.root[data-variant='outline'] {
  border-color: rgba(24, 21, 17, 0.14);
}

.root[data-variant='dense'] .trigger {
  min-height: 42px;
  padding: 10px 14px;
}
.root[data-variant='dense'] .title { font-size: 13px; }
.root[data-variant='dense'] .panel { padding: 0 14px 12px; }
.root[data-variant='dense'] .body { font-size: 12.5px; }

.root[data-variant='flush'] {
  border: 0;
  border-radius: 0;
  background: transparent;
}
.root[data-variant='flush'] .item {
  border-bottom: 1px solid var(--gob-ac-border);
}
.root[data-variant='flush'] .trigger:hover,
.root[data-variant='flush'] .item[data-open='true'] .trigger {
  background: transparent;
}

.root[data-variant='separated'] {
  gap: 10px;
  border: 0;
  background: transparent;
  overflow: visible;
}
.root[data-variant='separated'] .item {
  border: 1px solid var(--gob-ac-border);
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
}

.root[data-variant='brand'] .item[data-open='true'] .title {
  color: var(--gob-ac-title);
}
.root[data-variant='brand'] .item[data-open='true'] {
  box-shadow: inset 3px 0 0 #9f2141;
}

.root[data-variant='faq'] .title {
  font-weight: 700;
}

.root[data-variant='complete'] .item[data-open='true'] {
  box-shadow: inset 3px 0 0 #bc945a;
}

@media (prefers-reduced-motion: reduce) {
  .icon { transition: none !important; }
}
`;
