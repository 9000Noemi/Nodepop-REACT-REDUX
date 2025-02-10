import { client, setAuthorizationHeader,removeAuthorizationHeader } from '../../api/client';
import type { Credentials, Login } from './types';
import storage from '../../utils/storage';

/*
Servicio de comunicación con la API: funciones que interactuan con los endpoints del back
*/


//POST: Devuelve un token(response.data) cuando le pasamos un email y password de un usuario correctos(credentials)
export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>('/api/auth/login', credentials);
  const {accessToken} = response.data;
  storage.set('auth', accessToken);
  setAuthorizationHeader(accessToken);
};


export const logout = async () => {
  storage.remove('auth');
  removeAuthorizationHeader();
};
