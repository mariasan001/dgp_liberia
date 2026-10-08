import type { CSSProperties } from 'react';

import type { BreadcrumbTone } from './breadcrumb-data';

export const BREADCRUMB_THEME_VARS: Record<BreadcrumbTone, CSSProperties> = {
  primary: {
    ['--gob-bc-text' as string]: '#6b665f',
    ['--gob-bc-muted' as string]: '#8a8278',
    ['--gob-bc-current' as string]: '#181511',
    ['--gob-bc-accent' as string]: '#9f2141',
    ['--gob-bc-bg' as string]: 'transparent',
    ['--gob-bc-border' as string]: 'transparent',
    ['--gob-bc-pad-y' as string]: '0px',
    ['--gob-bc-pad-x' as string]: '0px',
    ['--gob-bc-radius' as string]: '0px',
  },
  accent: {
    ['--gob-bc-text' as string]: '#5c5348',
    ['--gob-bc-muted' as string]: '#8a8278',
    ['--gob-bc-current' as string]: '#3f372e',
    ['--gob-bc-accent' as string]: '#bc945a',
    ['--gob-bc-bg' as string]: 'transparent',
    ['--gob-bc-border' as string]: 'transparent',
    ['--gob-bc-pad-y' as string]: '0px',
    ['--gob-bc-pad-x' as string]: '0px',
    ['--gob-bc-radius' as string]: '0px',
  },
};
