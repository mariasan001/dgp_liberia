export const emptyStateStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-es-text, #6b665f);
  --gob-es-bg: #ffffff;
  --gob-es-border: color-mix(in srgb, #bc945a 28%, rgba(24, 21, 17, 0.08));
  --gob-es-radius: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 240px;
  padding: 40px 28px;
  border: 1px solid var(--gob-es-border);
  border-radius: var(--gob-es-radius);
  background: var(--gob-es-bg);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.03), 0 10px 28px rgba(24, 21, 17, 0.04);
}

.root[data-variant='dense'],
.root[data-variant='inline'] {
  min-height: 140px;
  padding: 22px 18px;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'],
:host([tone='accent']),
.root[data-tone='accent'],
:host([tone='neutral']),
.root[data-tone='neutral'],
:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-es-bg: #ffffff;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-es-bg: #181511;
  --gob-es-border: rgba(255, 255, 255, 0.12);
  box-shadow: none;
}
`;
