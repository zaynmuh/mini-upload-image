import { useEffect, useState } from "react";
import "./App.css";
import {
  getPosts,
  uploadPost,
  likePost,
  deletePost,
  editPost,
} from "./services/api";
import UploadForm from "./components/UploadForm";
import { API_URL } from "./services/api";
import PostModal from "./components/PostModal";

function App() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] =
    useState(null);

  async function loadPosts() {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

useEffect(() => {
  loadPosts();
}, []);

async function handleUpload(event) {
  event.preventDefault();

  if (!selectedFile) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();

  formData.append("image", selectedFile);
  formData.append("caption", caption);

  try {
    const newPost = await uploadPost(formData);

    setPosts((currentPosts) => [
      newPost,
      ...currentPosts,
    ]);

    setCaption("");
    setSelectedFile(null);
  } catch (error) {
    console.error(error);
  }
}

async function handleLike(postId) {
  try {
    await likePost(postId);

    await loadPosts();
  } catch (error) {
    console.error(error);
  }
}

async function handleDelete(postId) {
  try {
    await deletePost(postId);

    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== postId
      )
    );
  } catch (error) {
    console.error(error);
  }
}

async function handleEdit(postId) {
  const newCaption = prompt(
    "Enter new caption"
  );

  if (!newCaption) return;

  try {
    await editPost(
    postId,
    newCaption
  );

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              caption: newCaption,
            }
          : post
      )
    );
  } catch (error) {
    console.error(error);
  }
}

if (loading) {
    return (
      <div className="app-loading">
        <h2>Loading posts...</h2>
      </div>
    );
  }

  return (
    <div className="app">

      <div className="app-header">
        <h1>Mini Instagram 📸</h1>
      </div>

      <div className="profile-header">

        <img
          className="avatar"
          src="https://i.pravatar.cc/150"
          alt="Profile"
        />

        <h2>zen</h2>

        <p>
          {posts.length} posts
        </p>

      </div>

      <UploadForm
        caption={caption}
        setCaption={setCaption}
        setSelectedFile={setSelectedFile}
        handleUpload={handleUpload}
      />

      <div>
        <div className="profile-stats">
          <span>
            <strong>{posts.length}</strong> posts
          </span>

          <span>
            <strong>0</strong> followers
          </span>

          <span>
            <strong>0</strong> following
          </span>
        </div>

        {posts.length === 0 && (
          <p>No posts yet 📸</p>
        )}

        <div className="posts-grid">

          {posts.map((post) => (
            <div
              key={post.id}
              className="post-thumbnail"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={`${API_URL}${post.imageUrl}`}
                alt={post.caption}
              />
            </div>
          ))}
        </div>
      </div>

      <PostModal
        post={selectedPost}
        onClose={() =>
          setSelectedPost(null)
        }
      />
    </div>
  );
}

export default App;