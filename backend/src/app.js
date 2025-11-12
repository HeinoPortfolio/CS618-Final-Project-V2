import express from 'express'
// Import the routes =====
import { recipesRoutes } from './routes/recipes.js'

const app = express()

// Call the routes functions =============================
recipesRoutes(app)

// Configure the server simply ============================
app.get('/', (req, res) => {
  res.send('Express is currently running!')
})

// Export the app
export { app }
