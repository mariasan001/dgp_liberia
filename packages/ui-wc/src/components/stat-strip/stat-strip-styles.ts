export const statStripStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ss-vino: #9f2141;
  --gob-ss-gold: #bc945a;
  --gob-ss-title: #181511;
  --gob-ss-muted: #6f6a63;
  --gob-ss-fill: #f3f3f3;
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  width: 100%;
  border-radius: 22px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  overflow: hidden;
}

.item {
  display: grid;
  gap: 6px;
  padding: 22px 20px;
  min-width: 0;
  border-right: 1px solid rgba(24, 21, 17, 0.08);
}
.item:last-child { border-right: 0; }

.label {
  margin: 0;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gob-ss-muted);
}

.value {
  margin: 0;
  font-size: clamp(1.45rem, 2.6vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--gob-ss-title);
  line-height: 1;
}

.hint {
  margin: 0;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--gob-ss-muted);
}

.root[data-variant='soft'] { background: var(--gob-ss-fill); border-color: transparent; }
.root[data-variant='soft'] .item { border-right-color: rgba(24, 21, 17, 0.06); }

.root[data-variant='dense'] { border-radius: 14px; }
.root[data-variant='dense'] .item { padding: 14px 12px; gap: 4px; }
.root[data-variant='dense'] .value { font-size: 1.2rem; }
.root[data-variant='dense'] .hint { font-size: 11.5px; }

.root[data-variant='outline'] {
  border: 1.5px solid rgba(159, 33, 65, 0.28);
  box-shadow: inset 4px 0 0 var(--gob-ss-vino);
}

.root[data-variant='cards'] {
  gap: 12px;
  padding: 12px;
  background: var(--gob-ss-fill);
  border-color: transparent;
}
.root[data-variant='cards'] .item {
  border: 1px solid rgba(24, 21, 17, 0.08);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 18px rgba(24, 21, 17, 0.04);
}

.root[data-variant='inline'] {
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  gap: 28px;
  padding: 16px 20px;
  border-radius: 16px;
}
.root[data-variant='inline'] .item {
  border-right: 0;
  padding: 0;
  grid-auto-flow: column;
  grid-template-columns: auto auto;
  align-items: baseline;
  column-gap: 8px;
}
.root[data-variant='inline'] .hint { display: none; }
.root[data-variant='inline'] .value { font-size: 1.15rem; }

.root[data-variant='centered'] .item { justify-items: center; text-align: center; }

.root[data-variant='wide'] .item { padding: 28px 24px; }
.root[data-variant='wide'] .value { font-size: clamp(1.7rem, 3vw, 2.2rem); }

.root[data-variant='brand'] {
  background: var(--gob-ss-vino);
  border-color: transparent;
}
.root[data-variant='brand'] .item { border-right-color: rgba(255,255,255,0.14); }
.root[data-variant='brand'] .label,
.root[data-variant='brand'] .hint { color: rgba(255,255,255,0.7); }
.root[data-variant='brand'] .value { color: #fff; }

.root[data-variant='complete'] {
  background: #fffaf2;
  border-color: rgba(188, 148, 90, 0.35);
}
.root[data-variant='complete'] .value { color: #6e5628; }
.root[data-variant='complete'] .label { color: #8a6d3a; }

@media (max-width: 720px) {
  .root,
  .root[data-variant='cards'],
  .root[data-variant='inline'] {
    grid-template-columns: 1fr 1fr;
  }
  .item { border-right: 0; border-bottom: 1px solid rgba(24, 21, 17, 0.08); }
  .item:nth-last-child(-n+2) { border-bottom: 0; }
  .root[data-variant='cards'] .item { border-bottom: 1px solid rgba(24, 21, 17, 0.08); }
  .root[data-variant='inline'] .item { border-bottom: 0; }
}
`;
