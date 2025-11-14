import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../api/users'

export function Signup() {
  // States for the signup page ===============================================
  /*
        Note: 
        -- Will set the username and the password
        -- initial values of the useername and the password 
        are empty strings
  */
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // To navigate to the login page ============================================
  const navigate = useNavigate()

  // Mutation to handle the signup action =====================================
  /*
        Note:
        -- Will use the signup API to create/signup the new user
        -- The new user will be added to the database in the user collection
  */
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('Failed to signup!'),
  })

  // Function to handle the button click to create the new user ===============
  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }
  // Signup form ==============================================================
  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Click Here To Go Back To Main Page</Link>
      <hr />
      <br />
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='password'
          name='create-password'
          id='create-password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
        disabled={!username || !password || signupMutation.isPending}
      />
    </form>
  )
}
