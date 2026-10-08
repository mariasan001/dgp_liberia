export const commandPaletteStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-cp-vino: #9f2141;
  --gob-cp-gold: #bc945a;
  --gob-cp-title: #181511;
  --gob-cp-muted: #6f6a63;
  --gob-cp-fill: #f3f3f3;
  --gob-cp-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: grid;
  gap: 0;
  width: 100%;
  border-radius: 22px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  overflow: hidden;
  box-shadow: 0 22px 48px rgba(24, 21, 17, 0.14);
}

.search {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 16px 16px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.08);
}

.icon {
  width: 18px;
  height: 18px;
  border: 2px solid var(--gob-cp-muted);
  border-radius: 999px;
  position: relative;
  opacity: 0.7;
}
.icon::after {
  content: '';
  position: absolute;
  width: 7px;
  height: 2px;
  background: var(--gob-cp-muted);
  right: -4px;
  bottom: -1px;
  transform: rotate(45deg);
  border-radius: 2px;
}

.input {
  appearance: none;
  border: 0;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--gob-cp-title);
  min-width: 0;
}
.input::placeholder { color: var(--gob-cp-muted); font-weight: 500; }

.kbd {
  min-height: 24px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid rgba(24, 21, 17, 0.12);
  background: var(--gob-cp-fill);
  color: var(--gob-cp-muted);
  font-size: 11px;
  font-weight: 750;
  display: inline-flex;
  align-items: center;
}

.results {
  display: grid;
  gap: 2px;
  padding: 10px;
  max-height: 280px;
  overflow: auto;
}

.group {
  display: none;
  margin: 8px 8px 4px;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gob-cp-muted);
}

.item {
  appearance: none;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  min-height: 42px;
  padding: 0 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--gob-cp-title);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 140ms var(--gob-cp-ease);
}
.item:hover,
.item[data-active='true'] {
  background: #f7eef1;
}
.item[data-active='true'] { color: #6e142c; }

.label {
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: -0.015em;
}
.hint {
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-cp-muted);
}

.foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-top: 1px solid rgba(24, 21, 17, 0.08);
  background: #fafafa;
  color: var(--gob-cp-muted);
  font-size: 11.5px;
  font-weight: 600;
}

.root[data-variant='soft'] { background: var(--gob-cp-fill); box-shadow: none; border-color: transparent; }
.root[data-variant='soft'] .search,
.root[data-variant='soft'] .foot { background: rgba(255,255,255,0.55); }

.root[data-variant='dense'] .search { padding: 12px; }
.root[data-variant='dense'] .item { min-height: 36px; border-radius: 10px; }
.root[data-variant='dense'] .results { padding: 8px; max-height: 220px; }

.root[data-variant='outline'] {
  border: 1.5px solid rgba(159, 33, 65, 0.28);
  box-shadow: none;
}

.root[data-variant='grouped'] .group { display: block; }

.root[data-variant='compact'] { border-radius: 16px; box-shadow: 0 12px 28px rgba(24,21,17,0.1); }
.root[data-variant='compact'] .foot { display: none; }
.root[data-variant='compact'] .hint { display: none; }

.root[data-variant='wide'] .results { max-height: 340px; }
.root[data-variant='wide'] .item { min-height: 48px; }

.root[data-variant='spotlight'] {
  box-shadow: 0 28px 60px rgba(24, 21, 17, 0.18);
}
.root[data-variant='spotlight'] .search { padding: 18px 18px; }
.root[data-variant='spotlight'] .input { font-size: 16px; }

.root[data-variant='brand'] {
  background: var(--gob-cp-vino);
  border-color: transparent;
}
.root[data-variant='brand'] .input,
.root[data-variant='brand'] .label { color: #fff; }
.root[data-variant='brand'] .input::placeholder,
.root[data-variant='brand'] .hint,
.root[data-variant='brand'] .foot,
.root[data-variant='brand'] .kbd { color: rgba(255,255,255,0.7); }
.root[data-variant='brand'] .icon,
.root[data-variant='brand'] .icon::after { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.7); }
.root[data-variant='brand'] .icon { background: transparent; }
.root[data-variant='brand'] .kbd,
.root[data-variant='brand'] .foot {
  background: rgba(0,0,0,0.12);
  border-color: rgba(255,255,255,0.14);
}
.root[data-variant='brand'] .search,
.root[data-variant='brand'] .foot { border-color: rgba(255,255,255,0.14); }
.root[data-variant='brand'] .item:hover,
.root[data-variant='brand'] .item[data-active='true'] {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.root[data-variant='complete'] {
  background: #fffaf2;
  border-color: rgba(188, 148, 90, 0.35);
}
.root[data-variant='complete'] .item:hover,
.root[data-variant='complete'] .item[data-active='true'] {
  background: rgba(188, 148, 90, 0.14);
  color: #6e5628;
}
.root[data-variant='complete'] .kbd { background: #f6f0e4; }
`;
