import { API_URL } from "../services/api";

function PostModal({
  post,
  onClose,
}) {
  if (!post) return null;

  return (
    <div className="modal-overlay">
        <div className="modal-content">

        <button
            className="close-btn"
            onClick={onClose}
        >
            ✖
        </button>

        <div className="modal-image">

            <img
            src={`${API_URL}${post.imageUrl}`}
            alt={post.caption}
            />

        </div>

        <div className="modal-info">

            <h3>{post.caption}</h3>

            <p>
            ❤️ {post.likes} likes
            </p>

            <small>
            {new Date(post.createdAt)
                .toLocaleString()}
            </small>

        </div>
    </div>

    </div>
  );
}

export default PostModal;