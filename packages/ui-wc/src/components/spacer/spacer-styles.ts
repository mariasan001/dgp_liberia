export const spacerStyles = `
:host {
  display: block;
  box-sizing: border-box;
  --gob-sp-size: 16px;
}

:host([variant='horizontal']) {
  display: inline-block;
  vertical-align: middle;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: block;
  width: 100%;
  height: var(--gob-sp-size);
  flex: 0 0 auto;
  pointer-events: none;
}

.root[data-variant='xs'] { --gob-sp-size: 4px; }
.root[data-variant='sm'] { --gob-sp-size: 8px; }
.root[data-variant='md'] { --gob-sp-size: 16px; }
.root[data-variant='lg'] { --gob-sp-size: 24px; }
.root[data-variant='xl'] { --gob-sp-size: 40px; }
.root[data-variant='section'] { --gob-sp-size: 64px; }

.root[data-variant='horizontal'] {
  display: block;
  width: var(--gob-sp-size);
  height: 2rem;
  --gob-sp-size: 24px;
}
`;
