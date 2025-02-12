//Inicializamos el cliente Axios

import axios from 'axios';
import { ApiClientError } from './error';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Función que añade el token de autenticación a todas las peticiones hechas con client
export const setAuthorizationHeader = (accessToken: string) => {
  client.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
};

//Borrar el token
export const removeAuthorizationHeader = () => {
  delete client.defaults.headers['Authorization'];
};

export function isApiClientError(error: unknown): error is ApiClientError {
  return error instanceof ApiClientError;
}
