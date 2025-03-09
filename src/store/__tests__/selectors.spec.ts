import { RootState } from '..';
import { getIsLogged } from '../selectors';

describe('getIsLogged', () => {
  //Estado inicial de state, auth es true
  const state: RootState = {
    auth: true, // Usuario autenticado
    adverts: null,
    tags: [],
    adDetail: null,
    ui: { pending: false, error: null },
  };

  test('should return true if user is logged in', () => {
    // Llamar al selector
    const result = getIsLogged(state);
    expect(result).toBe(true);
  });

  test('should return false if user is not logged in', () => {
    //Modificar el estado a false
    state.auth = false;
    // Llamar al selector
    const result = getIsLogged(state);
    expect(result).toBe(false);
  });
});
