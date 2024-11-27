import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from './context/Toast/toastProvider';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { PwaProvider } from './context/PwaContext/page';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PwaProvider>
      <ToastProvider>
        <App></App>
      </ToastProvider>
    </PwaProvider>
  </React.StrictMode>
);


serviceWorkerRegistration.register();

reportWebVitals();
