import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === Number(id))
  );

  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h2>Recipe not found</h2>
        <Link to="/" className="back-btn">Back to Recipes</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipe.id);
      navigate('/');
    }
  };

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <Link to="/" className="back-btn">← Back to Recipes</Link>
        <div className="recipe-actions">
          <Link to={`/edit/${recipe.id}`} className="edit-btn">Edit Recipe</Link>
          <button onClick={handleDelete} className="delete-btn">Delete Recipe</button>
        </div>
      </div>
      
      <div className="recipe-content">
        <h1>{recipe.title}</h1>
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
        </div>

        <div className="recipe-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
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