import { client } from '../../api/client';
import type { Credentials, Login } from './types';

/*
Servicio de comunicación con la API: funciones que interactuan con los endpoints del back
*/

export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>('/api/auth/login', credentials);
  return response.data;
};
