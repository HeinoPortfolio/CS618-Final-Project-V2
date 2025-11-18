//import { Header } from '../components/Header.jsx'
import { Status } from '../components/Status.jsx'
import { HeaderChat } from '../components/HeaderChat.jsx'

// Imports for the chat room ========================================
import { ChatRoom } from '../components/ChatRoom.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'

import { Link } from 'react-router-dom'

export function Chat() {
  // Include the status of the connection =======
  const { status } = useSocket()

  return (
    <div style={{ padding: 8 }}>
      <HeaderChat />
      <Link to='/'> Back To Main Page </Link>
      <br />
      <hr />
      <br />
      <Status />
      <br />
      <hr />
      <br />
      {status === 'Connected' && <ChatRoom />}
    </div>
  )
}
