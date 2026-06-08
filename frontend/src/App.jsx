import { useEffect, useState } from "react";
import Post from "./components/Post";
import "./App.css";
import {
  getPosts,
  uploadPost,
  likePost,
  deletePost,
  editPost,
} from "./services/api";
import UploadForm from "./components/UploadForm";

function App() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

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

    loadPosts();
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

      <UploadForm
        caption={caption}
        setCaption={setCaption}
        setSelectedFile={setSelectedFile}
        handleUpload={handleUpload}
      />

      <div>
        <p>Total posts: {posts.length}</p>

        {posts.length === 0 && (
          <p>No posts yet 📸</p>
        )}

        {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          handleLike={handleLike}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        ))}
      </div>
    </div>
  );
}

export default App;