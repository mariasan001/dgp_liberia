export const badgeStyles = `
:host {
  display: inline-flex;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-bd-vino: #9f2141;
  --gob-bd-dorado: #bc945a;
  --gob-bd-title: #181511;
  --gob-bd-muted: #6f6a63;
  --gob-bd-border: rgba(24, 21, 17, 0.12);
  --gob-bd-bg: #ffffff;
  --gob-bd-accent: #9f2141;
  --gob-bd-soft: color-mix(in srgb, #9f2141 12%, #fff);
  --gob-bd-height: 24px;
  --gob-bd-pad: 0 9px;
  --gob-bd-font: 11.5px;
  --gob-bd-radius: 999px;
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: var(--gob-bd-height);
  padding: var(--gob-bd-pad);
  border-radius: var(--gob-bd-radius);
  border: 1px solid transparent;
  background: var(--gob-bd-soft);
  color: var(--gob-bd-accent);
  font-size: var(--gob-bd-font);
  font-weight: 750;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
}

.root[data-tone='primary'] { --gob-bd-accent: #9f2141; --gob-bd-soft: color-mix(in srgb, #9f2141 12%, #fff); }
.root[data-tone='success'] { --gob-bd-accent: #1f8a55; --gob-bd-soft: color-mix(in srgb, #1f8a55 12%, #fff); }
.root[data-tone='warning'] { --gob-bd-accent: #b87712; --gob-bd-soft: color-mix(in srgb, #b87712 14%, #fff); }
.root[data-tone='danger'] { --gob-bd-accent: #c62828; --gob-bd-soft: color-mix(in srgb, #c62828 12%, #fff); }
.root[data-tone='info'] { --gob-bd-accent: #2f6fed; --gob-bd-soft: color-mix(in srgb, #2f6fed 12%, #fff); }
.root[data-tone='neutral'] { --gob-bd-accent: #6f6a63; --gob-bd-soft: #f3f3f3; }

.root[data-size='sm'] { --gob-bd-height: 20px; --gob-bd-pad: 0 7px; --gob-bd-font: 10.5px; }
.root[data-size='lg'] { --gob-bd-height: 28px; --gob-bd-pad: 0 11px; --gob-bd-font: 12.5px; }

.root[data-variant='solid'] {
  background: var(--gob-bd-accent);
  color: #fff;
}
.root[data-variant='outline'] {
  background: var(--gob-bd-bg);
  border-color: color-mix(in srgb, var(--gob-bd-accent) 35%, transparent);
}
.root[data-variant='basic'],
.root[data-variant='soft'],
.root[data-variant='status'],
.root[data-variant='count'],
.root[data-variant='pill'] {
  background: var(--gob-bd-soft);
}

.root[data-variant='square'] {
  border-radius: 8px;
}

.root[data-variant='dot'] {
  width: 10px;
  height: 10px;
  min-height: 10px;
  padding: 0;
  border-radius: 999px;
  background: var(--gob-bd-accent);
  color: transparent;
  font-size: 0;
}

.root[data-variant='count'] {
  min-width: var(--gob-bd-height);
  padding: 0 6px;
}

.root[data-variant='complete'] {
  background: var(--gob-bd-bg);
  border: 1px solid var(--gob-bd-border);
  border-left: 3px solid var(--gob-bd-dorado);
  color: var(--gob-bd-vino);
  border-radius: 10px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: currentColor;
  flex: 0 0 auto;
  display: none;
}
.root[data-variant='status'] .dot { display: inline-block; }
`;
