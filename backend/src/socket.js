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
  io.on('connection', (socket) => {
    // On connection display a message to the
    // console with socket id

    console.log('User connected:', socket.id)

    // Disconnect handler ======================
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })

    // attach a chat message handler =============
    socket.on('chat.message', (message) => {
      console.log(`${socket.id}: ${message}`)

      // Produce a broadcast message event ===========================
      // *** This chat message will be received by everyone
      // except the sender
      //socket.broadcast.emit('chat.message', { username: socket.id, message })
      // To send message to everyone including the sender ======================
      io.emit('chat.message', { username: socket.id, message })
    })
  })
}
