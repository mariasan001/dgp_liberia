export const avatarStyles = `
:host {
  display: inline-flex;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-av-vino: #9f2141;
  --gob-av-dorado: #bc945a;
  --gob-av-title: #181511;
  --gob-av-muted: #6f6a63;
  --gob-av-border: rgba(24, 21, 17, 0.12);
  --gob-av-fill: #f3f3f3;
  --gob-av-accent: #9f2141;
  --gob-av-accent-soft: color-mix(in srgb, #9f2141 12%, #fff);
  --gob-av-size: 40px;
  --gob-av-font: 13px;
  --gob-av-radius: 999px;
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.face {
  position: relative;
  width: var(--gob-av-size);
  height: var(--gob-av-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--gob-av-radius);
  background: var(--gob-av-accent-soft);
  color: var(--gob-av-accent);
  border: 1px solid color-mix(in srgb, var(--gob-av-accent) 16%, transparent);
  font-size: var(--gob-av-font);
  font-weight: 780;
  letter-spacing: -0.02em;
  line-height: 1;
  flex: 0 0 auto;
}

.stack {
  display: none;
  align-items: center;
}
.stack .face {
  margin-left: -10px;
  box-shadow: 0 0 0 2px #fff;
}
.stack .face:first-child { margin-left: 0; }

.label {
  display: none;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.name {
  margin: 0;
  font-size: 13px;
  font-weight: 750;
  letter-spacing: -0.02em;
  color: var(--gob-av-title);
  line-height: 1.2;
}
.role {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-av-muted);
}

.dot {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #1f8a55;
  border: 2px solid #fff;
  display: none;
}

.root[data-size='sm'] {
  --gob-av-size: 28px;
  --gob-av-font: 11px;
}
.root[data-size='lg'] {
  --gob-av-size: 52px;
  --gob-av-font: 16px;
}

.root[data-tone='primary'] {
  --gob-av-accent: #9f2141;
  --gob-av-accent-soft: color-mix(in srgb, #9f2141 12%, #fff);
}
.root[data-tone='success'] {
  --gob-av-accent: #1f8a55;
  --gob-av-accent-soft: color-mix(in srgb, #1f8a55 12%, #fff);
}
.root[data-tone='warning'] {
  --gob-av-accent: #b87712;
  --gob-av-accent-soft: color-mix(in srgb, #b87712 13%, #fff);
}
.root[data-tone='danger'] {
  --gob-av-accent: #c62828;
  --gob-av-accent-soft: color-mix(in srgb, #c62828 12%, #fff);
}
.root[data-tone='info'] {
  --gob-av-accent: #2f6fed;
  --gob-av-accent-soft: color-mix(in srgb, #2f6fed 12%, #fff);
}
.root[data-tone='neutral'] {
  --gob-av-accent: #6f6a63;
  --gob-av-accent-soft: #f3f3f3;
}

.root[data-variant='soft'] .face {
  background: var(--gob-av-accent-soft);
  border-color: transparent;
}
.root[data-variant='solid'] .face {
  background: var(--gob-av-accent);
  color: #fff;
  border-color: transparent;
}
.root[data-variant='outline'] .face {
  background: #fff;
  border-color: color-mix(in srgb, var(--gob-av-accent) 35%, #d7dde6);
}
.root[data-variant='square'],
.root[data-variant='square'] .face {
  --gob-av-radius: 12px;
}
.root[data-variant='status'] .dot { display: block; }
.root[data-variant='status'][data-status='busy'] .dot { background: #c62828; }
.root[data-variant='status'][data-status='away'] .dot { background: #b87712; }
.root[data-variant='status'][data-status='offline'] .dot { background: #9ca3af; }

.root[data-variant='group'] .face { display: none; }
.root[data-variant='group'] .stack { display: inline-flex; }

.root[data-variant='dense'] {
  --gob-av-size: 24px;
  --gob-av-font: 10px;
}
.root[data-variant='brand'] .face {
  background: var(--gob-av-vino);
  color: #fff;
  border-color: transparent;
}
.root[data-variant='complete'] .face {
  border-color: color-mix(in srgb, var(--gob-av-dorado) 55%, #d7dde6);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gob-av-dorado) 35%, transparent);
}

.root[data-has-label='true'] .label { display: flex; }
`;
