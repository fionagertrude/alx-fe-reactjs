import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🍽️ Recipe Sharing App</h1>
          <p>Share and discover delicious recipes!</p>
          <nav className="main-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              My Favorites
            </NavLink>
            <NavLink to="/recommendations" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Recommendations
            </NavLink>
            <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Add Recipe
            </NavLink>
          </nav>
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={
              <>
                <RecommendationsList />
                <RecipeList />
              </>
            } />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/recommendations" element={<RecommendationsList />} />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>Recipe Sharing App © 2024 | Features: Recipe Sharing, Favorites, Personalized Recommendations</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;