function Post({ post }) {
  return (
    <div className="post-card">
      <img
        src={`http://localhost:3000${post.imageUrl}`}
        alt={post.caption}
      />

      <div className="post-content">
        <p>{post.caption}</p>

        <small>
          {new Date(post.createdAt).toLocaleString()}
        </small>
      </div>
    </div>
  );
}

export default Post;