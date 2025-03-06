import { Advert } from '../pages/adverts/types';
import { Actions } from './actions';

export type State = {
  auth: boolean;
  adverts: Advert[]| null;
  tags: string[];
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

    case 'adverts/created':
      return [...( state ?? []) , action.payload];

    
case 'adverts/deleted':
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