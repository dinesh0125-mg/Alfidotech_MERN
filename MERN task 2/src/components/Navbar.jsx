import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">⚡</span>
        <span className="brand-text">PostSphere</span>
      </Link>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/posts" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Posts
        </NavLink>
        <NavLink to="/posts/new" className={({ isActive }) => isActive ? 'nav-link nav-cta active' : 'nav-link nav-cta'}>
          + New Post
        </NavLink>
      </div>
    </nav>
  );
}
