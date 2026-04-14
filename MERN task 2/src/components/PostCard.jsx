import { Link, useNavigate } from 'react-router-dom';
import { deletePost } from '../api/client';
import './PostCard.css';

export default function PostCard({ post, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Delete post #${post.id}?`)) return;
    try {
      await deletePost(post.id);
      if (onDelete) onDelete(post.id);
    } catch {
      alert('Failed to delete post. Please try again.');
    }
  };

  const snippet = post.body.length > 100 ? post.body.slice(0, 100) + '…' : post.body;

  return (
    <article className="post-card" onClick={() => navigate(`/posts/${post.id}`)}>
      <div className="post-card-id">#{post.id}</div>
      <h3 className="post-card-title">{post.title}</h3>
      <p className="post-card-body">{snippet}</p>
      <div className="post-card-actions" onClick={(e) => e.stopPropagation()}>
        <Link to={`/posts/${post.id}`} className="btn btn-ghost">View</Link>
        <Link to={`/posts/${post.id}/edit`} className="btn btn-secondary">Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </article>
  );
}
