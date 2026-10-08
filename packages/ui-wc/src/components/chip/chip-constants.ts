export const CHIP_TONES = ['primary', 'success', 'error', 'warning', 'neutral'] as const;

export type ChipTone = (typeof CHIP_TONES)[number];

export const CHIP_OBSERVED_ATTRIBUTES = [
  'tone',
  'disabled',
  'dismissible',
  'aria-label',
] as const;
