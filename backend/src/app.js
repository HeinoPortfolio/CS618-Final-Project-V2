import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Import the routes =====
import { recipesRoutes } from './routes/recipes.js'

const app = express()

// Use the body parser ====================================
app.use(bodyParser.json())

// Use the CORS ===========================================
app.use(cors())

// Call the routes functions ==============================
recipesRoutes(app)

// Configure the server simply ============================
app.get('/', (req, res) => {
  res.send('Express is currently running!')
})

// Export the app
export { app }
