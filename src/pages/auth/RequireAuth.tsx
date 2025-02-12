import type { ReactNode } from 'react';
import { useAuth } from './context';
import { Navigate, useLocation } from 'react-router-dom';

//Restringir el acceso a ciertas páginas de la aplicación solo a usuarios autenticados

function RequireAuth({ children }: { children: ReactNode }) {
  const { isLogged } = useAuth();
  const location = useLocation();
  console.log('aquiii', children);

  return isLogged ? (
    children
  ) : (
    //Si el usuario no está autenticado, lo redirige a la página de login
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default RequireAuth;
