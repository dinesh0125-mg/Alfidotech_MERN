import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, updatePost } from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner';
import './PostForm.css';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPost(id);
        setForm({ title: res.data.title, body: res.data.body });
      } catch (err) {
        setError(err.message || 'Could not load post for editing.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

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
      await updatePost(id, form);
      setSuccess(true);
      setTimeout(() => navigate(`/posts/${id}`), 1800);
    } catch (err) {
      setError(err.message || 'Failed to update post.');
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading post for editing…" />;

  return (
    <div className="form-page">
      <Link to={`/posts/${id}`} className="back-link">← Back to Post</Link>
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">✏️ Edit Post #{id}</h1>
          <p className="form-subtitle">Make changes below and save to update via API.</p>
        </div>

        {success && (
          <div className="form-success">✅ Post updated successfully! Redirecting…</div>
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
              rows={7}
              value={form.body}
              onChange={handleChange}
              disabled={submitting || success}
            />
          </div>

          <div className="form-actions">
            <Link to={`/posts/${id}`} className="btn btn-ghost">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={submitting || success}>
              {submitting ? '⏳ Saving…' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
