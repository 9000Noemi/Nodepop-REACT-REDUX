import { useState } from 'react';
import { login } from './service-auth';
import Button from '../../components/shared/Button';
import FormField from '../../components/shared/FormField';
import { useAuth } from './context';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });
      console.log(response);
      onLogin();
      const to = location.state?.from ?? '/';
      navigate(to, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const isDisabled = !email || !password;

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
        <Button
          type="submit"
          disabled={isDisabled}
          className="loginForm-submit"
        >
          Log in
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
