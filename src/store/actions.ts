import { Advert } from "../pages/adverts/types"

/*
Acciones para manejar el estado global de la aplicacion:
1)Definición de tipos para las acciones (TS)
2)Creación de Action Creators.
3)Exportación de los tipos de acciones.
*/


//1)Definición de tipos para las acciones (TS): Login y Adverts

type AuthLogin = {
    type: "auth/login";
  };
  
type AuthLogout = {
    type: "auth/logout";
  };


type TagsLoaded = {
  type: "tags/loaded";
  payload: string[]; // Un array de strings con los tags disponibles
};

type AdvertsLoaded = {
    type: "adverts/loaded";
    payload: Advert[];
  };
  
type AdvertsCreated = {
    type: "adverts/created";
    payload: Advert;
  };

type AdvertsDeleted = {
    type: "adverts/deleted";
    payload: string; // Usamos un ID en lugar de un objeto entero
  };


//2)Creación de Action Creators:Funciones para despachar las acciones


export const authLogin = (): AuthLogin => ({
    type: "auth/login",
  });
  
export const authLogout = (): AuthLogout => ({
    type: "auth/logout",
  });


export const tagsLoaded = (tags: string[]): TagsLoaded => ({
    type: "tags/loaded",
    payload: tags,
  });

export const advertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
    type: "adverts/loaded",
    payload: adverts,
  });
  
export const advertsCreated = (advert: Advert): AdvertsCreated => ({
    type: "adverts/created",
    payload: advert,
  });
  
export const advertsDeleted = (advertId: string): AdvertsDeleted => ({
    type: "adverts/deleted",
    payload: advertId,
  });
  
  
//3)Exportación de los tipos de acciones.

export type Actions = AuthLogin | AuthLogout | TagsLoaded | AdvertsLoaded | AdvertsCreated | AdvertsDeleted