import { app } from './app.js'
import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'

// function to setup the environment variables ============
dotenv.config()

// Initialize the database ================================
try {
  await initDatabase()

  // Get the database port number ======================
  const PORT = process.env.PORT

  app.listen(PORT)

  // Display message to terminal about success
  console.info(`Express Server running on: http://localhost:${PORT}`)
} catch (err) {
  console.error('Error connecting to database: ', err)
}
