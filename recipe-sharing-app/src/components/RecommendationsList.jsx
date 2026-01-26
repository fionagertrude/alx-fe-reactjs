import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

function RecommendationsList() {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);

  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  const handleRefresh = () => {
    generateRecommendations();
  };

  const handleToggleFavorite = (recipeId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <div className="section-header">
          <h2>✨ Personalized Recommendations</h2>
          <button onClick={handleRefresh} className="refresh-btn">🔄 Refresh</button>
        </div>
        <div className="empty-state">
          <p>Generating recommendations based on your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-list">
      <div className="section-header">
        <h2>✨ Personalized Recommendations</h2>
        <div className="header-actions">
          <button onClick={handleRefresh} className="refresh-btn" title="Get new recommendations">
            🔄 Refresh
          </button>
          <span className="recommendation-note">
            Based on {favorites.length === 0 ? 'popular recipes' : 'your favorites'}
          </span>
        </div>
      </div>
      
      <div className="recommendations-grid">
        {recommendations.map((recipe) => {
          const favorited = isFavorite(recipe.id);
          
          return (
            <div key={recipe.id} className="recommendation-card">
              <div className="recommendation-header">
                <div className="recommendation-badge">🔥 Recommended</div>
                <button
                  onClick={(e) => handleToggleFavorite(recipe.id, e)}
                  className={`favorite-btn ${favorited ? 'active' : ''}`}
                  title={favorited ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorited ? '❤️' : '🤍'}
                </button>
              </div>
              
              <h3>
                <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                  {recipe.title}
                </Link>
              </h3>
              
              <p className="recipe-description">{recipe.description}</p>
              
              <div className="recommendation-meta">
                <div className="meta-row">
                  <span className="meta-category">{recipe.category}</span>
                  <span className="meta-time">⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                </div>
                
                <div className="recipe-tags">
                  {recipe.tags?.slice(0, 4).map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="recommendation-footer">
                <Link to={`/recipe/${recipe.id}`} className="try-recipe-btn">
                  Try This Recipe →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="recommendation-info">
        <p className="info-text">
          <strong>How recommendations work:</strong> 
          {favorites.length === 0 
            ? ' We show popular recipes. Add recipes to your favorites to get personalized recommendations!' 
            : ' Recommendations are based on the categories and tags of your favorite recipes.'}
        </p>
      </div>
    </div>
  );
}

export default RecommendationsList;