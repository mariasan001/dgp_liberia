export const dataGridStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-dg-bg: #ffffff;
  --gob-dg-border: rgba(24, 21, 17, 0.08);
  --gob-dg-title: #181511;
  --gob-dg-muted: #8a8278;
  --gob-dg-accent: #9f2141;
  --gob-dg-radius: 14px;
  --gob-dg-shadow: 0 1px 2px rgba(24, 21, 17, 0.04), 0 8px 24px rgba(24, 21, 17, 0.04);
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
  border: 1px solid var(--gob-dg-border);
  border-radius: var(--gob-dg-radius);
  background: var(--gob-dg-bg);
  box-shadow: var(--gob-dg-shadow);
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
  color: var(--gob-dg-title);
}

.subtitle {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--gob-dg-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.tabs {
  display: none;
  gap: 4px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.08);
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.filters {
  display: none;
  gap: 10px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  background: #fff;
  flex-wrap: wrap;
  align-items: center;
}

.bulk {
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  background: color-mix(in srgb, var(--gob-dg-accent) 7%, #fff);
  color: var(--gob-dg-title);
  font-size: 13px;
  font-weight: 600;
}

.scroll {
  overflow: auto;
  max-width: 100%;
  max-height: 420px;
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
  color: var(--gob-dg-muted);
  background: #fff;
}

.root[data-variant='filters'] .tabs,
.root[data-variant='column-filter'] .tabs,
.root[data-variant='toolbar'] .tabs,
.root[data-variant='paginated'] .tabs,
.root[data-variant='wide'] .tabs,
.root[data-variant='expandable'] .tabs,
.root[data-variant='card-rows'] .tabs,
.root[data-variant='assignees'] .tabs,
.root[data-variant='progress'] .tabs,
.root[data-variant='tags'] .tabs,
.root[data-variant='live'] .tabs,
.root[data-variant='financial'] .tabs,
.root[data-variant='alert'] .tabs {
  display: flex;
}

.root[data-variant='filters'] .filters,
.root[data-variant='column-filter'] .filters,
.root[data-variant='toolbar'] .filters,
.root[data-variant='wide'] .filters,
.root[data-variant='paginated'] .filters,
.root[data-variant='card-rows'] .filters,
.root[data-variant='assignees'] .filters,
.root[data-variant='progress'] .filters,
.root[data-variant='tags'] .filters,
.root[data-variant='live'] .filters,
.root[data-variant='financial'] .filters,
.root[data-variant='alert'] .filters {
  display: flex;
}

.root[data-variant='bulk'] .bulk {
  display: flex;
}

.root[data-variant='filters'] .subtitle {
  display: block;
}

.root[data-variant='frozen-left'] .filters,
.root[data-variant='frozen-left'] .tabs,
.root[data-variant='frozen-right'] .filters,
.root[data-variant='frozen-right'] .tabs,
.root[data-variant='frozen-right'] .bulk,
.root[data-variant='expandable'] .filters,
.root[data-variant='expandable'] .bulk,
.root[data-variant='grouped'] .filters,
.root[data-variant='grouped'] .tabs,
.root[data-variant='grouped'] .bulk,
.root[data-variant='paginated'] .bulk {
  display: none;
}

.root[data-variant='frozen-left'] .actions,
.root[data-variant='grouped'] .actions,
.root[data-variant='skeleton'] .tabs,
.root[data-variant='skeleton'] .filters,
.root[data-variant='skeleton'] .bulk {
  display: none;
}

.root[data-variant='expandable'] .actions,
.root[data-variant='card-rows'] .actions,
.root[data-variant='assignees'] .actions,
.root[data-variant='progress'] .actions,
.root[data-variant='tags'] .actions,
.root[data-variant='live'] .actions,
.root[data-variant='financial'] .actions,
.root[data-variant='alert'] .actions,
.root[data-variant='skeleton'] .actions {
  display: inline-flex;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-dg-accent: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-dg-accent: #bc945a;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-dg-accent: #181511;
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-dg-accent: #6b655c;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-dg-accent: #a67c52;
}
`;
