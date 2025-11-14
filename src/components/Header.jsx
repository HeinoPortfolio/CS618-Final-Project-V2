import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext'

// Header to show the links for signup ==========
export function Header() {
  // Authentication states ========================================
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div>
        <h1>Welcome To The Recipe Blog! </h1>
        <br />
        <b>
          Logged in as:&nbsp; <b>{sub}</b>
        </b>
        <br />
        <br />
        <button onClick={() => setToken(null)}>Click Here To Logout</button>
        <br />
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
      <Link to='/signup'> Sign Up Here</Link>
      <br />
      <hr />
    </div>
  )
}
