import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { useAuth } from '../../pages/auth/context';
import { logout } from '../../pages/auth/service-auth';

export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return isLogged ? (
    <Button onClick={handleLogoutClick} variant="secondary">
      Logout
    </Button>
  ) : (
    <Link to={'/login'}>
      <Button variant="primary">Login</Button>
    </Link>
  );
}
