import { client } from '../../api/client';
import type { Advert, NewAdvert } from './types';

/*
Servicio de comunicación con la API: funciones que interactuan con los endpoints del back
*/

//URL del endpoint.La base URL ya está configurada en client,solo necesitamos la ruta
const advertsUrl = '/api/v1/adverts';

//GET: Listado de anuncios
//Devuelve los datos (response.data), que luego son utilizados en el componente AdvertsPage para renderizar la lista de anuncios.
export const getAdvertList = async () => {
  const response = await client.get<Advert[]>(advertsUrl);
  return response.data;
};

//POST: Crea un anuncio.
export const createAdvert = async (advert: NewAdvert) => {
  const response = await client.post<Advert>(advertsUrl, advert);
  return response.data;
};
