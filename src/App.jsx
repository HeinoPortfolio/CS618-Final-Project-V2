/* 
    File Purpose:

    -- To import the query client and the provider from tanstack
    -- Will import the Blog application 
    -- Creates a new query client to return information in the database
    -- Application will return the application wrapping the original application
*/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Pages for the application =================================================
import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'

// Import router libray functions =============================================
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Create a new query client to call the backend ==============================
const queryClient = new QueryClient()

// Provide the token ==========================================================
import { AuthContextProvider } from './contexts/AuthContext.jsx'

// Import Socket Context provider =============================================
import { SocketIOContextProvider } from './contexts/SocketIOContext.jsx'

// Create a router variable ===================================================
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

// The application function ===========
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketIOContextProvider>
          <RouterProvider router={router} />
        </SocketIOContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
