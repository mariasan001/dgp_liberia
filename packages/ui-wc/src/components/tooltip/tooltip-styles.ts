export const tooltipStyles = `
:host {
  display: inline-flex;
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tt-vino: #9f2141;
  --gob-tt-dorado: #bc945a;
  --gob-tt-title: #181511;
  --gob-tt-muted: #6f6a63;
  --gob-tt-border: rgba(24, 21, 17, 0.12);
  --gob-tt-bg: #181511;
  --gob-tt-fg: #ffffff;
  --gob-tt-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.trigger {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--gob-tt-border);
  background: #fff;
  color: var(--gob-tt-title);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: default;
}

.bubble {
  position: absolute;
  z-index: 20;
  width: max-content;
  max-width: min(240px, 70vw);
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--gob-tt-bg);
  color: var(--gob-tt-fg);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.35;
  text-align: left;
  pointer-events: none;
  opacity: 0;
  transform: translateY(2px) scale(0.98);
  transition: opacity 140ms var(--gob-tt-ease), transform 140ms var(--gob-tt-ease);
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.16);
}

.bubble::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  transform: rotate(45deg);
}

.root[data-open='true'] .bubble,
.root:hover .bubble,
.root:focus-within .bubble {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.root[data-placement='top'] .bubble {
  left: 50%;
  bottom: calc(100% + 10px);
  transform: translate(-50%, 4px) scale(0.98);
}
.root[data-placement='top'][data-open='true'] .bubble,
.root[data-placement='top']:hover .bubble,
.root[data-placement='top']:focus-within .bubble {
  transform: translate(-50%, 0) scale(1);
}
.root[data-placement='top'] .bubble::after {
  left: 50%;
  bottom: -4px;
  margin-left: -4px;
}

.root[data-placement='bottom'] .bubble {
  left: 50%;
  top: calc(100% + 10px);
  transform: translate(-50%, -4px) scale(0.98);
}
.root[data-placement='bottom'][data-open='true'] .bubble,
.root[data-placement='bottom']:hover .bubble,
.root[data-placement='bottom']:focus-within .bubble {
  transform: translate(-50%, 0) scale(1);
}
.root[data-placement='bottom'] .bubble::after {
  left: 50%;
  top: -4px;
  margin-left: -4px;
}

.root[data-placement='left'] .bubble {
  right: calc(100% + 10px);
  top: 50%;
  transform: translate(-4px, -50%) scale(0.98);
}
.root[data-placement='left'][data-open='true'] .bubble,
.root[data-placement='left']:hover .bubble,
.root[data-placement='left']:focus-within .bubble {
  transform: translate(0, -50%) scale(1);
}
.root[data-placement='left'] .bubble::after {
  right: -4px;
  top: 50%;
  margin-top: -4px;
}

.root[data-placement='right'] .bubble {
  left: calc(100% + 10px);
  top: 50%;
  transform: translate(4px, -50%) scale(0.98);
}
.root[data-placement='right'][data-open='true'] .bubble,
.root[data-placement='right']:hover .bubble,
.root[data-placement='right']:focus-within .bubble {
  transform: translate(0, -50%) scale(1);
}
.root[data-placement='right'] .bubble::after {
  left: -4px;
  top: 50%;
  margin-top: -4px;
}

.root[data-variant='soft'] .bubble {
  background: #f3f3f3;
  color: var(--gob-tt-title);
  border: 1px solid var(--gob-tt-border);
  box-shadow: 0 8px 18px rgba(24, 21, 17, 0.08);
}
.root[data-variant='outline'] .bubble {
  background: #fff;
  color: var(--gob-tt-title);
  border: 1px solid var(--gob-tt-border);
}
.root[data-variant='solid'] .bubble,
.root[data-variant='brand'] .bubble {
  background: var(--gob-tt-vino);
  color: #fff;
}
.root[data-variant='success'] .bubble {
  background: #1f8a55;
  color: #fff;
}
.root[data-variant='inverse'] .bubble {
  background: #fff;
  color: var(--gob-tt-title);
  border: 1px solid var(--gob-tt-border);
}
.root[data-variant='dense'] .bubble {
  padding: 5px 8px;
  font-size: 11px;
  border-radius: 8px;
}
.root[data-variant='rich'] .bubble {
  padding: 10px 12px;
  max-width: min(280px, 80vw);
  font-weight: 500;
}
.root[data-variant='complete'] .bubble {
  background: #fff;
  color: var(--gob-tt-vino);
  border: 1px solid var(--gob-tt-border);
  border-left: 3px solid var(--gob-tt-dorado);
}
`;
