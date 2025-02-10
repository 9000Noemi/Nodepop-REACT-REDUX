import { useState } from 'react';
import AdvertsPage from './pages/adverts/AdvertsPage';
import LoginPage from './pages/auth/LoginPage';


interface Props {
  defaultIsLogged: boolean;
}


function App({ defaultIsLogged }: Props) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return isLogged ? (
    <AdvertsPage onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}

export default App;
