import { HeaderChat } from '../components/HeaderChat.jsx'
import { Status } from '../components/Status.jsx'
import { Link } from 'react-router-dom'

// Imports for the Chat room ========================================
import { ChatRoom } from '../components/ChatRoom.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function Chat() {
  // Include the status
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
      {status === 'connected' && <ChatRoom />}
    </div>
  )
}
