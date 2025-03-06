import { isApiClientError } from "../api/client";
import { login } from "../pages/auth/service-auth";
import { Credentials } from '../pages/auth/types';
import { Advert } from '../pages/adverts/types';
import { AppThunk } from ".";
import { createAdvert, deleteAdvert, getAdvertList, getTags } from "../pages/adverts/service-adverts";
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
  payload: Advert[] ;
};

type AdvertsLoadedRejected = {
  type: 'adverts/loaded/rejected';
  payload: Error;
};

// Adverts Created: pending, fulfilled y rejected

type AdvertsCreatedPending = {
  type: 'adverts/created/pending';
};

type AdvertsCreatedFulfilled = {
  type: 'adverts/created/fulfilled';
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: 'adverts/created/rejected';
  payload: Error;
};

// Adverts Deleted: pending, fulfilled y rejected

type AdvertsDeletedPending = {
  type: 'adverts/deleted/pending';
  payload: number; //ID
};

type AdvertsDeletedFulfilled = {
  type: 'adverts/deleted/fulfilled';
  payload: number; //ID
};

type AdvertsDeletedRejected = {
  type: 'adverts/deleted/rejected';
  payload: Error;
};

//UI

type UiResetError = {
  type: "ui/reset-error";
};


/*
2)Creación de Action Creators:Funciones para despachar las acciones
*/

//authLogin: pending, fulfilled, rejected y thunk

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


//Tags: pending, fulfilled, rejected y thunk

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
  payload: adverts
 
});

export const advertsLoadedFulfilled = (adverts: Advert[]): AdvertsLoadedFulfilled => ({
  type: 'adverts/loaded/fulfilled',
  payload: adverts,
});

export const advertsLoadedRejected = (error: Error): AdvertsLoadedRejected => ({
  type: 'adverts/loaded/rejected',
  payload: error,
});


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

//AdvertsCreated:pending, fulfilled, rejected y thunk

export const advertsCreatedPending = (): AdvertsCreatedPending => ({
  type: 'adverts/created/pending',
});

export const advertsCreatedFulfilled = (advert: Advert): AdvertsCreatedFulfilled => ({
  type: 'adverts/created/fulfilled',
  payload: advert,
});

export const advertsCreatedRejected = (error: Error): AdvertsCreatedRejected => ({
  type: 'adverts/created/rejected',
  payload: error,
});


export function advertsCreate(advert: FormData): AppThunk<Promise<void>> {
  return async function (dispatch, {router}) {
    dispatch(advertsCreatedPending());
    try {
      const newAdvert = await createAdvert(advert); 
      dispatch(advertsCreatedFulfilled(newAdvert));
      await router.navigate(`/adverts/${newAdvert.id}`);
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(advertsCreatedRejected(error));
      }
      throw error;
    }
  };
}

//AdvertsDeleted: pending, fulfilled, rejected y thunk

export const advertsDeletedPending = (advertId: number): AdvertsDeletedPending => ({
  type: 'adverts/deleted/pending',
  payload: advertId,
});

export const advertsDeletedFulfilled = (advertId: number): AdvertsDeletedFulfilled => ({
  type: 'adverts/deleted/fulfilled',
  payload: advertId,
});

export const advertsDeletedRejected = (error: Error): AdvertsDeletedRejected => ({
  type: 'adverts/deleted/rejected',
  payload: error,
});

export function advertsDelete(advertId:number): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(advertsDeletedPending(advertId));
    try {
      const deletedAdvert = await deleteAdvert(String(advertId)); 
      dispatch(advertsDeletedFulfilled(deletedAdvert.id));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(advertsDeletedRejected(error));
      }
      throw error;
    }
  };
}


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
  | AdvertsCreatedPending
  | AdvertsCreatedFulfilled
  | AdvertsCreatedRejected
  | AdvertsDeletedPending
  | AdvertsDeletedFulfilled
  | AdvertsDeletedRejected
  | UiResetError
