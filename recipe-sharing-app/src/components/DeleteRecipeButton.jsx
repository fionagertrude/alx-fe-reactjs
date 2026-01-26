import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

function DeleteRecipeButton({ recipeId, recipeTitle, onDelete }) {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipeTitle}"?`)) {
      deleteRecipe(recipeId);
      if (onDelete) {
        onDelete();
      } else {
        navigate('/');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      Delete Recipe
    </button>
  );
}

export default DeleteRecipeButton;