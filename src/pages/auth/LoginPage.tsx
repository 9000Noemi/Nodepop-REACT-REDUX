import { useState } from 'react';
import { login } from './service-auth';
import Button from '../../components/shared/Button';

interface Props {
  onLogin: (message: string) => void;
}

function LoginPage({ onLogin }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try{
        const response = await login({
        email,
        password
        });
        console.log(response);
        onLogin("Hello");

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
    <div>
      <h1>Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="text" 
            name="email"
            value = { email }
            onChange= {handleEmailChange}
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            name="password" 
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <Button 
          type="submit"
          disabled= { isDisabled }>
            Log in
          </Button>
      </form>
      
    </div>
  );
}

export default LoginPage;
