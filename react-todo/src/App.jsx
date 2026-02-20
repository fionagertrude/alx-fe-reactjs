import TodoList from "./components/TodoList"; // default export, no curly braces

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Todo App</h1>
      <TodoList /> {/* render component */}
    </div>
  );
}

export default App;