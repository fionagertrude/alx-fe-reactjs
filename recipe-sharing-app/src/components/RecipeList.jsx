import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);

  const handleToggleFavorite = (recipeId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <p className="no-recipes">No recipes yet. Add one below!</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => {
            const favorited = isFavorite(recipe.id);
            
            return (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-card-header">
                  <span className="recipe-category">{recipe.category}</span>
                  <button
                    onClick={(e) => handleToggleFavorite(recipe.id, e)}
                    className={`favorite-btn ${favorited ? 'active' : ''}`}
                    title={favorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    {favorited ? '❤️' : '🤍'}
                  </button>
                </div>
                
                <div className="recipe-card-content">
                  <h3>
                    <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                      {recipe.title}
                    </Link>
                  </h3>
                  <p className="recipe-description">{recipe.description}</p>
                  
                  <div className="recipe-card-meta">
                    <span className="meta-badge">⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                    <span className="meta-badge">👨‍👩‍👧‍👦 {recipe.servings} servings</span>
                  </div>
                  
                  <div className="recipe-tags">
                    {recipe.tags?.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="recipe-card-actions">
                  <Link to={`/recipe/${recipe.id}`} className="view-btn">View</Link>
                  <Link to={`/edit/${recipe.id}`} className="edit-btn">Edit</Link>
                  <DeleteRecipeButton recipeId={recipe.id} recipeTitle={recipe.title} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecipeList;