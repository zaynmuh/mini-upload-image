import { useEffect, useState } from "react";
import Post from "./components/Post";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  async function loadPosts() {
    try {
      const response = await fetch(
        "http://localhost:3000/images"
    );

    const data = await response.json();

    setPosts(data);
  } catch (error) {
    console.error(error);
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
    const response = await fetch(
      "http://localhost:3000/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const newPost = await response.json();

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
    await fetch(
      `http://localhost:3000/like/${postId}`,
      {
        method: "POST",
      }
    );

    loadPosts();
  } catch (error) {
    console.error(error);
  }
}

async function handleDelete(postId) {
  try {
    await fetch(
      `http://localhost:3000/posts/${postId}`,
      {
        method: "DELETE",
      }
    );

    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== postId
      )
    );
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="app">
      <h1>Mini Instagram 📸</h1>

      <form
        className="upload-form"
        onSubmit={handleUpload}
      >

        <input
          type="file"
          onChange={(event) =>
            setSelectedFile(event.target.files[0])
          }
        />


        <input
          type="text"
          placeholder="Write caption..."
          value={caption}
          onChange={(event) =>
            setCaption(event.target.value)
          }
        />

        <button type="submit">
          Upload Post
        </button>
      </form>

      <div>
         <p>Total posts: {posts.length}</p>

        {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
        ))}
      </div>
    </div>
  );
}

export default App;