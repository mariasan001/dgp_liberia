export const activityFeedStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-af-text, #6b665f);
  --gob-af-bg: #ffffff;
  --gob-af-border: rgba(24, 21, 17, 0.08);
  --gob-af-radius: 16px;
  --gob-af-shadow: 0 1px 2px rgba(24, 21, 17, 0.03), 0 10px 28px rgba(24, 21, 17, 0.05);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  min-width: 0;
  border: 1px solid var(--gob-af-border);
  border-radius: var(--gob-af-radius);
  background: var(--gob-af-bg);
  box-shadow: var(--gob-af-shadow);
  overflow: hidden;
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
  --gob-af-bg: #ffffff;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-af-bg: #181511;
  --gob-af-border: rgba(255, 255, 255, 0.1);
  --gob-af-shadow: none;
}
`;
