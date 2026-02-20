import { TodoList } from "./components/TodoList"; // ✅ Must include this exact import

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Todo App</h1>
      <TodoList /> {/* ✅ Must render TodoList component */}
    </div>
  );
}

export default App;