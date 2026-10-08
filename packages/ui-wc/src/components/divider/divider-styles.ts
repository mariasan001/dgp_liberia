export const dividerStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-dv-color: rgba(24, 21, 17, 0.14);
  --gob-dv-accent: #9f2141;
  --gob-dv-thickness: 1px;
  --gob-dv-style: solid;
  --gob-dv-inset: 0;
  color: var(--gob-dv-muted, #8a8278);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: block;
  width: 100%;
  margin: 0;
  border: 0;
  height: 0;
  border-top: var(--gob-dv-thickness) var(--gob-dv-style) var(--gob-dv-color);
  margin-inline: var(--gob-dv-inset);
  width: calc(100% - (var(--gob-dv-inset) * 2));
}

.root[data-variant='vertical'] {
  display: inline-block;
  width: 0;
  height: 72px;
  margin: 0;
  border-top: 0;
  border-left: var(--gob-dv-thickness) var(--gob-dv-style) var(--gob-dv-color);
}

.root[data-variant='dashed'] {
  --gob-dv-style: dashed;
}

.root[data-variant='dotted'] {
  --gob-dv-style: dotted;
  --gob-dv-thickness: 2px;
}

.root[data-variant='thick'] {
  --gob-dv-thickness: 3px;
}

.root[data-variant='inset'] {
  --gob-dv-inset: 24px;
  --gob-dv-color: rgba(24, 21, 17, 0.1);
}

.root[data-variant='label'] {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  height: auto;
  border: 0;
  width: 100%;
  margin-inline: 0;
}

.root[data-variant='label']::before,
.root[data-variant='label']::after {
  content: '';
  height: 0;
  border-top: var(--gob-dv-thickness) var(--gob-dv-style) var(--gob-dv-color);
}

.label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-dv-label, #8a8278);
  white-space: nowrap;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-dv-color: rgba(159, 33, 65, 0.22);
  --gob-dv-accent: #9f2141;
  --gob-dv-label: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-dv-color: rgba(188, 148, 90, 0.45);
  --gob-dv-accent: #bc945a;
  --gob-dv-label: #7a5a2e;
}
`;
