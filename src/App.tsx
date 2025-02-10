import { useState } from 'react';
import AdvertsPage from './pages/adverts/AdvertsPage';
import LoginPage from './pages/auth/LoginPage';

function App() {
  const [isLogged, setIsLogged] = useState(false);

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
