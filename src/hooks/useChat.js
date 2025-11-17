import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function useChat() {
  const { socket } = useSocket()
  const [messages, setMessages] = useState([])

  // Appends new message to the array ==================
  function receiveMessage(message) {
    setMessages((messages) => [...messages, message])
  }
  useEffect(() => {
    socket.on('chat.message', receiveMessage)
    return () => socket.off('chat.message', receiveMessage)
  }, [])

  // Function to send a message =====================================
  async function sendMessage(message) {
    if (message.startsWith('/')) {
      // Get the command part of the string =====
      /*
        Note:
        -- will be the first character in the string
      */
      const command = message.substring(1)
      switch (command) {
        // Will clear all messages from the messages array ====================
        case 'clear':
          // Reset the array of messages ====
          setMessages([])
          break
        // Will show all the rooms that the user is in ========================
        /*
            Note:  
            -- Will get the user information message 
            -- Will filter show it does not show the user id only 
               the room information
         */
        case 'rooms': {
          const userInfo = await socket.emitWithAck('user.info', socket.id)
          const rooms = userInfo.rooms.filter((room) => room !== socket.id)

          receiveMessage({
            message: `You are in the following room: ${rooms.join(', ')}`,
          })
          break
        }
        default:
          // if unknown message send a message to the user ==========
          receiveMessage({
            message: `Unknown command: ${command}`,
          })
          break
      }
    } else {
      // Show the message =================================
      // Show the message and it is not a command =========
      socket.emit('chat.message', message)
    }
  }
  return { messages, sendMessage }
}
