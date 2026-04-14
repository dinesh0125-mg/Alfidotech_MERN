import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../api/client';
import './PostForm.css';

export default function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', body: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) {
      setError('Both title and body are required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createPost({ ...form, userId: 1 });
      setSuccess(true);
      setTimeout(() => navigate('/posts'), 1800);
    } catch (err) {
      setError(err.message || 'Failed to create post.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <Link to="/posts" className="back-link">← Back to Posts</Link>
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">✍️ Create New Post</h1>
          <p className="form-subtitle">Fill in the details and hit submit to create your post via API.</p>
        </div>

        {success && (
          <div className="form-success">
            ✅ Post created successfully! Redirecting to posts…
          </div>
        )}

        {error && <div className="form-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Post Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-input"
              placeholder="Enter a descriptive title…"
              value={form.title}
              onChange={handleChange}
              disabled={submitting || success}
              maxLength={150}
            />
            <span className="char-count">{form.title.length}/150</span>
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">Post Body</label>
            <textarea
              id="body"
              name="body"
              className="form-textarea"
              placeholder="Write your post content here…"
              rows={7}
              value={form.body}
              onChange={handleChange}
              disabled={submitting || success}
            />
          </div>

          <div className="form-actions">
            <Link to="/posts" className="btn btn-ghost">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={submitting || success}>
              {submitting ? '⏳ Creating…' : '🚀 Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
