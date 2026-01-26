import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🍽️ Recipe Sharing App</h1>
          <p>Share and discover delicious recipes!</p>
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={
              <>
                <RecipeList />
                <AddRecipeForm />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>Recipe Sharing App © 2024</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;