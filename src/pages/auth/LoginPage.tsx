import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { login } from './service-auth';
import Button from '../../components/shared/Button';
import FormField from '../../components/shared/FormField';

import { isApiClientError } from '../../api/client';

import './LoginPage.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { authLoginFulfilled, authLoginPending, authLoginRejected, uiResetError } from '../../store/actions';
import { getUi } from '../../store/selectors';


export default function LoginPage() {
  //Estados para controlar los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para el checkbox
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();
  const { pending, error } = useAppSelector(getUi);
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(authLoginPending());
      const response = await login(
        {
          email,
          password,
        },
        rememberMe,
      );

      console.log(response);
      dispatch(authLoginFulfilled());

      //Una vez logado el usuario, le enviamos al link al que habia intentado entrar (con location)
      const to = location.state?.from ?? '/';
      navigate(to, { replace: true });
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(authLoginRejected(error));
      }
    } 
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRememberMe(event.target.checked);
  };

  const isDisabled = !email || !password || pending;

  return (
    <div className="loginPage">
      <h1>Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <FormField
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
        />

        <div className="remember-me">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <Button
          type="submit"
          disabled={isDisabled}
          className="loginForm-submit"
        >
          Log in
        </Button>

        {error && (
        <div
          className="loginPage-error"
          onClick={() => dispatch(uiResetError())}
        >
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
}


