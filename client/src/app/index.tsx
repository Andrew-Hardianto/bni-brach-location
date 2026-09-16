import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/app/store';
import '@/app/bootstrap.min.css';
import '@/app/index.css';

const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Support for defaultProps will be removed from function components')) {
    return; // Ignore defaultProps warning
  }
  originalConsoleError(...args);
};

import App from '@/app/App';
import reportWebVitals from '@/app/reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  
    <Provider store={store}>
      <App />
    </Provider>
  
);

reportWebVitals();
