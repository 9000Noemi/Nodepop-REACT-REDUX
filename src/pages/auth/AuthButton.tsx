import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { useAuth } from '../../pages/auth/context';
import { logout } from '../../pages/auth/service-auth';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';

/*Componente que se encarga de mostrar un botón para el login o el logout 
dependiendo de si el usuario está autenticado o no. 
Además, al hacer clic en el botón de logout, se muestra un diálogo de confirmación*/

export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();
  // Estado para mostrar el mensaje de confirmacion
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Estado para manejar el estado de carga (si es necesario)
  const [loading, setLoading] = useState(false);

  // Función para manejar el clic en el botón de logout
  const handleLogoutClick = () => {
    setShowConfirmation(true); // Muestra el mensaje confirmación
  };

  // Función que se llama cuando el usuario confirma el logout
  const handleConfirmLogout = async () => {
    setLoading(true); // Activar el estado de carga
    await logout(); // Llamada a la función de logout
    onLogout(); // Actualiza el estado de autenticación
    setLoading(false); // Desactivar el estado de carga
    setShowConfirmation(false); // Cierra el mensaje de confirmación
  };

  // Función que se llama cuando el usuario cancela el logout
  const handleCancelLogout = () => {
    setShowConfirmation(false); // Cierra el mensaje sin hacer nada
  };

  return (
    <>
      {isLogged ? (
        <>
          <Button onClick={handleLogoutClick} variant="secondary">
            Logout
          </Button>

          {/* Mostrar el mensaje de confirmación */}
          {showConfirmation && (
            <ConfirmationDialog
              message="Are you sure you want to logout?"
              onConfirm={handleConfirmLogout}
              onCancel={handleCancelLogout}
              loading={loading}
            />
          )}
        </>
      ) : (
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>
      )}
    </>
  );
}
