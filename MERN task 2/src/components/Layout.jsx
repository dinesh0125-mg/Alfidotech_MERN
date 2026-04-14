import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>© 2026 PostSphere — Built with React &amp; JSONPlaceholder API</p>
      </footer>
    </div>
  );
}
