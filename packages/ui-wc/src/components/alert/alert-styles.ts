export const alertStyles = `
:host {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-al-vino: #9f2141;
  --gob-al-dorado: #bc945a;
  --gob-al-title: #181511;
  --gob-al-muted: #6f6a63;
  --gob-al-border: rgba(24, 21, 17, 0.1);
  --gob-al-bg: #ffffff;
  --gob-al-fill: #f3f3f3;
  --gob-al-accent: #2f6fed;
  --gob-al-accent-soft: color-mix(in srgb, #2f6fed 10%, #fff);
  --gob-al-radius: 16px;
  --gob-al-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px 14px;
  align-items: start;
  width: 100%;
  padding: 14px 16px;
  border-radius: var(--gob-al-radius);
  border: 1px solid color-mix(in srgb, var(--gob-al-accent) 18%, transparent);
  background: var(--gob-al-accent-soft);
  color: var(--gob-al-title);
}

.root[data-tone='info'] {
  --gob-al-accent: #2f6fed;
  --gob-al-accent-soft: color-mix(in srgb, #2f6fed 10%, #fff);
}
.root[data-tone='success'] {
  --gob-al-accent: #1f8a55;
  --gob-al-accent-soft: color-mix(in srgb, #1f8a55 10%, #fff);
}
.root[data-tone='warning'] {
  --gob-al-accent: #b87712;
  --gob-al-accent-soft: color-mix(in srgb, #b87712 11%, #fff);
}
.root[data-tone='danger'] {
  --gob-al-accent: #c62828;
  --gob-al-accent-soft: color-mix(in srgb, #c62828 10%, #fff);
}
.root[data-tone='neutral'] {
  --gob-al-accent: #6f6a63;
  --gob-al-accent-soft: #f3f3f3;
}

.icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: color-mix(in srgb, var(--gob-al-accent) 12%, #fff);
  color: var(--gob-al-accent);
  flex: 0 0 auto;
}
.icon svg { width: 18px; height: 18px; display: block; }

.body {
  display: grid;
  gap: 4px;
  min-width: 0;
  padding-top: 2px;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--gob-al-title);
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-al-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

.action,
.dismiss {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  border-radius: 10px;
  border: 0;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: background 140ms var(--gob-al-ease), color 140ms var(--gob-al-ease);
}

.action {
  padding: 0 12px;
  background: color-mix(in srgb, var(--gob-al-accent) 12%, #fff);
  color: var(--gob-al-accent);
}
.action:hover { background: color-mix(in srgb, var(--gob-al-accent) 18%, #fff); }

.dismiss {
  width: 32px;
  padding: 0;
  background: transparent;
  color: var(--gob-al-muted);
}
.dismiss:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-al-title);
}
.dismiss svg { width: 14px; height: 14px; display: block; }

.root[data-variant='outline'] {
  background: var(--gob-al-bg);
  border-color: color-mix(in srgb, var(--gob-al-accent) 28%, transparent);
}
.root[data-variant='solid'] {
  background: var(--gob-al-accent);
  border-color: var(--gob-al-accent);
  color: #fff;
}
.root[data-variant='solid'] .title,
.root[data-variant='solid'] .description { color: #fff; }
.root[data-variant='solid'] .description { opacity: 0.88; }
.root[data-variant='solid'] .icon {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}
.root[data-variant='solid'] .action {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.root[data-variant='solid'] .dismiss { color: rgba(255, 255, 255, 0.85); }
.root[data-variant='solid'] .dismiss:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}

.root[data-variant='banner'],
.root[data-variant='complete'] {
  border-radius: 14px;
  border-left: 3px solid var(--gob-al-accent);
  background: var(--gob-al-bg);
  border-color: var(--gob-al-border);
  border-left-color: var(--gob-al-accent);
}
.root[data-variant='complete'] {
  border-left-color: var(--gob-al-dorado);
}

.root[data-variant='dense'] {
  padding: 10px 12px;
  border-radius: 12px;
  gap: 10px;
}
.root[data-variant='dense'] .icon { width: 28px; height: 28px; border-radius: 9px; }
.root[data-variant='dense'] .icon svg { width: 15px; height: 15px; }

.root[data-variant='inline'] {
  display: inline-grid;
  width: auto;
  max-width: 100%;
  padding: 8px 12px;
  border-radius: 999px;
  align-items: center;
}
.root[data-variant='inline'] .icon {
  width: 22px;
  height: 22px;
  border-radius: 999px;
}
.root[data-variant='inline'] .icon svg { width: 13px; height: 13px; }
.root[data-variant='inline'] .description,
.root[data-variant='inline'] .actions { display: none; }

.root[data-variant='bordered'] {
  background: var(--gob-al-bg);
  border: 1.5px solid color-mix(in srgb, var(--gob-al-accent) 30%, transparent);
}

.root[data-variant='soft'],
.root[data-variant='basic'],
.root[data-variant='dismissible'] {
  background: var(--gob-al-accent-soft);
}
`;
