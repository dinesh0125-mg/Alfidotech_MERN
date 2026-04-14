import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitial = (name) => name?.charAt(0).toUpperCase() || '?';

  return (
    <div className="dashboard-page">
      <nav className="dash-nav">
        <div className="nav-brand">
          <span className="nav-logo">🔐</span>
          <span>SecureApp</span>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost btn-sm">
          Logout →
        </button>
      </nav>

      <main className="dash-main">
        <div className="dash-header">
          <div className="user-avatar">{getInitial(user?.name)}</div>
          <div>
            <h1>Welcome back, <span className="gradient-text">{user?.name}</span>!</h1>
            <p className="dash-subtitle">You are now viewing a protected page ✅</p>
          </div>
        </div>

        <div className="dash-grid">
          {/* Auth Status Card */}
          <div className="dash-card status-card">
            <h2>🔑 Auth Status</h2>
            <div className="status-badge active">Authenticated</div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{user?.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user?.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Token Storage</span>
                <span className="info-value badge-green">httpOnly Cookie</span>
              </div>
            </div>
          </div>

          {/* Profile API Card */}
          <div className="dash-card profile-card">
            <h2>📡 Protected API Response</h2>
            <p className="card-desc">GET /api/user/profile — verified by JWT middleware</p>
            {profileLoading ? (
              <div className="skeleton-loader">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
              </div>
            ) : profile ? (
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">User ID</span>
                  <span className="info-value code">{profile.user?._id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Account Age</span>
                  <span className="info-value">{profile.accountAge}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Login Time</span>
                  <span className="info-value">{new Date(profile.loginTime).toLocaleTimeString()}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value badge-green">{profile.message}</span>
                </div>
              </div>
            ) : (
              <div className="alert alert-error">Failed to fetch profile data.</div>
            )}
          </div>

          {/* Security Info Card */}
          <div className="dash-card security-card">
            <h2>🛡️ Security Details</h2>
            <div className="security-list">
              <div className="security-item">
                <span className="check">✅</span>
                <div>
                  <strong>Password Hashed</strong>
                  <p>bcrypt with salt rounds: 12</p>
                </div>
              </div>
              <div className="security-item">
                <span className="check">✅</span>
                <div>
                  <strong>JWT in httpOnly Cookie</strong>
                  <p>Not accessible via JavaScript</p>
                </div>
              </div>
              <div className="security-item">
                <span className="check">✅</span>
                <div>
                  <strong>SameSite: Strict</strong>
                  <p>CSRF protection enabled</p>
                </div>
              </div>
              <div className="security-item">
                <span className="check">✅</span>
                <div>
                  <strong>Token Expiry: 7 days</strong>
                  <p>Auto-logout after expiration</p>
                </div>
              </div>
            </div>
          </div>

          {/* JWT Flow Card */}
          <div className="dash-card flow-card">
            <h2>🔄 JWT Auth Flow</h2>
            <div className="flow-steps">
              <div className="flow-step">
                <div className="step-num">1</div>
                <p>User signs up / logs in with credentials</p>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <div className="step-num">2</div>
                <p>Server verifies, generates JWT, sets httpOnly cookie</p>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <div className="step-num">3</div>
                <p>Browser sends cookie automatically on every request</p>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <div className="step-num">4</div>
                <p>Middleware verifies JWT — grants or denies access</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
