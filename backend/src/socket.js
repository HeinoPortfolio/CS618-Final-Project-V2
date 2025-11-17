/* 
    File Purpose:
    This file will have all the socket handlers.

    Socket Handlers:
    ----------------
    1) socket connection handler event:  will handle the event when use comes 
    onto the webpage
        -- connection handler
        -- 2) disconnection handler
*/

// Imports for JWT and user information by the user ID ========================
import jwt from 'jsonwebtoken'
import { getUserInfoById } from './services/users.js'

// Import the service function ===============================================
import {
  joinRoom,
  sendPublicMessage,
  getUserInfoBySocketId,
} from './services/chat.js'

// Setup a connection event  ==================================================
/*
    Note:
    -- When thes is a connection event will log a message to the console
    -- Will display the socket ID **NOT** the user that is connected 
       it will display just the socket ID
    -- will add a socket layer around the Node server
    -- This is a socket connection event handler  
*/

export function handleSocket(io) {
  // Function to handle authentication ========================================
  /*  
      Notes:
      -- will make use of the use() function provided by Sockett.io
      -- used for authentication calls

  */
  io.use((socket, next) => {
    if (!socket.handshake.auth?.token) {
      return next(new Error('Authentication failed: no token provided'))
    }
    jwt.verify(
      socket.handshake.auth.token,

      process.env.JWT_SECRET,

      async (err, decodedToken) => {
        if (err) {
          return next(new Error('Authentication failed: invalid token'))
        }
        socket.auth = decodedToken
        // socket will have a username ==============================
        socket.user = await getUserInfoById(socket.auth.sub)
        return next()
      },
    )
  }) // End Authentication ============

  io.on('connection', async (socket) => {
    // Service to join a room ==============
    joinRoom(io, socket, { room: 'public' })

    // sendPublicMessage
    socket.on('chat.message', (room, message) =>
      // Send a message and create it in the database =========================
      sendPublicMessage(io, { username: socket.user.username, room, message }),
    )
    // Receive the user information ===========================================
    socket.on('user.info', async (socketId, callback) =>
      callback(await getUserInfoBySocketId(io, socketId)),
    )
  })
}
