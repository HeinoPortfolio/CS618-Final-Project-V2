import { Recipe } from '../db/models/recipe.js'

// Create a recipe service function ===========================================
export async function createRecipe({
  title,
  author,
  ingredientList,
  imageURL,
}) {
  const recipe = new Recipe({ title, author, ingredientList, imageURL })
  return await recipe.save()
} // End create recipe

// List all the available recipes in the database =============================
//=============================================================================

// It is a helper/common function================
async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}
// List all the recipes =======================================================
// Note: List all recipes no ID is used =======================================
export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

// List recipes by an author ==================================================
export async function listRecipesByAuthor(author, options) {
  return await listRecipes({ author }, options)
}

// List all recipes by tags ===================================================
export async function listRecipesByTag(tags, options) {
  return await listRecipes({ tags }, options)
}
