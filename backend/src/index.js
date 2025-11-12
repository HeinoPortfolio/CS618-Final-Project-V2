import { app } from './app.js'
import dotenv from 'dotenv'

// function to setup the environment variables ============
dotenv.config()

// Port for the database ==================================
const PORT = process.env.PORT

app.listen(PORT)

console.info(`Express Server running on: http://localhost:${PORT}`)
