import { expect, test, vi } from 'vitest';
import {
  authLogin,
  authLoginFulfilled,
  authLoginPending,
  authLogoutFulfilled,
} from '../actions';
import { Credentials } from '../../pages/auth/types';

describe('authLoginFulfilled', () => {
  test('should return same type of action authLoginFulfilled', () => {
    const action = {
      type: 'auth/login/fulfilled',
    };

    const result = authLoginFulfilled();

    expect(result).toEqual(action);
  });
});

describe('authLogoutFulfilled', () => {
  test('should return the correct action object', () => {
    const action = {
      type: 'auth/logout/fulfilled',
    };

    const result = authLogoutFulfilled();

    expect(result).toEqual(action);
  });
});

/* PRUEBAS TEST DE UN THUNK, NO FUNCIONA

describe('authLogin', () => {
  test('should dispatch authLoginPending and authLoginFulfilled actions and navigate to correct route', async () => {
    const credentialsMock: Credentials = {
      email: 'test@test.com',
      password: 'test123',
    };
    
    const dispatch = vi.fn();
    const getState = vi.fn();
    
    // Mock de router 
    const from = '/from';
    const router: any = {
      state: { location: { state: { from } } },
      navigate: vi.fn(),
    };

    // Mock de las acciones que el thunk debería despachar
    const authLoginPending = vi.fn();
    const authLoginFulfilled = vi.fn();

    // Simular que el dispatch primero llama authLoginPending y luego authLoginFulfilled
    dispatch.mockReturnValueOnce(authLoginPending());
    dispatch.mockReturnValueOnce(authLoginFulfilled());

     // Mock de la función `login` que hace la llamada a la API
     const loginMock = vi.fn().mockResolvedValueOnce(true);

     // Reemplazar `login` por el mock
    vi.mock('src/pages/auth/service-auth', () => ({
      login: loginMock,
    }));

    // Crear el thunk para probar authLogin
    const thunkMock = authLogin(credentialsMock, false);  

    // Ejecutar el thunk (debería llamar a dispatch con las acciones)
    await thunkMock(dispatch, getState, { router });

    // Verificar que dispatch haya sido llamado correctamente
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(authLoginPending());  
    expect(dispatch).toHaveBeenCalledWith(authLoginFulfilled());  
    
    // Verificar que el router navegue correctamente
    expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });

    // Verificar que login haya sido llamado
    expect(loginMock).toHaveBeenCalledWith(credentialsMock, false);
  });
});*/
