import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-logo">🔐</span>
          <span>SecureApp</span>
        </div>
        <div className="nav-links">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      <main className="hero">
        <div className="hero-badge">✨ JWT Authentication Demo</div>
        <h1 className="hero-title">
          Secure Authentication<br />
          <span className="gradient-text">Built the Right Way</span>
        </h1>
        <p className="hero-subtitle">
          A full-stack MERN application featuring bcrypt password hashing,
          JWT tokens stored in httpOnly cookies, and protected routes.
        </p>
        <div className="hero-actions">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">Go to Dashboard →</Link>
          ) : (
            <>
              <Link to="/signup" className="btn btn-primary btn-lg">Create Account</Link>
              <Link to="/login" className="btn btn-ghost btn-lg">Sign In</Link>
            </>
          )}
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔑</div>
            <h3>JWT Tokens</h3>
            <p>Stateless authentication with signed JSON Web Tokens, verified on every protected request.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Bcrypt Hashing</h3>
            <p>Passwords are hashed with bcrypt (salt rounds: 12) before storage. Never stored in plain text.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍪</div>
            <h3>HttpOnly Cookies</h3>
            <p>Tokens stored in httpOnly cookies — inaccessible to JavaScript, protecting against XSS attacks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Protected Routes</h3>
            <p>Both server-side middleware and client-side route guards ensure only authenticated users get access.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
