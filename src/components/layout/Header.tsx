import { logout } from '../../pages/auth/service-auth';
import Button from '../shared/Button';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';

interface Props {
  onLogout: () => void;
}

export default function Header({ onLogout }: Props) {
  const handleLogoutClick = async () => {
    await logout();
    onLogout(); //HACER NAVIGATE PARA VOLVER AL LOGIN
  };
  return (
    <header className="header">
      <nav className="header-nav">
        <Button onClick={handleLogoutClick}>Logout</Button>
        <NavLink
          to="/adverts/new"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          New Advert
        </NavLink>
        <NavLink
          to="/adverts"
          className={({ isActive }) => (isActive ? 'selected' : '')}
          // style={({ isActive }) => (isActive ? { color: "red" } : {})}
          end
        >
          Latest Tweet
        </NavLink>
      </nav>
    </header>
  );
}
