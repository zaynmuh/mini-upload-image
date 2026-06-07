function Post({ post, handleLike, handleDelete, }) {
  return (
    <div className="post-card">
      <img
        src={`http://localhost:3000${post.imageUrl}`}
        alt={post.caption}
      />

      <div className="post-content">
        <p>{post.caption}</p>
      
      <p>❤️ {post.likes} likes</p>

      <button onClick={() => handleLike(post.id)}>
        ❤️ Like
      </button>    

      <button
        onClick={() => handleDelete(post.id)}
      >
        🗑 Delete
      </button>  

        <small>
          {new Date(post.createdAt).toLocaleString()}
        </small>
      </div>
    </div>
  );
}

export default Post;