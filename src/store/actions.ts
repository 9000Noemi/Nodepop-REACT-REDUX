import { isApiClientError } from "../api/client";
import { login } from "../pages/auth/service-auth";
import { Credentials } from '../pages/auth/types';
import { Advert } from '../pages/adverts/types';
import { AppThunk } from ".";
import { getAdvertList, getTags } from "../pages/adverts/service-adverts";
import { adverts } from "./reducers";

/*
Acciones para manejar el estado global de la aplicacion:
1)Definición de tipos para las acciones (TS)
2)Creación de Action Creators.
3)Exportación de los tipos de acciones.
*/

/*
1)Definición de tipos para las acciones (TS): Login y Adverts
*/

//Login: pending, fulfilled y rejected

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

//Logout

type AuthLogout = {
  type: 'auth/logout';
};

// Tags Loaded: pending, fulfilled, rejected
type TagsLoadedPending = {
  type: 'tags/loaded/pending';
};

type TagsLoadedFulfilled = {
  type: 'tags/loaded/fulfilled';
  payload: string[]; // Un array de strings con los tags disponibles
};

type TagsLoadedRejected = {
  type: 'tags/loaded/rejected';
  payload: Error;
};

//Adverts Loaded: pending, fulfilled y rejected

type AdvertsLoadedPending = {
  type: 'adverts/loaded/pending';
  payload: Advert[];
};

type AdvertsLoadedFulfilled = {
  type: 'adverts/loaded/fulfilled';
  payload: Advert[];
};

type AdvertsLoadedRejected = {
  type: 'adverts/loaded/rejected';
  payload: Error;
};

type AdvertsCreated = {
  type: 'adverts/created';
  payload: Advert;
};

type AdvertsDeleted = {
  type: 'adverts/deleted';
  payload: number; // ID
};

type UiResetError = {
  type: "ui/reset-error";
};


/*
2)Creación de Action Creators:Funciones para despachar las acciones
*/

export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

//thunk de login
export function authLogin(credentials: Credentials, rememberMe: boolean): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials, rememberMe); 
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

//Logout
export const authLogout = (): AuthLogout => ({
  type: 'auth/logout',
});

//Tags
export const tagsLoadedPending = (): TagsLoadedPending => ({
  type: 'tags/loaded/pending',
});

export const tagsLoadedFulfilled = (tags: string[]): TagsLoadedFulfilled => ({
  type: 'tags/loaded/fulfilled',
  payload: tags,
});

export const tagsLoadedRejected = (error: Error): TagsLoadedRejected => ({
  type: 'tags/loaded/rejected',
  payload: error,
});

//thunk de tags
export function tagsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(tagsLoadedPending()); 
    try {
      const tags = await getTags();
      dispatch(tagsLoadedFulfilled(tags)); 
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(tagsLoadedRejected(error)); 
      } 
      throw error;
    }
  };
}


//AdvertsLoaded:pending, fulfilled, rejected y thunk

export const advertsLoadedPending = (adverts: Advert[]): AdvertsLoadedPending => ({
  type: 'adverts/loaded/pending',
  payload: adverts,
});

export const advertsLoadedFulfilled = (adverts: Advert[]): AdvertsLoadedFulfilled => ({
  type: 'adverts/loaded/fulfilled',
  payload: adverts,
});

export const advertsLoadedRejected = (error: Error): AdvertsLoadedRejected => ({
  type: 'adverts/loaded/rejected',
  payload: error,
});

//thunk de advertsLoaded
export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    
    //Si los anuncios ya estan cargados en el estado (array ya inicializado) no hacer nada
    if (state.adverts) {
      return;
    }
     // Si no hay anuncios cargados, procedere a cargarlos
     try {
      dispatch(advertsLoadedPending([]));//usar array vacío mientras carga
      const adverts = await getAdvertList();
      dispatch(advertsLoadedFulfilled(adverts));
      
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(advertsLoadedRejected(error));
      }
      throw error;
    }
  };
}


export const advertsCreated = (advert: Advert): AdvertsCreated => ({
  type: 'adverts/created',
  payload: advert,
});

export const advertsDeleted = (advertId: number): AdvertsDeleted => ({
  type: 'adverts/deleted',
  payload: advertId,
});

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

//3)Exportación de los tipos de acciones.

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | TagsLoadedPending
  | TagsLoadedFulfilled
  | TagsLoadedRejected
  | AdvertsLoadedPending
  | AdvertsLoadedFulfilled
  | AdvertsLoadedRejected
  | AdvertsCreated
  | AdvertsDeleted
  | UiResetError
