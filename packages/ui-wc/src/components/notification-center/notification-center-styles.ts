export const notificationCenterStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-nc-vino: #9f2141;
  --gob-nc-gold: #bc945a;
  --gob-nc-title: #181511;
  --gob-nc-muted: #6f6a63;
  --gob-nc-fill: #f3f3f3;
  --gob-nc-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: grid;
  gap: 0;
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(24, 21, 17, 0.08);
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 16px 14px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.08);
}

.title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--gob-nc-title);
}

.badge {
  min-width: 22px;
  height: 22px;
  padding: 0 7px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--gob-nc-vino);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.list { display: grid; }

.item {
  appearance: none;
  width: 100%;
  display: grid;
  grid-template-columns: 10px 1fr auto;
  gap: 10px;
  align-items: start;
  padding: 14px 16px;
  border: 0;
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  background: transparent;
  text-align: left;
  cursor: pointer;
  font: inherit;
  transition: background 140ms var(--gob-nc-ease);
}
.item:last-child { border-bottom: 0; }
.item:hover { background: #fafafa; }

.dot {
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 999px;
  background: transparent;
}
.item[data-unread='true'] .dot { background: var(--gob-nc-vino); }

.copy { display: grid; gap: 3px; min-width: 0; }
.item-title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 750;
  letter-spacing: -0.015em;
  color: var(--gob-nc-title);
}
.item-body {
  margin: 0;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--gob-nc-muted);
}
.time {
  margin: 0;
  font-size: 11px;
  font-weight: 650;
  color: var(--gob-nc-muted);
  white-space: nowrap;
}

.foot {
  padding: 12px 16px;
  border-top: 1px solid rgba(24, 21, 17, 0.08);
  background: #fafafa;
}
.action {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--gob-nc-vino);
  font: inherit;
  font-size: 12.5px;
  font-weight: 750;
  cursor: pointer;
  padding: 0;
}

.root[data-variant='soft'] { background: var(--gob-nc-fill); box-shadow: none; border-color: transparent; }
.root[data-variant='soft'] .item:hover { background: rgba(255,255,255,0.65); }
.root[data-variant='soft'] .foot { background: rgba(255,255,255,0.45); }

.root[data-variant='dense'] .head { padding: 12px; }
.root[data-variant='dense'] .item { padding: 10px 12px; }
.root[data-variant='dense'] .item-title { font-size: 12.5px; }
.root[data-variant='dense'] .item-body { font-size: 11.5px; }

.root[data-variant='outline'] {
  border: 1.5px solid rgba(159, 33, 65, 0.28);
  box-shadow: none;
}

.root[data-variant='unread'] .item[data-unread='false'] { opacity: 0.55; }
.root[data-variant='unread'] .item[data-unread='true'] { background: #faf6f7; }

.root[data-variant='compact'] { border-radius: 14px; box-shadow: none; }
.root[data-variant='compact'] .item-body { display: none; }
.root[data-variant='compact'] .foot { display: none; }

.root[data-variant='panel'] {
  border-radius: 24px;
  box-shadow: 0 22px 48px rgba(24, 21, 17, 0.12);
}
.root[data-variant='panel'] .head { padding: 18px 18px 16px; }

.root[data-variant='feed'] { box-shadow: none; border-radius: 0; border: 0; }
.root[data-variant='feed'] .head,
.root[data-variant='feed'] .foot { display: none; }
.root[data-variant='feed'] .item {
  border: 1px solid rgba(24, 21, 17, 0.08);
  border-radius: 14px;
  margin-bottom: 8px;
  background: #fff;
}
.root[data-variant='feed'] .list { gap: 0; padding: 0; }

.root[data-variant='brand'] {
  background: var(--gob-nc-vino);
  border-color: transparent;
}
.root[data-variant='brand'] .title,
.root[data-variant='brand'] .item-title,
.root[data-variant='brand'] .action { color: #fff; }
.root[data-variant='brand'] .item-body,
.root[data-variant='brand'] .time { color: rgba(255,255,255,0.72); }
.root[data-variant='brand'] .badge { background: #fff; color: var(--gob-nc-vino); }
.root[data-variant='brand'] .head,
.root[data-variant='brand'] .item,
.root[data-variant='brand'] .foot { border-color: rgba(255,255,255,0.14); }
.root[data-variant='brand'] .item:hover { background: rgba(255,255,255,0.06); }
.root[data-variant='brand'] .foot { background: rgba(0,0,0,0.12); }
.root[data-variant='brand'] .item[data-unread='true'] .dot { background: var(--gob-nc-gold); }

.root[data-variant='complete'] {
  background: #fffaf2;
  border-color: rgba(188, 148, 90, 0.35);
}
.root[data-variant='complete'] .badge { background: #8a6d3a; }
.root[data-variant='complete'] .action { color: #8a6d3a; }
.root[data-variant='complete'] .item[data-unread='true'] .dot { background: var(--gob-nc-gold); }
`;
