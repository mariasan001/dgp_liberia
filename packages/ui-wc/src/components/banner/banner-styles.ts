export const bannerStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-bn-vino: #9f2141;
  --gob-bn-dorado: #bc945a;
  --gob-bn-title: #181511;
  --gob-bn-muted: #6f6a63;
  --gob-bn-border: rgba(24, 21, 17, 0.1);
  --gob-bn-bg: #ffffff;
  --gob-bn-accent: #2f6fed;
  --gob-bn-soft: color-mix(in srgb, #2f6fed 10%, #fff);
  --gob-bn-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px 18px;
  align-items: center;
  width: 100%;
  padding: 14px 18px;
  border: 1px solid color-mix(in srgb, var(--gob-bn-accent) 18%, transparent);
  background: var(--gob-bn-soft);
  color: var(--gob-bn-title);
}

.root[data-tone='info'] { --gob-bn-accent: #2f6fed; --gob-bn-soft: color-mix(in srgb, #2f6fed 10%, #fff); }
.root[data-tone='success'] { --gob-bn-accent: #1f8a55; --gob-bn-soft: color-mix(in srgb, #1f8a55 10%, #fff); }
.root[data-tone='warning'] { --gob-bn-accent: #b87712; --gob-bn-soft: color-mix(in srgb, #b87712 11%, #fff); }
.root[data-tone='danger'] { --gob-bn-accent: #c62828; --gob-bn-soft: color-mix(in srgb, #c62828 10%, #fff); }
.root[data-tone='neutral'] { --gob-bn-accent: #6f6a63; --gob-bn-soft: #f3f3f3; }
.root[data-tone='brand'] { --gob-bn-accent: var(--gob-bn-vino); --gob-bn-soft: color-mix(in srgb, var(--gob-bn-vino) 9%, #fff); }

.body { min-width: 0; display: grid; gap: 3px; }
.title {
  margin: 0;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
}
.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-bn-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.action,
.dismiss {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: background 140ms var(--gob-bn-ease), color 140ms var(--gob-bn-ease);
}

.action {
  padding: 0 14px;
  background: var(--gob-bn-accent);
  color: #fff;
}
.action:hover { filter: brightness(0.94); }

.dismiss {
  width: 34px;
  padding: 0;
  background: transparent;
  color: var(--gob-bn-muted);
}
.dismiss:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-bn-title);
}
.dismiss svg { width: 14px; height: 14px; display: block; }

.root[data-variant='solid'] {
  background: var(--gob-bn-accent);
  border-color: var(--gob-bn-accent);
  color: #fff;
}
.root[data-variant='solid'] .description { color: rgba(255,255,255,0.88); }
.root[data-variant='solid'] .action {
  background: rgba(255,255,255,0.18);
  color: #fff;
}
.root[data-variant='solid'] .dismiss { color: rgba(255,255,255,0.88); }
.root[data-variant='solid'] .dismiss:hover {
  background: rgba(255,255,255,0.14);
  color: #fff;
}

.root[data-variant='outline'] {
  background: var(--gob-bn-bg);
  border-color: color-mix(in srgb, var(--gob-bn-accent) 30%, transparent);
}

.root[data-variant='dense'] { padding: 10px 14px; }
.root[data-variant='dense'] .title { font-size: 13px; }

.root[data-variant='promo'] {
  background: color-mix(in srgb, var(--gob-bn-dorado) 16%, #fff);
  border-color: color-mix(in srgb, var(--gob-bn-dorado) 34%, transparent);
}
.root[data-variant='promo'] .action {
  background: var(--gob-bn-vino);
}

.root[data-variant='sticky'] {
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.04);
}

.root[data-variant='centered'] {
  text-align: center;
  justify-items: center;
  grid-template-columns: 1fr;
}
.root[data-variant='centered'] .actions { justify-content: center; }

.root[data-variant='split'] {
  grid-template-columns: 1fr auto;
  border-left: 3px solid var(--gob-bn-accent);
  background: var(--gob-bn-bg);
  border-color: var(--gob-bn-border);
  border-left-color: var(--gob-bn-accent);
}

.root[data-variant='complete'] {
  border-left: 3px solid var(--gob-bn-dorado);
  background: var(--gob-bn-bg);
  border-color: var(--gob-bn-border);
  border-left-color: var(--gob-bn-dorado);
}

.root[data-variant='basic'],
.root[data-variant='soft'] {
  border-radius: 0;
}
`;
