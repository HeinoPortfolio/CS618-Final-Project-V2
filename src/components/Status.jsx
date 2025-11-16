import { useSocket } from '../contexts/SocketIOContext.jsx'

// Displays the status of the socket ==========================================
export function Status() {
  const { status, error } = useSocket()
  return (
    <div>
      Socket status: <b>{status}</b>
      {error && <i> - {error.message}</i>}
    </div>
  )
}
