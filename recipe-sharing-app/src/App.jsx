import React, { useEffect } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import useRecipeStore from './components/recipeStore';

function App() {
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  // Initialize with some sample recipes
  useEffect(() => {
    setRecipes([
      {
        id: 1,
        title: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
      },
      {
        id: 2,
        title: 'Chicken Curry',
        description: 'Aromatic chicken curry with coconut milk and spices.',
      },
    ]);
  }, [setRecipes]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍽️ Recipe Sharing App</h1>
        <p>Share and discover delicious recipes!</p>
      </header>
      <main className="app-content">
        <RecipeList />
        <AddRecipeForm />
      </main>
    </div>
  );
}

export default App;