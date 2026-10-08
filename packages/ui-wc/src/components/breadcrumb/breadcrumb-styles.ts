export const breadcrumbStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-bc-text, #6b665f);
  --gob-bc-text: #6b665f;
  --gob-bc-muted: #8a8278;
  --gob-bc-current: #181511;
  --gob-bc-accent: #9f2141;
  --gob-bc-sep: '/';
  --gob-bc-gap: 8px;
  --gob-bc-size: 13px;
  --gob-bc-weight: 500;
  --gob-bc-bg: transparent;
  --gob-bc-pad-y: 0;
  --gob-bc-pad-x: 0;
  --gob-bc-radius: 0;
  --gob-bc-border: transparent;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gob-bc-gap);
  min-height: 28px;
  padding: var(--gob-bc-pad-y) var(--gob-bc-pad-x);
  border-radius: var(--gob-bc-radius);
  border: 1px solid var(--gob-bc-border);
  background: var(--gob-bc-bg);
  color: var(--gob-bc-text);
  font-size: var(--gob-bc-size);
  font-weight: var(--gob-bc-weight);
  line-height: 1.3;
}

::slotted(a),
::slotted(button),
::slotted([data-crumb]) {
  color: var(--gob-bc-text);
  text-decoration: none;
  font: inherit;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}

::slotted(a:hover),
::slotted(button:hover),
::slotted([data-crumb]:hover) {
  color: var(--gob-bc-accent);
}

::slotted([aria-current='page']),
::slotted(strong),
::slotted([data-current]) {
  color: var(--gob-bc-current);
  font-weight: 700;
  pointer-events: none;
  cursor: default;
}

::slotted([data-sep]) {
  color: var(--gob-bc-muted);
  font-weight: 500;
  user-select: none;
  pointer-events: none;
}

.root[data-variant='basic'],
.root[data-variant='icons'],
.root[data-variant='collapsed'],
.root[data-variant='complete'],
.root[data-variant='back'] {
  --gob-bc-sep: '/';
}

.root[data-variant='chevron'] {
  --gob-bc-sep: '›';
  --gob-bc-gap: 6px;
}

.root[data-variant='dot'] {
  --gob-bc-sep: '·';
  --gob-bc-gap: 10px;
}

.root[data-variant='arrow'] {
  --gob-bc-sep: '→';
  --gob-bc-gap: 8px;
}

.root[data-variant='underline'] {
  --gob-bc-sep: '/';
}

.root[data-variant='dense'] {
  --gob-bc-size: 12px;
  --gob-bc-gap: 6px;
}

.root[data-variant='complete'] {
  --gob-bc-pad-y: 10px;
  --gob-bc-pad-x: 14px;
  --gob-bc-radius: 12px;
  --gob-bc-bg: color-mix(in srgb, var(--gob-bc-accent) 6%, #fff);
  --gob-bc-border: color-mix(in srgb, var(--gob-bc-accent) 14%, transparent);
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-bc-text: #6b665f;
  --gob-bc-muted: #8a8278;
  --gob-bc-current: #181511;
  --gob-bc-accent: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-bc-text: #5c5348;
  --gob-bc-muted: #8a8278;
  --gob-bc-current: #3f372e;
  --gob-bc-accent: #bc945a;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-bc-text: rgba(255, 255, 255, 0.72);
  --gob-bc-muted: rgba(255, 255, 255, 0.45);
  --gob-bc-current: #ffffff;
  --gob-bc-accent: #ffffff;
  --gob-bc-bg: #181511;
  --gob-bc-border: rgba(255, 255, 255, 0.1);
  --gob-bc-pad-y: 10px;
  --gob-bc-pad-x: 14px;
  --gob-bc-radius: 12px;
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-bc-text: #5f5952;
  --gob-bc-muted: #8a8278;
  --gob-bc-current: #181511;
  --gob-bc-accent: #9f2141;
  --gob-bc-bg: #ebebeb;
  --gob-bc-border: rgba(24, 21, 17, 0.1);
  --gob-bc-pad-y: 10px;
  --gob-bc-pad-x: 14px;
  --gob-bc-radius: 12px;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-bc-text: #5a4f42;
  --gob-bc-muted: #7a6f60;
  --gob-bc-current: #2f2922;
  --gob-bc-accent: #9f2141;
  --gob-bc-bg: #e7d7bd;
  --gob-bc-border: rgba(24, 21, 17, 0.1);
  --gob-bc-pad-y: 10px;
  --gob-bc-pad-x: 14px;
  --gob-bc-radius: 12px;
}
`;
