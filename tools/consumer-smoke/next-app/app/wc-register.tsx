'use client';

import { useEffect } from 'react';

export function WcRegister() {
  useEffect(() => {
    void import('@mariasan001/ui-wc');
  }, []);

  return null;
}
