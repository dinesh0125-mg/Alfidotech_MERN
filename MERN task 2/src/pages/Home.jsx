import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  { icon: '📋', title: 'Browse Posts', desc: 'View all posts from the REST API with paginated grid layout.', link: '/posts' },
  { icon: '✍️', title: 'Create Post', desc: 'Write and submit a new post via a live API call.', link: '/posts/new' },
  { icon: '✏️', title: 'Edit Posts', desc: 'Update any post title or body with instant feedback.', link: '/posts' },
  { icon: '🗑️', title: 'Delete Posts', desc: 'Remove posts with a confirmation prompt before deletion.', link: '/posts' },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-badge">⚡ React SPA · JSONPlaceholder API</div>
        <h1 className="hero-title">
          Manage Posts<br />
          <span className="gradient-text">Effortlessly</span>
        </h1>
        <p className="hero-subtitle">
          A full-featured CRUD app built with React, React Router, and Axios.
          Explore, create, edit, and delete posts from a live REST API.
        </p>
        <div className="hero-actions">
          <Link to="/posts" className="btn-hero btn-hero-primary">Browse Posts →</Link>
          <Link to="/posts/new" className="btn-hero btn-hero-outline">+ Create Post</Link>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">What You Can Do</h2>
        <div className="features-grid">
          {features.map((f) => (
            <Link to={f.link} key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="tech-stack">
        <h2 className="section-title">Tech Stack</h2>
        <div className="tech-pills">
          {['React 18', 'React Router v7', 'Axios', 'Vite', 'JSONPlaceholder'].map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
