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

import jwt from 'jsonwebtoken'
import { getUserInfoById } from './services/users.js'
import {
  joinRoom,
  sendPublicMessage,
  getUserInfoBySocketId,
} from './services/chat.js'

export function handleSocket(io) {
  io.on('connection', (socket) => {
    joinRoom(io, socket, { room: 'public' })

    // Send a public message
    socket.on('chat.message', (room, message) =>
      sendPublicMessage(io, { username: socket.user.username, room, message }),
    )

    // Join a room othen then public ===============
    socket.on('chat.join', (room) => joinRoom(io, socket, { room }))

    // Get user information ========================
    socket.on('user.info', async (socketId, callback) =>
      callback(await getUserInfoBySocketId(io, socketId)),
    )
  })

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
        socket.user = await getUserInfoById(socket.auth.sub)
        return next()
      },
    )
  })
}
