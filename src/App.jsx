/* 
    File Purpose:

    -- To import the query client and the provider from tanstack
    -- Will import the Blog application 
    -- Creates a new query client to return information in the database
    -- Application will return the application wrapping the original application
*/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Pages for the application =================================================

// Provide the token ==========================================================
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { SocketIOContextProvider } from './contexts/SocketIOContext.jsx'

// Import Proptypes ==========================================================
import PropTypes from 'prop-types'

// Create a new query client to call the backend ==============================
const queryClient = new QueryClient()

// The application function ===========
export function App({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketIOContextProvider>{children}</SocketIOContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}
