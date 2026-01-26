import { create } from 'zustand';

const useRecipeStore = create((set) => ({
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
    },
  ],
  
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
    })),
  
  // Get a specific recipe by ID
  getRecipe: (id) => {
    return useRecipeStore.getState().recipes.find((recipe) => recipe.id === id);
  },
}));

export default useRecipeStore;