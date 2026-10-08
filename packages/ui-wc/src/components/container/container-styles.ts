export const containerStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-ct-text, #6b665f);
  --gob-ct-max: 960px;
  --gob-ct-pad-x: 20px;
  --gob-ct-pad-y: 16px;
  --gob-ct-text: #6b665f;
  --gob-ct-title: #181511;
  --gob-ct-muted: #8a8278;
  --gob-ct-border: rgba(24, 21, 17, 0.12);
  --gob-ct-bg: #ffffff;
  --gob-ct-radius: 0;
  --gob-ct-shadow: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  width: min(100%, var(--gob-ct-max));
  margin-inline: auto;
  padding: var(--gob-ct-pad-y) var(--gob-ct-pad-x);
  background: var(--gob-ct-bg);
  border: 1px solid var(--gob-ct-border);
  border-radius: var(--gob-ct-radius);
  box-shadow: var(--gob-ct-shadow);
  color: var(--gob-ct-text);
}

.root[data-variant='basic'] {
  --gob-ct-max: 960px;
  --gob-ct-pad-x: 20px;
}

.root[data-variant='narrow'] {
  --gob-ct-max: 720px;
  --gob-ct-pad-x: 20px;
}

.root[data-variant='wide'] {
  --gob-ct-max: 1200px;
  --gob-ct-pad-x: 24px;
}

.root[data-variant='full'] {
  --gob-ct-max: 100%;
  --gob-ct-pad-x: 20px;
  width: 100%;
}

.root[data-variant='flush'] {
  --gob-ct-max: 960px;
  --gob-ct-pad-x: 0;
  --gob-ct-pad-y: 16px;
}

.root[data-variant='padded'] {
  --gob-ct-max: 960px;
  --gob-ct-pad-x: 36px;
  --gob-ct-pad-y: 28px;
}

.root[data-variant='prose'] {
  --gob-ct-max: 65ch;
  --gob-ct-pad-x: 20px;
}

/* Solo radio: esquinas cuadradas o redondeadas */
:host([radius='true']) {
  --gob-ct-radius: 16px;
}

:host([radius='false']),
:host(:not([radius])) {
  --gob-ct-radius: 0;
}

.root[data-radius='true'] {
  --gob-ct-radius: 16px;
}

.root[data-radius='false'] {
  --gob-ct-radius: 0;
}

/* Solo sombra */
:host([shadow='true']) {
  --gob-ct-shadow: 0 14px 32px rgba(24, 21, 17, 0.12);
}

:host([shadow='false']),
:host(:not([shadow])) {
  --gob-ct-shadow: none;
}

.root[data-shadow='true'] {
  --gob-ct-shadow: 0 14px 32px rgba(24, 21, 17, 0.12);
}

.root[data-shadow='false'] {
  --gob-ct-shadow: none;
}
`;
