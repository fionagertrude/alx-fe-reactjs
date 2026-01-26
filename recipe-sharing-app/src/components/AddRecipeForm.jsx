import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

function AddRecipeForm() {
  const navigate = useNavigate();
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    category: '',
    tags: '',
  });

  const categories = ['Italian', 'Indian', 'Asian', 'Mexican', 'Mediterranean', 'Dessert', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    const newRecipe = {
      ...formData,
      ingredients: formData.ingredients.split('\n').map(item => item.trim()).filter(item => item),
      prepTime: parseInt(formData.prepTime) || 0,
      cookTime: parseInt(formData.cookTime) || 0,
      servings: parseInt(formData.servings) || 1,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    addRecipe(newRecipe);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      category: '',
      tags: '',
    });
    
    alert('Recipe added successfully!');
    navigate('/');
  };

  return (
    <div className="add-recipe-form">
      <h2>Add New Recipe</h2>
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
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

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
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="pasta, dinner, quick, italian"
            className="form-input"
          />
          <small className="form-help">Separate tags with commas</small>
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
          <button type="button" onClick={() => navigate('/')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipeForm;