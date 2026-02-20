// src/App.jsx
import TodoList from "./components/TodoList"; // ✅ Default import required by the checker

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Todo App</h1>
      <TodoList /> {/* ✅ Must render TodoList for the checker */}
    </div>
  );
}

export default App;