import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, getComments, deletePost } from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './PostDetail.css';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [postRes, commentsRes] = await Promise.all([getPost(id), getComments(id)]);
      setPost(postRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch post.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setDeleting(true);
    try {
      await deletePost(id);
      navigate('/posts');
    } catch {
      alert('Failed to delete the post.');
      setDeleting(false);
    }
  };

  return (
    <div className="post-detail-page">
      <Link to="/posts" className="back-link">← Back to Posts</Link>

      {loading && <LoadingSpinner message="Loading post…" />}
      {error && <ErrorMessage message={error} onRetry={fetchData} />}

      {!loading && !error && post && (
        <>
          <article className="post-detail-card">
            <div className="post-detail-meta">
              <span className="post-detail-id">Post #{post.id}</span>
              <span className="post-detail-user">User {post.userId}</span>
            </div>
            <h1 className="post-detail-title">{post.title}</h1>
            <p className="post-detail-body">{post.body}</p>
            <div className="post-detail-actions">
              <Link to={`/posts/${id}/edit`} className="btn btn-secondary">✏️ Edit Post</Link>
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : '🗑️ Delete Post'}
              </button>
            </div>
          </article>

          <section className="comments-section">
            <h2 className="comments-title">💬 Comments ({comments.length})</h2>
            <div className="comments-list">
              {comments.map((c) => (
                <div key={c.id} className="comment-card">
                  <div className="comment-header">
                    <strong className="comment-name">{c.name}</strong>
                    <span className="comment-email">{c.email}</span>
                  </div>
                  <p className="comment-body">{c.body}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
