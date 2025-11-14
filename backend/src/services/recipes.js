import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

// Create a recipe service function ===========================================
export async function createRecipe(
  userId,
  { title, ingredientList, imageURL },
) {
  const recipe = new Recipe({ title, author: userId, ingredientList, imageURL })
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
export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
}

// List all recipes by tags ===================================================
export async function listRecipesByTag(tags, options) {
  return await listRecipes({ tags }, options)
}

// Get the recipe by the recipe ID ============================================
// Will use the Mongoose feature (findById)to find the recipe by the ID =======
export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId)
}

// Update the recipe given a recipe ID ========================================
export async function updateRecipe(
  recipeId,
  userId,
  { title, ingredientList, imageURL, tags },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: { title, ingredientList, imageURL, tags } },
    { new: true },
  )
}

// Delete a post given a recipe ID ============================================
export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId })
}
