import { isApiClientError } from '../api/client';
import { login, logout } from '../pages/auth/service-auth';
import { Credentials } from '../pages/auth/types';
import { Advert } from '../pages/adverts/types';
import { AppThunk } from '.';
import {
  createAdvert,
  deleteAdvert,
  getAdvert,
  getAdvertList,
  getTags,
} from '../pages/adverts/service-adverts';

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
  type: 'auth/login/pending';
};

type AuthLoginFulfilled = {
  type: 'auth/login/fulfilled';
};

type AuthLoginRejected = {
  type: 'auth/login/rejected';
  payload: Error;
};

//Logout

type AuthLogoutFulfilled = {
  type: 'auth/logout/fulfilled';
};

// Tags: pending, fulfilled, rejected

type TagsLoadedPending = {
  type: 'tags/loaded/pending';
};

type TagsLoadedFulfilled = {
  type: 'tags/loaded/fulfilled';
  payload: string[]; // Array de strings con los tags disponibles
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
  payload: string; //ID
};

type AdvertsDeletedFulfilled = {
  type: 'adverts/deleted/fulfilled';
  payload: string; //ID
};

type AdvertsDeletedRejected = {
  type: 'adverts/deleted/rejected';
  payload: Error;
};

// AdDetail: pending, fulfilled y rejected

type AdDetailPending = {
  type: 'ad-detail/pending';
};

type AdDetailFulfilled = {
  type: 'ad-detail/fulfilled';
  payload: Advert; // El detalle del anuncio que recibimos
};

type AdDetailRejected = {
  type: 'ad-detail/rejected';
  payload: Error;
};

//UI

type UiResetError = {
  type: 'ui/reset-error';
};

/*
2)Creación de Action Creators:Funciones para despachar las acciones
*/

//authLogin: pending, fulfilled, rejected y thunk

export const authLoginPending = (): AuthLoginPending => ({
  type: 'auth/login/pending',
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: 'auth/login/fulfilled',
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: 'auth/login/rejected',
  payload: error,
});

export function authLogin(
  credentials: Credentials,
  rememberMe: boolean,
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { router }) {
    dispatch(authLoginPending());
    try {
      await login(credentials, rememberMe);
      dispatch(authLoginFulfilled());
      const to = router.state.location.state?.from ?? '/';
      router.navigate(to, { replace: true });
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

//Logout: fulfilled y thunk

export const authLogoutFulfilled = (): AuthLogoutFulfilled => ({
  type: 'auth/logout/fulfilled',
});

export function authLogout(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { router }) {
    try {
      await logout();
      dispatch(authLogoutFulfilled());
      router.navigate('/login');
    } catch (error) {
      throw error;
    }
  };
}

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

export const advertsLoadedPending = (
  adverts: Advert[],
): AdvertsLoadedPending => ({
  type: 'adverts/loaded/pending',
  payload: adverts,
});

export const advertsLoadedFulfilled = (
  adverts: Advert[],
): AdvertsLoadedFulfilled => ({
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
    // Si no hay anuncios cargados, proceder a cargarlos
    try {
      dispatch(advertsLoadedPending([])); //usar array vacío mientras carga
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

export const advertsCreatedFulfilled = (
  advert: Advert,
): AdvertsCreatedFulfilled => ({
  type: 'adverts/created/fulfilled',
  payload: advert,
});

export const advertsCreatedRejected = (
  error: Error,
): AdvertsCreatedRejected => ({
  type: 'adverts/created/rejected',
  payload: error,
});

export function advertsCreate(advert: FormData): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { router }) {
    dispatch(advertsCreatedPending());
    try {
      const newAdvert = await createAdvert(advert);
      dispatch(advertsCreatedFulfilled(newAdvert));
      router.navigate(`/adverts/${newAdvert.id}`);
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(advertsCreatedRejected(error));
      }
      throw error;
    }
  };
}

//AdvertsDeleted: pending, fulfilled, rejected y thunk

export const advertsDeletedPending = (
  advertId: string,
): AdvertsDeletedPending => ({
  type: 'adverts/deleted/pending',
  payload: advertId,
});

export const advertsDeletedFulfilled = (
  advertId: string,
): AdvertsDeletedFulfilled => ({
  type: 'adverts/deleted/fulfilled',
  payload: advertId,
});

export const advertsDeletedRejected = (
  error: Error,
): AdvertsDeletedRejected => ({
  type: 'adverts/deleted/rejected',
  payload: error,
});

export function advertsDelete(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { router }) {
    dispatch(advertsDeletedPending(advertId));
    try {
      const deletedAdvert = await deleteAdvert(advertId);
      dispatch(advertsDeletedFulfilled(String(deletedAdvert.id)));
      router.navigate('/adverts');
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(advertsDeletedRejected(error));
      }
      throw error;
    }
  };
}

//AdDetail:pending, fulfilled, rejected y thunk

export const adDetailPending = (): AdDetailPending => ({
  type: 'ad-detail/pending',
});

export const adDetailFulfilled = (advert: Advert): AdDetailFulfilled => ({
  type: 'ad-detail/fulfilled',
  payload: advert,
});

export const adDetailRejected = (error: Error): AdDetailRejected => ({
  type: 'ad-detail/rejected',
  payload: error,
});

export function advertDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(adDetailPending());
    try {
      const advert = await getAdvert(advertId);
      dispatch(adDetailFulfilled(advert));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(adDetailRejected(error));
      }
      throw error;
    }
  };
}

export const uiResetError = (): UiResetError => ({
  type: 'ui/reset-error',
});

//3)Exportación de los tipos de acciones.

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogoutFulfilled
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
  | AdDetailPending
  | AdDetailFulfilled
  | AdDetailRejected
  | UiResetError;
