import AuthButton from '../../pages/auth/AuthButton';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        {/*Usamos Navlink para que se quede marcado el titulo donde estamos*/}
        <NavLink
          to="/adverts/new"
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          New Advert
        </NavLink>

        <NavLink
          to="/adverts"
          className={({ isActive }) => (isActive ? 'selected' : '')}
          end
        >
          Adverts List
        </NavLink>
        <AuthButton />
      </nav>
    </header>
  );
}
