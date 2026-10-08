export const tableStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tb-bg: #ffffff;
  --gob-tb-border: rgba(24, 21, 17, 0.08);
  --gob-tb-title: #181511;
  --gob-tb-muted: #8a8278;
  --gob-tb-accent: #9f2141;
  --gob-tb-radius: 14px;
  --gob-tb-shadow: 0 1px 2px rgba(24, 21, 17, 0.04), 0 8px 24px rgba(24, 21, 17, 0.04);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  gap: 0;
  min-width: 0;
  border: 1px solid var(--gob-tb-border);
  border-radius: var(--gob-tb-radius);
  background: var(--gob-tb-bg);
  box-shadow: var(--gob-tb-shadow);
  overflow: hidden;
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px 14px;
}

.headText {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--gob-tb-title);
}

.subtitle {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--gob-tb-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.scroll {
  overflow: auto;
  max-width: 100%;
}

.root[data-variant='sticky'] .scroll {
  max-height: 280px;
}

.empty {
  display: none;
  place-items: center;
  gap: 8px;
  padding: 56px 20px;
  text-align: center;
  color: var(--gob-tb-muted);
}

.root[data-variant='empty'] .empty {
  display: grid;
}

.root[data-variant='empty'] .scroll {
  display: none;
}

.emptyTitle {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--gob-tb-title);
}

.emptyDesc {
  margin: 0;
  max-width: 36ch;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  font-size: 13px;
  font-weight: 500;
  color: var(--gob-tb-muted);
  background: #fff;
}

.root[data-variant='dense'] .head {
  padding: 12px 14px;
}

.root[data-variant='basic'] .subtitle,
.root[data-variant='striped'] .subtitle,
.root[data-variant='bordered'] .actions,
.root[data-variant='dense'] .subtitle,
.root[data-variant='dense'] .actions,
.root[data-variant='empty'] .actions,
.root[data-variant='empty'] .foot {
  display: none;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-tb-accent: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-tb-accent: #bc945a;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-tb-accent: #181511;
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-tb-accent: #6b655c;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-tb-accent: #a67c52;
}
`;
