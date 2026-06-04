function Post({ post }) {
  return (
    <div className="post-card">
      <img
        src={`http://localhost:3000${post.imageUrl}`}
        alt={post.caption}
      />

      <p>{post.caption}</p>

      <small>
        {new Date(post.createdAt).toLocaleString()}
      </small>
    </div>
  );
}

export default Post;