export const toolbarStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-tbx-text, #6b665f);
  --gob-tbx-bg: #ffffff;
  --gob-tbx-bg-2: #fbfbfb;
  --gob-tbx-text: #6b665f;
  --gob-tbx-muted: #8a8278;
  --gob-tbx-title: #181511;
  --gob-tbx-border: rgba(24, 21, 17, 0.08);
  --gob-tbx-accent: #9f2141;
  --gob-tbx-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-tbx-accent-text: #9f2141;
  --gob-tbx-surface: #fafafa;
  --gob-tbx-surface-border: #ebebeb;
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
  gap: 12px;
  min-height: 56px;
  padding: 10px 16px;
  border: 1px solid var(--gob-tbx-border);
  border-radius: 14px;
  background: linear-gradient(180deg, var(--gob-tbx-bg) 0%, var(--gob-tbx-bg-2) 100%);
  color: var(--gob-tbx-text);
}

.root[data-dense='true'] {
  min-height: 44px;
  padding: 8px 12px;
  gap: 8px;
  border-radius: 12px;
}

.start,
.actions,
.end {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
  gap: 8px;
}

.start {
  flex: 1 1 auto;
}

.actions {
  flex: 0 1 auto;
}

.end {
  flex: 0 0 auto;
  margin-inline-start: auto;
  justify-content: flex-end;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-tbx-bg: #ffffff;
  --gob-tbx-bg-2: #fbfbfb;
  --gob-tbx-text: #6b665f;
  --gob-tbx-muted: #8a8278;
  --gob-tbx-title: #181511;
  --gob-tbx-border: rgba(24, 21, 17, 0.08);
  --gob-tbx-accent: #9f2141;
  --gob-tbx-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-tbx-accent-text: #9f2141;
  --gob-tbx-surface: #fafafa;
  --gob-tbx-surface-border: #ebebeb;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-tbx-bg: #f7f1e8;
  --gob-tbx-bg-2: #f3ebe0;
  --gob-tbx-text: #5c5348;
  --gob-tbx-muted: #8a8278;
  --gob-tbx-title: #3f372e;
  --gob-tbx-border: rgba(24, 21, 17, 0.08);
  --gob-tbx-accent: #bc945a;
  --gob-tbx-accent-soft: rgba(188, 148, 90, 0.22);
  --gob-tbx-accent-text: #7a5a2e;
  --gob-tbx-surface: rgba(255, 255, 255, 0.65);
  --gob-tbx-surface-border: rgba(24, 21, 17, 0.1);
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-tbx-bg: #181511;
  --gob-tbx-bg-2: #221e19;
  --gob-tbx-text: rgba(255, 255, 255, 0.72);
  --gob-tbx-muted: rgba(255, 255, 255, 0.5);
  --gob-tbx-title: #ffffff;
  --gob-tbx-border: rgba(255, 255, 255, 0.1);
  --gob-tbx-accent: #ffffff;
  --gob-tbx-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-tbx-accent-text: #181511;
  --gob-tbx-surface: rgba(255, 255, 255, 0.08);
  --gob-tbx-surface-border: rgba(255, 255, 255, 0.12);
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-tbx-bg: #ebebeb;
  --gob-tbx-bg-2: #e4e4e4;
  --gob-tbx-text: #5f5952;
  --gob-tbx-muted: #8a8278;
  --gob-tbx-title: #181511;
  --gob-tbx-border: rgba(24, 21, 17, 0.12);
  --gob-tbx-accent: #9f2141;
  --gob-tbx-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-tbx-accent-text: #9f2141;
  --gob-tbx-surface: #f5f5f5;
  --gob-tbx-surface-border: #d0d0d0;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-tbx-bg: #e7d7bd;
  --gob-tbx-bg-2: #dfc9a8;
  --gob-tbx-text: #5a4f42;
  --gob-tbx-muted: #7a6f60;
  --gob-tbx-title: #2f2922;
  --gob-tbx-border: rgba(24, 21, 17, 0.12);
  --gob-tbx-accent: #9f2141;
  --gob-tbx-accent-soft: rgba(159, 33, 65, 0.16);
  --gob-tbx-accent-text: #9f2141;
  --gob-tbx-surface: rgba(255, 255, 255, 0.42);
  --gob-tbx-surface-border: rgba(24, 21, 17, 0.12);
}

@media (max-width: 640px) {
  .end {
    margin-inline-start: 0;
    width: 100%;
    justify-content: flex-start;
  }
}
`;
