import { useState } from 'react';

import Button from '../../components/shared/Button';
import FormField from '../../components/shared/FormField';

import { useAppDispatch, useAppSelector } from '../../store';
import { authLogin, uiResetError } from '../../store/actions';
import { getUi } from '../../store/selectors';

import './LoginPage.css';


export default function LoginPage() {
  
  //Estados para controlar los inputs
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Estado para el checkbox
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();
  const { pending, error } = useAppSelector(getUi);

  // Manejadores de cambio de los inputs

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, email: event.target.value }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, password: event.target.value }));
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRememberMe(event.target.checked);
  };

  //Envío del formulario

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Despachar la acción para manejar el login
     dispatch(authLogin(credentials,rememberMe));

  };

  const isDisabled = !credentials.email || !credentials.password || pending;

  return (
    <div className="loginPage">
      <h1>Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="Email"
          value={credentials.email}
          onChange={handleEmailChange}
        />
        <FormField
          type="password"
          name="password"
          label="Password"
          value={credentials.password}
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


