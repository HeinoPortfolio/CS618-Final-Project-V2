import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

// Function to login a user ===================================================
export function Login() {
  // Login states =============================================================
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useAuth()

  const navigate = useNavigate()

  // Login mutation ===========================================================
  /*
        Notes:
        -- Uses the login() api to login the user 
        -- Uses setToken() to save a token for the user 

  */
  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('Failed to login! Check username or pasword.'),
  })

  // Login function handler ===================================================
  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  // Login form =================================================================
  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome to the Login Page</h1>
      <Link to='/'>Back to main page</Link>
      <hr />
      <br />
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='password'
          name='create-password'
          id='create-password'
          autoComplete='off'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={
          loginMutation.isPending ? 'Logging in...' : 'Click Here To Log In'
        }
        disabled={!username || !password || loginMutation.isPending}
      />
    </form>
  )
}
