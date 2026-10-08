'use client';

import { useEffect } from 'react';

export default function WebComponentsRegistry() {
  useEffect(() => {
    void import('@mariasan001/ui-wc');
  }, []);

  return null;
}
