export const topbarStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-topbar-text, #6b665f);
  --gob-topbar-bg: #ffffff;
  --gob-topbar-bg-2: #fbfbfb;
  --gob-topbar-text: #6b665f;
  --gob-topbar-muted: #8a8278;
  --gob-topbar-title: #181511;
  --gob-topbar-border: rgba(24, 21, 17, 0.08);
  --gob-topbar-accent: #9f2141;
  --gob-topbar-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-topbar-accent-text: #9f2141;
  --gob-topbar-surface: #fafafa;
  --gob-topbar-surface-border: #ebebeb;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  min-height: var(--gob-topbar-height, 60px);
  padding: 0 18px;
  border-bottom: 1px solid var(--gob-topbar-border);
  background: linear-gradient(180deg, var(--gob-topbar-bg) 0%, var(--gob-topbar-bg-2) 100%);
  color: var(--gob-topbar-text);
}

.root[data-sticky="true"] {
  position: sticky;
  top: 0;
  z-index: 3;
}

.root[data-variant="dense"] {
  --gob-topbar-height: 48px;
  padding: 0 14px;
  gap: 10px;
}

.root[data-variant="complete"],
.root[data-variant="search"] {
  grid-template-columns: minmax(0, 1.1fr) minmax(160px, 1.4fr) minmax(0, 1.1fr);
}

.start,
.center,
.end {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 10px;
}

.start {
  justify-content: flex-start;
}

.center {
  justify-content: center;
}

.end {
  justify-content: flex-end;
}

/* Tones on :host (light DOM inherits) and .root[data-tone] (shadow bg) */
:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-topbar-bg: #ffffff;
  --gob-topbar-bg-2: #fbfbfb;
  --gob-topbar-text: #6b665f;
  --gob-topbar-muted: #8a8278;
  --gob-topbar-title: #181511;
  --gob-topbar-border: rgba(24, 21, 17, 0.08);
  --gob-topbar-accent: #9f2141;
  --gob-topbar-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-topbar-accent-text: #9f2141;
  --gob-topbar-surface: #fafafa;
  --gob-topbar-surface-border: #ebebeb;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-topbar-bg: #f7f1e8;
  --gob-topbar-bg-2: #f3ebe0;
  --gob-topbar-text: #5c5348;
  --gob-topbar-muted: #8a8278;
  --gob-topbar-title: #3f372e;
  --gob-topbar-border: rgba(24, 21, 17, 0.08);
  --gob-topbar-accent: #bc945a;
  --gob-topbar-accent-soft: rgba(188, 148, 90, 0.22);
  --gob-topbar-accent-text: #7a5a2e;
  --gob-topbar-surface: rgba(255, 255, 255, 0.65);
  --gob-topbar-surface-border: rgba(24, 21, 17, 0.1);
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-topbar-bg: #181511;
  --gob-topbar-bg-2: #221e19;
  --gob-topbar-text: rgba(255, 255, 255, 0.72);
  --gob-topbar-muted: rgba(255, 255, 255, 0.5);
  --gob-topbar-title: #ffffff;
  --gob-topbar-border: rgba(255, 255, 255, 0.1);
  --gob-topbar-accent: #ffffff;
  --gob-topbar-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-topbar-accent-text: #181511;
  --gob-topbar-surface: rgba(255, 255, 255, 0.08);
  --gob-topbar-surface-border: rgba(255, 255, 255, 0.12);
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-topbar-bg: #ebebeb;
  --gob-topbar-bg-2: #e4e4e4;
  --gob-topbar-text: #5f5952;
  --gob-topbar-muted: #8a8278;
  --gob-topbar-title: #181511;
  --gob-topbar-border: rgba(24, 21, 17, 0.12);
  --gob-topbar-accent: #9f2141;
  --gob-topbar-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-topbar-accent-text: #9f2141;
  --gob-topbar-surface: #f5f5f5;
  --gob-topbar-surface-border: #d0d0d0;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-topbar-bg: #e7d7bd;
  --gob-topbar-bg-2: #dfc9a8;
  --gob-topbar-text: #5a4f42;
  --gob-topbar-muted: #7a6f60;
  --gob-topbar-title: #2f2922;
  --gob-topbar-border: rgba(24, 21, 17, 0.12);
  --gob-topbar-accent: #9f2141;
  --gob-topbar-accent-soft: rgba(159, 33, 65, 0.16);
  --gob-topbar-accent-text: #9f2141;
  --gob-topbar-surface: rgba(255, 255, 255, 0.42);
  --gob-topbar-surface-border: rgba(24, 21, 17, 0.12);
}

@media (max-width: 720px) {
  .root,
  .root[data-variant="complete"],
  .root[data-variant="search"] {
    grid-template-columns: minmax(0, 1fr) auto;
    min-height: 56px;
  }

  .center {
    display: none;
  }
}
`;
