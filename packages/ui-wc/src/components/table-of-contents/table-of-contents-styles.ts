export const tableOfContentsStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-toc-vino: #9f2141;
  --gob-toc-vino-deep: #6e142c;
  --gob-toc-gold: #bc945a;
  --gob-toc-title: #181511;
  --gob-toc-muted: #6f6a63;
  --gob-toc-fill: #f3f3f3;
  --gob-toc-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: grid;
  gap: 14px;
  width: 100%;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
}

.head {
  display: grid;
  gap: 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.08);
}

.kicker {
  margin: 0;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gob-toc-muted);
}

.title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--gob-toc-title);
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
}

.item {
  appearance: none;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  min-height: 38px;
  padding: 0 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--gob-toc-title);
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: -0.015em;
  text-align: left;
  cursor: pointer;
  transition: background 140ms var(--gob-toc-ease), color 140ms var(--gob-toc-ease);
}
.item:hover { background: var(--gob-toc-fill); }
.item[data-active='true'] {
  background: #f7eef1;
  color: var(--gob-toc-vino-deep);
  font-weight: 750;
}

.num {
  display: none;
  width: 20px;
  font-size: 11px;
  font-weight: 800;
  color: var(--gob-toc-muted);
  font-variant-numeric: tabular-nums;
}
.item[data-active='true'] .num { color: var(--gob-toc-vino); }

.label { min-width: 0; }

.root[data-variant='soft'] {
  background: var(--gob-toc-fill);
  border-color: transparent;
}
.root[data-variant='soft'] .item:hover,
.root[data-variant='soft'] .item[data-active='true'] {
  background: #fff;
}

.root[data-variant='dense'] {
  gap: 10px;
  padding: 12px;
  border-radius: 14px;
}
.root[data-variant='dense'] .item {
  min-height: 32px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 12.5px;
}
.root[data-variant='dense'] .head { padding-bottom: 6px; }
.root[data-variant='dense'] .title { font-size: 13.5px; }

.root[data-variant='outline'] {
  border: 1.5px solid rgba(159, 33, 65, 0.28);
}
.root[data-variant='outline'] .item[data-active='true'] {
  box-shadow: inset 3px 0 0 var(--gob-toc-vino);
}

.root[data-variant='numbered'] .item { grid-template-columns: 22px 1fr; }
.root[data-variant='numbered'] .num { display: inline-flex; }

.root[data-variant='sticky'] {
  box-shadow: 0 14px 32px rgba(24, 21, 17, 0.08);
}
.root[data-variant='sticky'] .kicker::after {
  content: ' · fijo';
  font-weight: 700;
  letter-spacing: 0.08em;
}

.root[data-variant='minimal'] {
  border: 0;
  background: transparent;
  padding: 0;
  border-radius: 0;
}
.root[data-variant='minimal'] .head {
  border-bottom: 0;
  padding-bottom: 0;
}
.root[data-variant='minimal'] .item {
  min-height: 34px;
  padding: 0;
  border-radius: 0;
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
}
.root[data-variant='minimal'] .item:hover,
.root[data-variant='minimal'] .item[data-active='true'] {
  background: transparent;
}
.root[data-variant='minimal'] .item[data-active='true'] {
  color: var(--gob-toc-vino);
}

.root[data-variant='rail'] {
  padding-left: 16px;
  border-left: 2px solid rgba(24, 21, 17, 0.08);
  border-radius: 0;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
}
.root[data-variant='rail'] .item[data-active='true'] {
  background: transparent;
  box-shadow: inset 3px 0 0 var(--gob-toc-gold);
  border-radius: 0;
  color: var(--gob-toc-title);
}

.root[data-variant='brand'] {
  background: var(--gob-toc-vino);
  border-color: transparent;
  color: #fff;
}
.root[data-variant='brand'] .kicker { color: rgba(255,255,255,0.65); }
.root[data-variant='brand'] .title { color: #fff; }
.root[data-variant='brand'] .head { border-bottom-color: rgba(255,255,255,0.16); }
.root[data-variant='brand'] .item { color: rgba(255,255,255,0.86); }
.root[data-variant='brand'] .item:hover { background: rgba(255,255,255,0.08); }
.root[data-variant='brand'] .item[data-active='true'] {
  background: #fff;
  color: var(--gob-toc-vino-deep);
}

.root[data-variant='complete'] {
  background: #fffaf2;
  border-color: rgba(188, 148, 90, 0.35);
}
.root[data-variant='complete'] .kicker { color: #8a6d3a; }
.root[data-variant='complete'] .item[data-active='true'] {
  background: rgba(188, 148, 90, 0.14);
  color: #6e5628;
  box-shadow: inset 3px 0 0 var(--gob-toc-gold);
}
`;
