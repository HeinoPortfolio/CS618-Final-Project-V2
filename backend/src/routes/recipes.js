import {
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByTag,
  // createRecipe,
  getRecipeById,
} from '../services/recipes.js'

// Function to send the routes for the recipes ============
export function recipesRoutes(app) {
  app.get('/api/v1/recipes', async (req, res) => {
    const { sortBy, sortOrder, author, tags } = req.query

    const options = { sortBy, sortOrder }

    try {
      if (author && tags) {
        return res
          .status(400)
          .json({ error: 'Query by either author or tag, not both' })
      } else if (author) {
        return res.json(await listRecipesByAuthor(author, options))
      } else if (tags) {
        return res.json(await listRecipesByTag(tags, options))
      } else {
        return res.json(await listAllRecipes(options))
      }
    } catch (err) {
      console.error('Error listing recipes', err)
      return res.status(500).end()
    }
  }) // end list recipes

  // Get recipe by the recipe ID ==============================================
  app.get('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params
    try {
      const recipe = await getRecipeById(id)
      if (recipe === null) return res.status(404).end()
      return res.json(recipe)
    } catch (err) {
      console.error('Error getting recipe', err)
    }
  }) // end get recipe by ID
}
