import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient();

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "2rem" }}>
        <h1>React Query Demo</h1>

        <button onClick={() => setShowPosts(!showPosts)}>
          Toggle Posts Component
        </button>

        <hr />

        {showPosts && <PostsComponent />}
      </div>
    </QueryClientProvider>
  );
}

export default App;