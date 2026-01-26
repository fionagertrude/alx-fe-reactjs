import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton'; // Import the component

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p className="no-recipes">No recipes yet. Add one below!</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-card-content">
                <h3>
                  <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                    {recipe.title}
                  </Link>
                </h3>
                <p>{recipe.description}</p>
                
                <div className="recipe-card-meta">
                  <span className="meta-badge">⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                  <span className="meta-badge">👨‍👩‍👧‍👦 {recipe.servings} servings</span>
                </div>
              </div>
              
              <div className="recipe-card-actions">
                <Link to={`/recipe/${recipe.id}`} className="view-btn">View</Link>
                <Link to={`/edit/${recipe.id}`} className="edit-btn">Edit</Link>
                {/* Use the DeleteRecipeButton component */}
                <DeleteRecipeButton recipeId={recipe.id} recipeTitle={recipe.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;