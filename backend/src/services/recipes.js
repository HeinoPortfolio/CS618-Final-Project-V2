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
