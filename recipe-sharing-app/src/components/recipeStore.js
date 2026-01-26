import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
      ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan cheese', 'Black pepper'],
      instructions: '1. Cook spaghetti... 2. Fry pancetta... 3. Mix eggs and cheese... 4. Combine everything...',
      prepTime: 15,
      cookTime: 15,
      servings: 4,
      category: 'Italian',
      tags: ['pasta', 'dinner', 'quick']
    },
    {
      id: 2,
      title: 'Chicken Curry',
      description: 'Aromatic chicken curry with coconut milk and spices.',
      ingredients: ['Chicken', 'Coconut milk', 'Curry powder', 'Onions', 'Garlic'],
      instructions: '1. Sauté onions and garlic... 2. Add chicken... 3. Add curry powder... 4. Add coconut milk... 5. Simmer...',
      prepTime: 20,
      cookTime: 40,
      servings: 4,
      category: 'Indian',
      tags: ['curry', 'chicken', 'dinner']
    },
    {
      id: 3,
      title: 'Vegetable Stir Fry',
      description: 'Quick and healthy vegetable stir fry with soy sauce and ginger.',
      ingredients: ['Mixed vegetables', 'Soy sauce', 'Ginger', 'Garlic', 'Sesame oil'],
      instructions: '1. Heat oil... 2. Add ginger and garlic... 3. Add vegetables... 4. Add soy sauce... 5. Serve hot.',
      prepTime: 15,
      cookTime: 10,
      servings: 2,
      category: 'Asian',
      tags: ['vegetarian', 'healthy', 'quick']
    },
    {
      id: 4,
      title: 'Beef Tacos',
      description: 'Delicious Mexican beef tacos with fresh toppings.',
      ingredients: ['Ground beef', 'Taco shells', 'Lettuce', 'Tomato', 'Cheese', 'Sour cream'],
      instructions: '1. Cook beef with taco seasoning... 2. Prepare toppings... 3. Fill taco shells... 4. Add toppings.',
      prepTime: 20,
      cookTime: 15,
      servings: 4,
      category: 'Mexican',
      tags: ['tacos', 'beef', 'dinner']
    },
    {
      id: 5,
      title: 'Greek Salad',
      description: 'Fresh Greek salad with feta cheese, olives, and olive oil dressing.',
      ingredients: ['Cucumber', 'Tomatoes', 'Red onion', 'Feta cheese', 'Olives', 'Olive oil'],
      instructions: '1. Chop vegetables... 2. Mix with feta and olives... 3. Add olive oil dressing... 4. Serve chilled.',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      category: 'Mediterranean',
      tags: ['salad', 'vegetarian', 'healthy']
    },
    {
      id: 6,
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade chocolate chip cookies.',
      ingredients: ['Flour', 'Butter', 'Sugar', 'Chocolate chips', 'Eggs', 'Vanilla extract'],
      instructions: '1. Cream butter and sugar... 2. Add eggs and vanilla... 3. Mix in flour... 4. Add chocolate chips... 5. Bake.',
      prepTime: 15,
      cookTime: 12,
      servings: 24,
      category: 'Dessert',
      tags: ['cookies', 'dessert', 'baking']
    }
  ],
  
  // Favorites feature
  favorites: [],
  
  // Recommendations feature
  recommendations: [],
  
  // Add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }],
    })),
  
  // Update an existing recipe
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),
  
  // Delete a recipe
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      favorites: state.favorites.filter(favId => favId !== id),
    })),
  
  // Add recipe to favorites
  addFavorite: (recipeId) =>
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state;
    }),
  
  // Remove recipe from favorites
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter(id => id !== recipeId),
    })),
  
  // Toggle favorite status
  toggleFavorite: (recipeId) =>
    set((state) => {
      if (state.favorites.includes(recipeId)) {
        return { favorites: state.favorites.filter(id => id !== recipeId) };
      } else {
        return { favorites: [...state.favorites, recipeId] };
      }
    }),
  
  // Check if recipe is favorited
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },
  
  // Generate personalized recommendations based on user's favorites
  generateRecommendations: () =>
    set((state) => {
      if (state.favorites.length === 0) {
        // If no favorites, show random recipes
        const shuffled = [...state.recipes].sort(() => Math.random() - 0.5);
        return { recommendations: shuffled.slice(0, 3) };
      }
      
      // Get favorite recipes details
      const favoriteRecipes = state.favorites
        .map(id => state.recipes.find(recipe => recipe.id === id))
        .filter(Boolean);
      
      // Extract categories and tags from favorites
      const favoriteCategories = favoriteRecipes.map(recipe => recipe.category);
      const favoriteTags = favoriteRecipes.flatMap(recipe => recipe.tags || []);
      
      // Score recipes based on similarity to favorites
      const scoredRecipes = state.recipes
        .filter(recipe => !state.favorites.includes(recipe.id)) // Exclude already favorited
        .map(recipe => {
          let score = 0;
          
          // Score based on category match
          if (favoriteCategories.includes(recipe.category)) {
            score += 3;
          }
          
          // Score based on tag matches
          recipe.tags?.forEach(tag => {
            if (favoriteTags.includes(tag)) {
              score += 1;
            }
          });
          
          // Add some randomness for variety
          score += Math.random();
          
          return { recipe, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 4); // Top 4 recommendations
      
      return { recommendations: scoredRecipes.map(item => item.recipe) };
    }),
  
  // Clear recommendations
  clearRecommendations: () =>
    set({ recommendations: [] }),
}));

export default useRecipeStore;