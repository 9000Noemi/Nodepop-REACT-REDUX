import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import storage from './utils/storage.ts';
import { setAuthorizationHeader } from './api/client.tsx';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './store';
import { Provider } from 'react-redux';



const accessToken = storage.get('auth');
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const store = configureStore({ auth: !!accessToken });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = { store }>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
