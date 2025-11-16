import { useNavigate, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext'
import { User } from './User.jsx'

// Import to handle socket io ========= ===========================
import { useSocket } from '../contexts/SocketIOContext.jsx'

// Header to show the links for signup ==========
export function Header() {
  // Authentication states ========================================
  const [token, setToken] = useAuth()

  const navigate = useNavigate()

  // Create the socket ========================================================
  const { socket } = useSocket()

  // Handle the logout ========================================================
  const handleLogout = () => {
    socket.disconnect()
    setToken(null)
    navigate('/')
  }

  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div>
        <h1>Welcome To The Recipe Blog! </h1>
        <br />
        <b>
          Logged in as:&nbsp;{' '}
          <b>
            {' '}
            <User id={sub} />{' '}
          </b>
        </b>
        <br />
        <br />
        <button onClick={handleLogout}>Click Here To Logout</button>
        <br />
        <Link to='/chat'> Chat Room</Link>
        <br />
        <hr />
        <br />
      </div>
    )
  }
  // No token available =====================================================
  return (
    <div>
      <h1>Welcome To The Recipe Blog! </h1>
      <Link to='/login'> Login Here </Link> &nbsp; | &nbsp;
      <Link to='/signup'> Sign Up Here</Link> &nbsp;| &nbsp;
      <br />
      <hr />
    </div>
  )
}
