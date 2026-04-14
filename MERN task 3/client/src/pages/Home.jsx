import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page home-page">
      <div className="hero">
        <div className="hero-glow" />
        <h1 className="hero-title">
          Secure <span className="gradient-text">Authentication</span> <br />
          with the MERN Stack
        </h1>
        <p className="hero-subtitle">
          Industry-grade signup &amp; login flow powered by bcrypt password hashing,
          JWT tokens stored in httpOnly cookies, and React protected routes.
        </p>

        <div className="hero-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Login
              </Link>
            </>
          )}
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔑</span>
            <h3>bcrypt Hashing</h3>
            <p>Passwords are hashed with a cost factor of 12 — never stored in plaintext.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🍪</span>
            <h3>httpOnly Cookies</h3>
            <p>JWTs are stored in httpOnly cookies — immune to XSS attacks.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>Protected Routes</h3>
            <p>Both server-side middleware and client-side route guards keep data safe.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
