import { useState } from "react";
import PostsComponent from "./components/PostsComponent";

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Query Demo</h1>

      <button onClick={() => setShowPosts(!showPosts)}>
        Toggle Posts Component
      </button>

      <hr />

      {showPosts && <PostsComponent />}
    </div>
  );
}

export default App;