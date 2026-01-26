import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === Number(id))
  );
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h2>Recipe not found</h2>
        <Link to="/" className="back-btn">Back to Recipes</Link>
      </div>
    );
  }

  const favorited = isFavorite(recipe.id);

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <Link to="/" className="back-btn">← Back to Recipes</Link>
        <div className="recipe-actions">
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className={`favorite-btn-large ${favorited ? 'active' : ''}`}
          >
            {favorited ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
          <Link to={`/edit/${recipe.id}`} className="edit-btn">Edit Recipe</Link>
          <DeleteRecipeButton recipeId={recipe.id} recipeTitle={recipe.title} />
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-title-section">
          <h1>{recipe.title}</h1>
          <div className="recipe-categories">
            <span className="category-badge">{recipe.category}</span>
            {favorited && <span className="favorite-badge">⭐ Favorite</span>}
          </div>
        </div>
        
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-label">Prep Time:</span>
            <span className="meta-value">{recipe.prepTime} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Cook Time:</span>
            <span className="meta-value">{recipe.cookTime} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Servings:</span>
            <span className="meta-value">{recipe.servings}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Total Time:</span>
            <span className="meta-value">{recipe.prepTime + recipe.cookTime} minutes</span>
          </div>
        </div>

        <div className="recipe-tags-section">
          <h3>Tags</h3>
          <div className="tags-container">
            {recipe.tags?.map((tag, index) => (
              <span key={index} className="tag-large">{tag}</span>
            ))}
          </div>
        </div>

        <div className="recipe-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className="ingredient-checkbox">□</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h2>Instructions</h2>
          <div className="instructions">
            {recipe.instructions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;