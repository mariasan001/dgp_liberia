export const gridStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-grid-gap: 16px;
  --gob-grid-cols: 2;
  --gob-grid-template: repeat(2, minmax(0, 1fr));
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  grid-template-columns: var(--gob-grid-template);
  gap: var(--gob-grid-gap);
  width: 100%;
  min-width: 0;
}

.root[data-variant='basic'] {
  --gob-grid-template: repeat(2, minmax(0, 1fr));
}

.root[data-variant='three'] {
  --gob-grid-template: repeat(3, minmax(0, 1fr));
}

.root[data-variant='four'] {
  --gob-grid-template: repeat(4, minmax(0, 1fr));
}

.root[data-variant='dense'] {
  --gob-grid-template: repeat(3, minmax(0, 1fr));
}

.root[data-variant='loose'] {
  --gob-grid-template: repeat(2, minmax(0, 1fr));
}

.root[data-variant='split'] {
  --gob-grid-template: minmax(0, 1fr) minmax(0, 2fr);
}

.root[data-variant='auto'] {
  --gob-grid-template: repeat(auto-fit, minmax(120px, 1fr));
}

.root[data-gap='sm'],
:host([gap='sm']) .root {
  --gob-grid-gap: 8px;
}

.root[data-gap='md'],
:host([gap='md']) .root,
:host(:not([gap])) .root {
  --gob-grid-gap: 16px;
}

.root[data-gap='lg'],
:host([gap='lg']) .root {
  --gob-grid-gap: 28px;
}

.root[data-variant='dense'][data-gap='md'],
:host([variant='dense']:not([gap])) .root {
  --gob-grid-gap: 8px;
}

.root[data-variant='loose'][data-gap='md'],
:host([variant='loose']:not([gap])) .root {
  --gob-grid-gap: 28px;
}

@media (max-width: 720px) {
  .root[data-variant='three'],
  .root[data-variant='four'],
  .root[data-variant='dense'] {
    --gob-grid-template: repeat(2, minmax(0, 1fr));
  }

  .root[data-variant='split'] {
    --gob-grid-template: minmax(0, 1fr);
  }
}
`;
