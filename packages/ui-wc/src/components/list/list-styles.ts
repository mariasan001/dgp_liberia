export const listStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-list-text, #6b665f);
  --gob-list-bg: #ffffff;
  --gob-list-border: rgba(24, 21, 17, 0.08);
  --gob-list-accent: #9f2141;
  --gob-list-radius: 14px;
  --gob-list-shadow: 0 1px 2px rgba(24, 21, 17, 0.04), 0 8px 24px rgba(24, 21, 17, 0.04);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  min-width: 0;
  border: 1px solid var(--gob-list-border);
  border-radius: var(--gob-list-radius);
  background: var(--gob-list-bg);
  box-shadow: var(--gob-list-shadow);
  overflow: hidden;
}

.root[data-variant='dense'] {
  --gob-list-radius: 12px;
}

.items {
  display: grid;
  min-width: 0;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-list-bg: #ffffff;
  --gob-list-border: rgba(24, 21, 17, 0.08);
  --gob-list-accent: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-list-bg: #fbf7f1;
  --gob-list-border: rgba(24, 21, 17, 0.08);
  --gob-list-accent: #bc945a;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-list-bg: #181511;
  --gob-list-border: rgba(255, 255, 255, 0.1);
  --gob-list-accent: #ffffff;
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-list-bg: #f5f5f5;
  --gob-list-border: rgba(24, 21, 17, 0.12);
  --gob-list-accent: #6b655c;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-list-bg: #f3ebe0;
  --gob-list-border: rgba(24, 21, 17, 0.1);
  --gob-list-accent: #a67c52;
}
`;
