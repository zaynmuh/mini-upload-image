import { useEffect, useState } from "react";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  async function loadPosts() {
    try {
      const response = await fetch("http://localhost:3000/images");

      const data = await response.json();

      console.log(data);

      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  loadPosts();
}, []);

  return (
    <div>
      <h1>Mini Instagram 📸</h1>

      <div>
         <p>Total posts: {posts.length}</p>

        {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
        />
        ))}
      </div>
    </div>
  );
}

export default App;