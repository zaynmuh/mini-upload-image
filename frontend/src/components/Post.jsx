import { API_URL } from "../services/api";

function Post({
  post,
  handleLike,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="post-card">

      {post.imageUrl && (
        <img
          src={`${API_URL}${post.imageUrl}`}
          alt={post.caption}
        />
      )}

      <div className="post-content">

        <p>{post.caption}</p>

        <p>❤️ {post.likes} likes</p>

        <div className="post-actions">

          <button
            className="like-btn"
            onClick={() => handleLike(post.id)}
          >
            ❤️ Like
          </button>

          <button
            className="edit-btn"
            onClick={() => handleEdit(post.id)}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => handleDelete(post.id)}
          >
            🗑️ Delete
          </button>

        </div>

        <small>
          {new Date(post.createdAt).toLocaleString()}
        </small>

      </div>

    </div>
  );
}

export default Post;