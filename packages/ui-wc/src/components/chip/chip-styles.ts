export const chipStyles = `
:host {
  display: inline-flex;
  vertical-align: middle;
  max-width: 100%;
}

.root {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 0;
  font-family: var(--gob-font-sans, inherit);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  max-width: 100%;
}

.root[data-tone="primary"] {
  background: var(--gob-primary-soft);
  color: var(--gob-primary);
}

.root[data-tone="success"] {
  background: var(--gob-success-bg);
  color: var(--gob-success);
}

.root[data-tone="error"] {
  background: var(--gob-danger-bg);
  color: var(--gob-danger);
}

.root[data-tone="warning"] {
  background: var(--gob-warning-bg);
  color: var(--gob-warning);
}

.root[data-tone="neutral"] {
  background: var(--gob-surface-muted, #f8f5ef);
  color: var(--gob-text-muted);
}

.root[data-disabled="true"] {
  background: #ebe6df;
  color: #9a9288;
}

.label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dismiss {
  appearance: none;
  border: 0;
  background: transparent;
  color: currentColor;
  width: 18px;
  height: 18px;
  padding: 0;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 0 0 auto;
  opacity: 0.85;
}

.dismiss:hover {
  opacity: 1;
  background: color-mix(in srgb, currentColor 12%, transparent);
}

.root[data-disabled="true"] .dismiss {
  cursor: not-allowed;
  opacity: 0.5;
}

.dismiss:focus-visible {
  outline: none;
  box-shadow: var(--gob-focus-ring, var(--gob-focus));
}
`;
