import { ReactNode, useState, useEffect } from 'react';
import { AuthContext } from './context';

interface Props {
  defaultIsLogged: boolean;
  children: ReactNode;
}

//Componente proveedor de contexto para gestionar el estado de autenticación de la aplicación.

export function AuthProvider({ defaultIsLogged, children }: Props) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  useEffect(() => {
    // Verificamos si existe un token en localStorage
    const token = localStorage.getItem('auth');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
