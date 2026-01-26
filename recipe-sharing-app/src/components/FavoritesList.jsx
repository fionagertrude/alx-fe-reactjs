import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

function FavoritesList() {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  
  // Get favorite recipes
  const favoriteRecipes = favorites
    .map(id => recipes.find(recipe => recipe.id === id))
    .filter(Boolean);

  const handleRemoveFavorite = (recipeId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-list">
        <h2>⭐ My Favorites</h2>
        <div className="empty-state">
          <p>No favorite recipes yet.</p>
          <p>Click the ❤️ button on any recipe to add it to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <div className="section-header">
        <h2>⭐ My Favorites ({favoriteRecipes.length})</h2>
      </div>
      
      <div className="favorites-grid">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="favorite-card">
            <div className="favorite-header">
              <h3>
                <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                  {recipe.title}
                </Link>
              </h3>
              <button
                onClick={(e) => handleRemoveFavorite(recipe.id, e)}
                className="favorite-btn active"
                title="Remove from favorites"
              >
                ❤️
              </button>
            </div>
            <p className="recipe-description">{recipe.description}</p>
            
            <div className="recipe-meta-small">
              <span className="meta-badge">{recipe.category}</span>
              <span className="meta-badge">⏱️ {recipe.prepTime + recipe.cookTime} min</span>
              <span className="meta-badge">👨‍👩‍👧‍👦 {recipe.servings} servings</span>
            </div>
            
            <div className="recipe-tags">
              {recipe.tags?.slice(0, 3).map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            
            <Link to={`/recipe/${recipe.id}`} className="view-details-btn">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;