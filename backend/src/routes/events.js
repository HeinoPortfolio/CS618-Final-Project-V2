import {
  trackEvent,
  getTotalViews,
  getDailyViews,
  getDailyDurations,
  getTotalLikes,
  getLikes,
} from '../services/events.js'
import { getRecipeById } from '../services/recipes.js'

//  Create the route ==========================================================
export function eventRoutes(app) {
  app.post('/api/v1/events', async (req, res) => {
    try {
      const { recipeId, session, action } = req.body
      const post = await getRecipeById(recipeId)

      if (post === null) return res.status(400).end()

      const event = await trackEvent({ recipeId, session, action })

      return res.json({ session: event.session })
    } catch (err) {
      console.error('Error tracking action', err)

      return res.status(500).end()
    }
  })
  // Route to get total views of the recipe ===================================
  app.get('/api/v1/events/totalViews/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params
      const recipe = await getRecipeById(recipeId)

      if (recipe === null) return res.status(400).end()

      const stats = await getTotalViews(recipe._id)
      return res.json(stats)
    } catch (err) {
      console.error('Error getting stats', err)

      return res.status(500).end()
    }
  })
  // Route to get daily views of the recipe ===================================
  app.get('/api/v1/events/dailyViews/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params
      const recipe = await getRecipeById(recipeId)

      if (recipe === null) return res.status(400).end()

      const stats = await getDailyViews(recipe._id)

      return res.json(stats)
    } catch (err) {
      console.error('Error getting stats', err)

      return res.stats(500).end()
    }
  })
  // Route to get daily view durations of the recipe ============================
  app.get('/api/v1/events/dailyDurations/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params
      const recipe = await getRecipeById(recipeId)

      if (recipe === null) return res.stats(400).end()

      const stats = await getDailyDurations(recipe._id)
      return res.json(stats)
    } catch (err) {
      console.error('Error getting stats'.err)

      return res.status(500).end()
    }
  })

  // Route to get total likes of the recipe ===================================
  app.get('/api/v1/events/totalLikes/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params
      const recipe = await getRecipeById(recipeId)

      if (recipe === null) return res.status(400).end()

      const stats = await getTotalLikes(recipe._id)
      return res.json(stats)
    } catch (err) {
      console.error('Error getting stats', err)

      return res.status(500).end()
    }
  })

  // Route to get likes with recipe information ===============================
  app.get('/api/v1/events/likesInfo/', async (req, res) => {
    try {
      const stats = await getLikes()
      return res.json(stats)
    } catch (err) {
      console.error('Error getting stats', err)
      return res.status(500).end()
    }
  })
} // end event
