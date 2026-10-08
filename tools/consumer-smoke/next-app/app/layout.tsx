import type { ReactNode } from 'react';

import '@mariasan001/styles/base.css';
import '@mariasan001/styles/theme.css';
import '@mariasan001/styles/utilities.css';
import '@mariasan001/styles/fonts.css';

import { WcRegister } from './wc-register';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <WcRegister />
        {children}
      </body>
    </html>
  );
}
