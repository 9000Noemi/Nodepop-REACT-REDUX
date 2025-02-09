import { login } from './service-auth';

function LoginPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = login({
      email: event.target.email.value,
      password: event.target.password.value,
    });
    console.log(response);
  };

  return (
    <div>
      <h1>Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </form>
      <button type="submit">Log in</button>
    </div>
  );
}

export default LoginPage;
