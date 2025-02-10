import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import storage from './utils/storage.ts';
import { setAuthorizationHeader } from './api/client.tsx';


const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App defaultIsLogged={!!accessToken} />
  </StrictMode>,
);
