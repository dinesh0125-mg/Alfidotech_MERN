import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api/client';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './PostsList.css';

const PAGE_SIZE = 12;

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = (id) => setPosts((prev) => prev.filter((p) => p.id !== id));

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="posts-list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Posts</h1>
          <p className="page-subtitle">{filtered.length} posts from JSONPlaceholder API</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/posts/new')}>+ New Post</button>
      </div>

      <div className="search-bar-wrapper">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search posts by title or body…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      {loading && <LoadingSpinner message="Fetching posts from API…" />}
      {error && <ErrorMessage message={error} onRetry={fetchPosts} />}

      {!loading && !error && (
        <>
          {paginated.length === 0 ? (
            <div className="empty-state">
              <span>😶‍🌫️</span>
              <p>No posts match your search.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {paginated.map((post) => (
                <PostCard key={post.id} post={post} onDelete={handleDelete} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >← Prev</button>
              <span className="page-info">Page {page} of {totalPages}</span>
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
