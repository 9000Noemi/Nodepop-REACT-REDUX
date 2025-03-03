import { Advert } from '../pages/adverts/types';
import { Actions } from './actions';

export type State = {
  auth: boolean;
  adverts: Advert[];
  tags: string[];
};

// Estado inicial
const defaultState: State = {
  auth: false,
  adverts: [],
  tags: [],
};

// Reducer de autenticación
export function auth(
  state = defaultState.auth,
  action: Actions,
): State['auth'] {
  switch (action.type) {
    case 'auth/login':
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
    case 'adverts/loaded':
      return action.payload;

    case 'adverts/created':
      return [...state, action.payload];

    
case 'adverts/deleted':
      return state.filter(advert => advert.id !== action.payload);
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
    case 'tags/loaded':
      return action.payload;
    default:
      return state;
  }
}
