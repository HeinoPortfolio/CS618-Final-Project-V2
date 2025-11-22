import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// Import the routes =====
import { recipesRoutes } from './routes/recipes.js'
import { userRoutes } from './routes/users.js'
import { eventRoutes } from './routes/events.js'

// Import socket.io and node libraries
import { createServer } from 'node:http'
import { Server } from 'socket.io'

// Import the socket handler function =====================
import { handleSocket } from './socket.js'

const app = express()
// Use the body parser ====================================
app.use(bodyParser.json())
// Use the CORS ===========================================
app.use(cors())

// Call the routes functions ==============================
recipesRoutes(app)
userRoutes(app)
eventRoutes(app)

// Create a node server ==================================
/*
    Note: 
    -- Express server will be passed as a parameter
    -- Express server will be used as the regular Express 
    server 

*/
const server = createServer(app)

// Socket IO code begins here =============================
// create a socket.io server ==============================

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

// Handle the socket event  ==============================
handleSocket(io)

// Configure the server simply ============================
app.get('/', (req, res) => {
  res.send('Express is currently running!')
})

// Export the new server ==================================
/*
    Note:
    -- Will export the new server as opposed to the previous 
       **Express** application
*/
export { server as app }
