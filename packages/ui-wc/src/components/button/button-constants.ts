export const BUTTON_ARIA_ATTRIBUTES = ['aria-label', 'aria-labelledby'] as const;

export const BUTTON_OBSERVED_ATTRIBUTES = [
  'tone',
  'appearance',
  'size',
  'loading',
  'disabled',
  'type',
  'name',
  'value',
  'icon-only',
  'icon-position',
  'demo-state',
  ...BUTTON_ARIA_ATTRIBUTES,
] as const;

export function resolveButtonType(type: string | null): 'button' | 'submit' | 'reset' {
  return type === 'submit' || type === 'reset' || type === 'button' ? type : 'button';
}
