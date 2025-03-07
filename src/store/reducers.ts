import { Advert } from '../pages/adverts/types';
import { Actions } from './actions';

export type State = {
  auth: boolean;
  adverts: Advert[]| null
  tags: string[];
  adDetail: [],
  ui:{
    pending: boolean;
    error: Error | null;
  }
};

// Estado inicial
const defaultState: State = {
  auth: false,
  adverts: null,
  tags: [],
  adDetail: [],
  ui: {
    pending: false,
    error:null
  }
};

// Reducer de autenticación
export function auth(
  state = defaultState.auth,
  action: Actions,
): State['auth'] {
  switch (action.type) {
    case 'auth/login/fulfilled':
      return true;
    case 'auth/logout':
      return false;
    default:
      return state;
  }
}

// Reducer de anuncios
export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State['adverts'] {
  switch (action.type) {
    case 'adverts/loaded/fulfilled':
      return action.payload;
      
    case 'adverts/created/fulfilled':
      return [...( state ?? []) , action.payload];

    case 'adverts/deleted/fulfilled':
    // Devolver un array vacío si state es null
      return (state??[]).filter(advert => advert.id !== action.payload);
    default:
      return state;
  }
}

// Reducer de tags 
export function tags(
  state = defaultState.tags,
  action: Actions,
): State['tags'] {
  switch (action.type) {
    case 'tags/loaded/fulfilled':
      return action.payload;
    default:
      return state;
  }
}

// Reducer del detalle del anuncio               REVISAR!!!!!!!!!!
export function adDetail(
  state = defaultState.adverts,  // Inicializa con los detalles de un anuncio vacío
  action: Actions,
): State['adverts'] {  // El tipo del estado será el mismo que el de los anuncios
  switch (action.type) {
    case 'ad-detail/pending':
      return null;  // Establecemos el estado en null cuando se está cargando
    case 'ad-detail/fulfilled':
      return [action.payload];  
    case 'ad-detail/rejected':
      return [];  
    default:
      return state;
  }
}


// Reducer de ui  
export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  switch (action.type) {
    case "ui/reset-error":
      return { ...state, error: null };
    case "auth/login/pending":
      return { pending: true, error: null };
    case "auth/login/fulfilled":
      return { pending: false, error: null };
    case "auth/login/rejected":
      return { pending: false, error: action.payload };
    default:
      return state;
  }
}