/* Notes:
    -- This context will keep track of the token
    -- Will make the token when needed to perform certain tasks
*/
import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

// Creation of the token variable =============
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
})

// Create a token provider ============================
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

// Function to provide the ability ot use the token where needed
export function useAuth() {
  const { token, setToken } = useContext(AuthContext)
  return [token, setToken]
}
