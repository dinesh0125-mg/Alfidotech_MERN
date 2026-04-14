import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  return (
    <div className="page dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>
            Welcome, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p className="dashboard-subtitle">
            You&apos;re viewing a <strong>protected route</strong>.
            This page is only accessible to authenticated users.
          </p>
        </div>

        <div className="dashboard-grid">
          {/* Profile card */}
          <div className="dash-card profile-card">
            <div className="dash-card-header">
              <span className="dash-card-icon">👤</span>
              <h3>Profile Info</h3>
            </div>
            <div className="profile-details">
              <div className="profile-row">
                <span className="profile-label">Name</span>
                <span className="profile-value">{user?.name}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Email</span>
                <span className="profile-value">{user?.email}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Member since</span>
                <span className="profile-value">{joined}</span>
              </div>
            </div>
          </div>

          {/* Security info card */}
          <div className="dash-card security-card">
            <div className="dash-card-header">
              <span className="dash-card-icon">🔒</span>
              <h3>Security Status</h3>
            </div>
            <ul className="security-list">
              <li className="security-item ok">
                <span className="status-dot" /> Password hashed with bcrypt (12 rounds)
              </li>
              <li className="security-item ok">
                <span className="status-dot" /> JWT stored in httpOnly cookie
              </li>
              <li className="security-item ok">
                <span className="status-dot" /> SameSite=strict CSRF protection
              </li>
              <li className="security-item ok">
                <span className="status-dot" /> Token verified on every protected request
              </li>
            </ul>
          </div>

          {/* Token demo card */}
          <div className="dash-card token-card">
            <div className="dash-card-header">
              <span className="dash-card-icon">🍪</span>
              <h3>Cookie Demo</h3>
            </div>
            <p className="token-note">
              Your JWT is stored in an <code>httpOnly</code> cookie.
              Open <strong>DevTools → Application → Cookies</strong> to verify.
              JavaScript cannot read this cookie — that&apos;s the point!
            </p>
            <div className="token-badge">httpOnly · Secure · SameSite</div>
          </div>
        </div>

        <button className="btn btn-danger btn-lg logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
