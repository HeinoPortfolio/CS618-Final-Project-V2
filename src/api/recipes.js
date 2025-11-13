// Function to get the recipes from the database server =======================
// Gets the recipes from the backend--the database for the recipes ============
export const getRecipes = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
} // end getrecipes

// API function tp create recipes in the database =============================
export const createRecipe = async (recipe) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  })

  return await res.json()
}
