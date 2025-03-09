import { expect, test, vi } from 'vitest';
import { authLogin, authLoginFulfilled, authLoginPending, authLogoutFulfilled } from '../actions';
import { Credentials } from '../../pages/auth/types';

//Accion asincrona

describe('authLoginFulfilled', () => {
  test('should return same type of action authLoginFulfilled', () => {
    const action = {
      type: 'auth/login/fulfilled',
    };

    const result = authLoginFulfilled();

    expect(result).toEqual(action);
  });
});

//Accion sincrona

describe('authLogoutFulfilled', () =>
 test('should return the correct action object', () =>{
  const action = {
    type: 'auth/logout/fulfilled',
  };

  const result = authLogoutFulfilled();

  expect(result).toEqual(action);
 })
)




/*thunk authLogin
test('should return true when authLogin is dispatched', async () => {
  const credentialsMock: Credentials = {
    email: 'test',
    password: 'test',
  };
  const dispatch = vi.fn();
  const loginMock = vi.fn();
  const getState = vi.fn();
  const from = '/from';
  const router: any = {
    state: { location: { state: { from } } },
    navigate: vi.fn(),
  };

  dispatch.mockReturnValueOnce(authLoginPending());
  //loginMock
  dispatch.mockReturnValueOnce(authLoginFulfilled());

  const thunkMock = authLogin(credentialsMock, false);

  await thunkMock(dispatch, getState, { router });

  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(loginMock).toHaveBeenCalled();
  expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });
});*/
