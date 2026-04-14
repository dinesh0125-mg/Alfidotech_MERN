import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      /* ignore */
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span className="brand-icon">🔐</span> MERN Auth
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
