import React from 'react';
import ReactDOM from 'react-dom/client';

import '@mariasan001/styles/base.css';
import '@mariasan001/styles/theme.css';
import '@mariasan001/styles/utilities.css';
import '@mariasan001/styles/fonts.css';
import '@mariasan001/ui-wc';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
