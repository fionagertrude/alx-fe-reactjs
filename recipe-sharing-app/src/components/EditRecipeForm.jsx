import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === Number(id))
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        description: recipe.description || '',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : '',
        instructions: recipe.instructions || '',
        prepTime: recipe.prepTime || '',
        cookTime: recipe.cookTime || '',
        servings: recipe.servings || '',
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in at least title and description');
      return;
    }

    const updatedRecipe = {
      ...formData,
      ingredients: formData.ingredients.split('\n').map(item => item.trim()).filter(item => item),
      prepTime: parseInt(formData.prepTime) || 0,
      cookTime: parseInt(formData.cookTime) || 0,
      servings: parseInt(formData.servings) || 1,
    };

    updateRecipe(Number(id), updatedRecipe);
    navigate(`/recipe/${id}`);
  };

  if (!recipe) {
    return (
      <div className="edit-recipe-form">
        <h2>Recipe not found</h2>
        <Link to="/" className="back-btn">Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div className="edit-recipe-form">
      <div className="form-header">
        <Link to={`/recipe/${id}`} className="back-btn">← Back to Recipe</Link>
        <h2>Edit Recipe: {recipe.title}</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe Title"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Recipe Description"
            className="form-textarea"
            rows="3"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="prepTime">Prep Time (minutes)</label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              placeholder="15"
              className="form-input"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cookTime">Cook Time (minutes)</label>
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              placeholder="30"
              className="form-input"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              placeholder="4"
              className="form-input"
              min="1"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Ingredient 1&#10;Ingredient 2&#10;Ingredient 3"
            className="form-textarea"
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Step by step instructions..."
            className="form-textarea"
            rows="6"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(`/recipe/${id}`)} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRecipeForm;
