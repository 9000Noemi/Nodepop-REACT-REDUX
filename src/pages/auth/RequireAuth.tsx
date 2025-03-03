import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { getIsLogged } from '../../store/selectors';

//Restringir el acceso a ciertas páginas de la aplicación solo a usuarios autenticados

function RequireAuth({ children }: { children: ReactNode }) {
  const isLogged = useAppSelector(getIsLogged);
  const location = useLocation();

  return isLogged ? (
    children
  ) : (
    //Si el usuario no está autenticado, lo redirige a la página de login o en la que intento entrar (con location)
    //Replace para que cuando pulse atrás <-- no vuelva a login.
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default RequireAuth;
