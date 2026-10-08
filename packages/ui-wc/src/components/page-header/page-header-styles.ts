export const pageHeaderStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-ph-text, #6b665f);
  background: transparent;
  border: 0;
  border-radius: 0;
  --gob-ph-bg: #ffffff;
  --gob-ph-bg-2: #fbfbfb;
  --gob-ph-text: #6b665f;
  --gob-ph-muted: #8a8278;
  --gob-ph-title: #181511;
  --gob-ph-border: rgba(24, 21, 17, 0.1);
  --gob-ph-accent: #9f2141;
  --gob-ph-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-ph-accent-text: #9f2141;
  --gob-ph-surface: #f5f5f5;
  --gob-ph-surface-border: #e5e5e5;
  --gob-ph-gap: 14px;
  --gob-ph-title-size: 1.65rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  gap: var(--gob-ph-gap);
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--gob-ph-text);
}

/* Solo con surface=panel aparece el contenedor */
:host([surface='panel']) .root,
.root[data-surface='panel'] {
  padding: 18px 18px 16px;
  border-radius: 16px;
  border: 1px solid var(--gob-ph-border);
  background: linear-gradient(180deg, var(--gob-ph-bg) 0%, var(--gob-ph-bg-2) 100%);
}

.top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px 20px;
}

.main {
  display: grid;
  gap: 8px;
  min-width: 0;
  flex: 1 1 220px;
}

.breadcrumb {
  min-width: 0;
}

.titleRow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  min-width: 0;
}

.title {
  min-width: 0;
  margin: 0;
  font-size: var(--gob-ph-title-size);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--gob-ph-title);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.description {
  min-width: 0;
  max-width: 62ch;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.55;
  color: var(--gob-ph-muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex: 0 1 auto;
}

::slotted(h1),
::slotted(h2),
::slotted([slot='title']) {
  margin: 0;
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}

::slotted(p),
::slotted([slot='description']) {
  margin: 0;
  font: inherit;
  color: inherit;
  line-height: inherit;
}

.root[data-variant='dense'] {
  --gob-ph-gap: 8px;
  --gob-ph-title-size: 1.25rem;
}

.root[data-variant='dense'] .description {
  font-size: 13px;
}

.root[data-variant='actions'] .top,
.root[data-variant='complete'] .top {
  align-items: center;
}

@media (max-width: 720px) {
  .top {
    flex-direction: column;
    align-items: stretch;
  }

  .actions {
    justify-content: flex-start;
  }

  :host {
    --gob-ph-title-size: 1.4rem;
  }

  .root[data-variant='dense'] {
    --gob-ph-title-size: 1.15rem;
  }
}
`;
