import { Advert } from "../pages/adverts/types"

//Para el login definimos dos acciones

type AuthLogin = {
    type: "auth/login";
  };
  
type AuthLogout = {
    type: "auth/logout";
  };

/* Información sobre los anuncios. El store deberá manejar la obtención de tags disponibles, 
de anuncios desde el API (listado y detalle), así como la creación y borrado de anuncios*/

type AdvertsLoaded = {
    type: "adverts/loaded";
    payload: Advert[];
  };
  
type AdvertsCreated = {
    type: "adverts/created";
    payload: Advert;
  };

type AdvertsDeleted = {
    type: "adverts/created";
    payload: Advert;
  };


//Funciones para despachar las acciones
//En Redux, este tipo de función se llama Action Creator (creador de acciones)

export const authLogin = (): AuthLogin => ({
    type: "auth/login",
  });
  
export const authLogout = (): AuthLogout => ({
    type: "auth/logout",
  });


//FALTAN LAS DE ADVERTS!!!

  export type Actions = AuthLogin | AuthLogout | AdvertsLoaded | AdvertsCreated | AdvertsDeleted