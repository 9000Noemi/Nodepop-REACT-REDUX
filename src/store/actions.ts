import { ThunkAction } from "redux-thunk";
import { isApiClientError } from "../api/client";
import { login } from "../pages/auth/service-auth";
import { Credentials } from '../pages/auth/types';
import { Advert } from '../pages/adverts/types';
import { AppThunk, RootState } from ".";

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

//Tags

type TagsLoaded = {
  type: 'tags/loaded';
  payload: string[]; // Un array de strings con los tags disponibles
};

//Adverts

type AdvertsLoaded = {
  type: 'adverts/loaded';
  payload: Advert[];
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

//2)Creación de Action Creators:Funciones para despachar las acciones

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


export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials, true); //REVISAR ESTE TRUE
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}


export const authLogout = (): AuthLogout => ({
  type: 'auth/logout',
});

export const tagsLoaded = (tags: string[]): TagsLoaded => ({
  type: 'tags/loaded',
  payload: tags,
});

export const advertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: 'adverts/loaded',
  payload: adverts,
});

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
  | TagsLoaded
  | AdvertsLoaded
  | AdvertsCreated
  | AdvertsDeleted
  | UiResetError
