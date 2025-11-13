// Function to get the recipes from the database server =========================
// Gets the recipes from the backend--the database for the recipes ==============
export const getRecipes = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}
