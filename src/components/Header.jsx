import { Link } from 'react-router-dom'

// Header to show the links for signup ==========
export function Header() {
  return (
    <div>
      <h1>Welcome To The Recipe Blog!</h1>
      <Link to='/signup'>Click Here To Sign Up</Link>
      <br />
      <hr />
    </div>
  )
}
