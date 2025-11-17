import { Message } from '../db/models/message.js'

// Services for messages ======================================================
// Service to create a message ================================================
export async function createMessage({ username, message, room }) {
  const messageDoc = new Message({ username, message, room })
  return await messageDoc.save()
}

// Get message by the room ===================================================
export async function getMessagesByRoom(room) {
  return await Message.find({ room }).sort({ sent: 1 })
}
