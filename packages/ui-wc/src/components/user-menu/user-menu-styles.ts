export const userMenuStyles = `
:host {
  display: inline-flex;
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-um-vino: #9f2141;
  --gob-um-vino-deep: #7a1832;
  --gob-um-title: #181511;
  --gob-um-muted: #6f6a63;
  --gob-um-border: rgba(24, 21, 17, 0.1);
  --gob-um-bg: #ffffff;
  --gob-um-fill: #f3f3f3;
  --gob-um-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root { position: relative; display: inline-flex; }

.trigger {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
  padding: 0 12px 0 6px;
  border-radius: 12px;
  border: 1px solid var(--gob-um-border);
  background: #fff;
  color: var(--gob-um-title);
  font: inherit;
  cursor: pointer;
  transition: background 140ms var(--gob-um-ease), border-color 140ms var(--gob-um-ease);
}
.trigger:hover { background: var(--gob-um-fill); }
.root[data-open='true'] .trigger {
  border-color: rgba(24, 21, 17, 0.18);
  background: var(--gob-um-fill);
}

.avatar {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--gob-um-fill);
  color: var(--gob-um-title);
  border: 1px solid rgba(24, 21, 17, 0.08);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.copy { display: grid; gap: 1px; text-align: left; min-width: 0; }
.name {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.role {
  margin: 0;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--gob-um-muted);
  line-height: 1.2;
}

.caret {
  width: 12px;
  height: 12px;
  color: var(--gob-um-muted);
  opacity: 0.7;
  transition: transform 150ms var(--gob-um-ease);
}
.caret svg { width: 12px; height: 12px; display: block; }
.root[data-open='true'] .caret { transform: rotate(180deg); }

.panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 24;
  width: min(248px, 82vw);
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--gob-um-border);
  background: var(--gob-um-bg);
  box-shadow: 0 12px 28px rgba(24, 21, 17, 0.1);
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
  transition: opacity 150ms var(--gob-um-ease), transform 150ms var(--gob-um-ease);
}
.root[data-open='true'] .panel {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.profile {
  display: grid;
  gap: 2px;
  padding: 10px 10px 12px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
}
.profile-name {
  margin: 0;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.profile-email {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-um-muted);
}

.menu { display: grid; gap: 1px; }
.item {
  appearance: none;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 0 10px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--gob-um-title);
  text-align: left;
  cursor: pointer;
}
.item:hover { background: var(--gob-um-fill); }
.item[data-danger='true'] { color: #8a2f2f; }
.item[data-danger='true']:hover { background: #f3f3f3; }

.divider {
  height: 1px;
  margin: 6px 4px;
  background: rgba(24, 21, 17, 0.08);
}

.root[data-variant='soft'] .trigger {
  background: var(--gob-um-fill);
  border-color: transparent;
}
.root[data-variant='compact'] .copy,
.root[data-variant='dense'] .copy { display: none; }
.root[data-variant='compact'] .trigger,
.root[data-variant='dense'] .trigger {
  padding: 0 8px;
  min-height: 36px;
  gap: 8px;
}
.root[data-variant='elevated'] .panel {
  box-shadow: 0 16px 36px rgba(24, 21, 17, 0.12);
}
.root[data-variant='outline'] .trigger {
  border-color: rgba(24, 21, 17, 0.16);
}
.root[data-variant='brand'] .avatar {
  background: var(--gob-um-vino);
  color: #fff;
  border-color: transparent;
}
.root[data-variant='status'] .avatar {
  position: relative;
}
.root[data-variant='status'] .avatar::after {
  content: '';
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #5f7a63;
  border: 2px solid #fff;
  box-sizing: border-box;
}
.root[data-variant='wide'] .panel { width: min(280px, 86vw); }
.root[data-variant='complete'] .panel {
  border-top: 2px solid #bc945a;
}

@media (prefers-reduced-motion: reduce) {
  .panel, .caret { transition: none !important; }
}
`;
