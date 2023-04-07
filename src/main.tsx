import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/store/index';
import './styles/common.scss';
import './styles/tailwind.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import router from '@/routes';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
