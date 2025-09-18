import { Outlet, NavLink } from "react-router"; // Changed Link to NavLink
import ProfileIcon from './ProfileIcon';
import { logout } from '../utils/auth';

function DefaultLayout() {
  return (
    <main className="layout">
      <nav className="sidebar">
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>       
        <button onClick={logout}>Logout</button>
      </nav>
      <header>
        <ProfileIcon />
      </header>
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
}

export default DefaultLayout;