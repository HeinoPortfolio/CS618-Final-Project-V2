import { createMessage, getMessagesByRoom } from './messages.js'

export function sendPrivateMessage(
  socket,
  { username, room, message, replayed },
) {
  socket.emit('chat.message', { username, message, room, replayed })
  console.log('Private message was sent: ', message)
}

export function sendSystemMessage(io, { room, message }) {
  io.to(room).emit('chat.message', { message, room })
  console.log('A system message was sent.', message)
}

export function sendPublicMessage(io, { username, room, message }) {
  io.to(room).emit('chat.message', { username, message, room })
  createMessage({ username, message, room })
  console.log('A public message was created.', message)
}

export async function joinRoom(io, socket, { room }) {
  socket.join(room)
  sendSystemMessage(io, {
    room,
    message: `User "${socket.user.username}" joined room:   "${room}" `,
  })
  const messages = await getMessagesByRoom(room)

  messages.forEach(({ username, message }) =>
    sendPrivateMessage(socket, { username, message, room, replayed: true }),
  )
}

export async function getUserInfoBySocketId(io, socketId) {
  const sockets = await io.in(socketId).fectSockets()

  if (sockets.length === 0) return null

  const socket = socket[0]
  const userInfo = {
    socketId,
    rooms: Array.from(socket.rooms),
    user: socket.user,
  }
  return userInfo
}
