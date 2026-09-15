import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/app/store';
import '@/app/bootstrap.min.css';
import '@/app/index.css';
import App from '@/app/App';
import reportWebVitals from '@/app/reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
