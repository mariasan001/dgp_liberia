export const tagStyles = `
:host {
  display: inline-flex;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tg-vino: #9f2141;
  --gob-tg-dorado: #bc945a;
  --gob-tg-title: #181511;
  --gob-tg-muted: #6f6a63;
  --gob-tg-border: rgba(24, 21, 17, 0.12);
  --gob-tg-bg: #ffffff;
  --gob-tg-accent: #9f2141;
  --gob-tg-soft: color-mix(in srgb, #9f2141 10%, #fff);
  --gob-tg-height: 32px;
  --gob-tg-pad: 0 10px;
  --gob-tg-font: 12.5px;
  --gob-tg-radius: 999px;
  --gob-tg-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: 100%;
  min-height: var(--gob-tg-height);
  padding: var(--gob-tg-pad);
  border-radius: var(--gob-tg-radius);
  border: 1px solid transparent;
  background: var(--gob-tg-soft);
  color: var(--gob-tg-accent);
  font-size: var(--gob-tg-font);
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1;
}

.root[data-tone='primary'] { --gob-tg-accent: #9f2141; --gob-tg-soft: color-mix(in srgb, #9f2141 10%, #fff); }
.root[data-tone='success'] { --gob-tg-accent: #1f8a55; --gob-tg-soft: color-mix(in srgb, #1f8a55 10%, #fff); }
.root[data-tone='warning'] { --gob-tg-accent: #b87712; --gob-tg-soft: color-mix(in srgb, #b87712 12%, #fff); }
.root[data-tone='danger'] { --gob-tg-accent: #c62828; --gob-tg-soft: color-mix(in srgb, #c62828 10%, #fff); }
.root[data-tone='info'] { --gob-tg-accent: #2f6fed; --gob-tg-soft: color-mix(in srgb, #2f6fed 10%, #fff); }
.root[data-tone='neutral'] { --gob-tg-accent: #6f6a63; --gob-tg-soft: #f3f3f3; }

.root[data-size='sm'] { --gob-tg-height: 26px; --gob-tg-pad: 0 8px; --gob-tg-font: 11.5px; }
.root[data-size='lg'] { --gob-tg-height: 38px; --gob-tg-pad: 0 12px; --gob-tg-font: 13.5px; }

.root[data-variant='solid'] {
  background: var(--gob-tg-accent);
  color: #fff;
}
.root[data-variant='outline'],
.root[data-variant='filter'],
.root[data-variant='removable'] {
  background: var(--gob-tg-bg);
  border-color: color-mix(in srgb, var(--gob-tg-accent) 28%, transparent);
  color: var(--gob-tg-title);
}
.root[data-variant='filter'] {
  border-style: dashed;
}
.root[data-variant='brand'] {
  background: color-mix(in srgb, var(--gob-tg-dorado) 16%, #fff);
  border-color: color-mix(in srgb, var(--gob-tg-dorado) 34%, transparent);
  color: #3d3428;
}
.root[data-variant='dense'] {
  --gob-tg-height: 26px;
  --gob-tg-font: 11.5px;
}
.root[data-variant='complete'] {
  background: var(--gob-tg-bg);
  border: 1px solid var(--gob-tg-border);
  border-left: 3px solid var(--gob-tg-dorado);
  border-radius: 12px;
  color: var(--gob-tg-vino);
}

.root[data-disabled='true'] {
  opacity: 0.42;
  pointer-events: none;
}

.icon {
  width: 14px;
  height: 14px;
  display: none;
  flex: 0 0 auto;
  color: currentColor;
}
.icon svg { width: 14px; height: 14px; display: block; }
.root[data-has-icon='true'] .icon { display: inline-flex; }

.label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove {
  appearance: none;
  display: none;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: -2px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: currentColor;
  cursor: pointer;
  transition: background 140ms var(--gob-tg-ease);
}
.remove:hover { background: rgba(24, 21, 17, 0.08); }
.remove svg { width: 11px; height: 11px; display: block; }
.root[data-removable='true'] .remove { display: inline-flex; }
.root[data-variant='solid'] .remove:hover { background: rgba(255,255,255,0.18); }
`;
