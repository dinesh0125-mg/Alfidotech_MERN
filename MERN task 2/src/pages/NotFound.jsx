import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-text">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">← Go Home</Link>
    </div>
  );
}
