import { auth } from '../reducers';

describe('auth reducer', () => {
  test('should handle "auth/login/fulfilled" action', () => {
    // Verifica que cuando se recibe la acción "auth/login/fulfilled" el estado de auth se establece a true.
    const result = auth(false, { type: 'auth/login/fulfilled' });
    expect(result).toBe(true);
  });

  test('should handle "auth/logout/fulfilled" action', () => {
    // Verifica que cuando se recibe la acción "auth/login/fulfilled" el estado de auth se establece a false
    const result = auth(true, { type: 'auth/logout/fulfilled' });
    expect(result).toBe(false);
  });
});
