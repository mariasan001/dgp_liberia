export const filterBarStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-fb-text, #6b665f);
  --gob-fb-bg: #ffffff;
  --gob-fb-bg-2: #fbfbfb;
  --gob-fb-text: #6b665f;
  --gob-fb-muted: #8a8278;
  --gob-fb-title: #181511;
  --gob-fb-border: rgba(24, 21, 17, 0.08);
  --gob-fb-accent: #9f2141;
  --gob-fb-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-fb-accent-text: #9f2141;
  --gob-fb-surface: #fafafa;
  --gob-fb-surface-border: #ebebeb;
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
  gap: 10px;
  min-height: 56px;
  padding: 12px 16px;
  border: 1px solid var(--gob-fb-border);
  border-radius: 14px;
  background: linear-gradient(180deg, var(--gob-fb-bg) 0%, var(--gob-fb-bg-2) 100%);
  color: var(--gob-fb-text);
}

.root[data-variant='dense'] {
  min-height: 44px;
  padding: 8px 12px;
  gap: 8px;
  border-radius: 12px;
}

.search,
.filters,
.actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
  gap: 8px;
}

.search {
  flex: 0 1 auto;
}

.filters {
  flex: 1 1 180px;
}

.actions {
  flex: 0 0 auto;
  margin-inline-start: auto;
  justify-content: flex-end;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-fb-bg: #ffffff;
  --gob-fb-bg-2: #fbfbfb;
  --gob-fb-text: #6b665f;
  --gob-fb-muted: #8a8278;
  --gob-fb-title: #181511;
  --gob-fb-border: rgba(24, 21, 17, 0.08);
  --gob-fb-accent: #9f2141;
  --gob-fb-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-fb-accent-text: #9f2141;
  --gob-fb-surface: #fafafa;
  --gob-fb-surface-border: #ebebeb;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-fb-bg: #f7f1e8;
  --gob-fb-bg-2: #f3ebe0;
  --gob-fb-text: #5c5348;
  --gob-fb-muted: #8a8278;
  --gob-fb-title: #3f372e;
  --gob-fb-border: rgba(24, 21, 17, 0.08);
  --gob-fb-accent: #bc945a;
  --gob-fb-accent-soft: rgba(188, 148, 90, 0.22);
  --gob-fb-accent-text: #7a5a2e;
  --gob-fb-surface: rgba(255, 255, 255, 0.65);
  --gob-fb-surface-border: rgba(24, 21, 17, 0.1);
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-fb-bg: #181511;
  --gob-fb-bg-2: #221e19;
  --gob-fb-text: rgba(255, 255, 255, 0.72);
  --gob-fb-muted: rgba(255, 255, 255, 0.5);
  --gob-fb-title: #ffffff;
  --gob-fb-border: rgba(255, 255, 255, 0.1);
  --gob-fb-accent: #ffffff;
  --gob-fb-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-fb-accent-text: #181511;
  --gob-fb-surface: rgba(255, 255, 255, 0.08);
  --gob-fb-surface-border: rgba(255, 255, 255, 0.12);
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-fb-bg: #ebebeb;
  --gob-fb-bg-2: #e4e4e4;
  --gob-fb-text: #5f5952;
  --gob-fb-muted: #8a8278;
  --gob-fb-title: #181511;
  --gob-fb-border: rgba(24, 21, 17, 0.12);
  --gob-fb-accent: #9f2141;
  --gob-fb-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-fb-accent-text: #9f2141;
  --gob-fb-surface: #f5f5f5;
  --gob-fb-surface-border: #d0d0d0;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-fb-bg: #e7d7bd;
  --gob-fb-bg-2: #dfc9a8;
  --gob-fb-text: #5a4f42;
  --gob-fb-muted: #7a6f60;
  --gob-fb-title: #2f2922;
  --gob-fb-border: rgba(24, 21, 17, 0.12);
  --gob-fb-accent: #9f2141;
  --gob-fb-accent-soft: rgba(159, 33, 65, 0.16);
  --gob-fb-accent-text: #9f2141;
  --gob-fb-surface: rgba(255, 255, 255, 0.42);
  --gob-fb-surface-border: rgba(24, 21, 17, 0.12);
}

@media (max-width: 640px) {
  .root {
    align-items: stretch;
  }

  .search,
  .filters,
  .actions {
    width: 100%;
  }

  .actions {
    margin-inline-start: 0;
    justify-content: flex-start;
  }
}
`;
