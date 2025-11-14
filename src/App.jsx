/* 
    File Purpose:
    -- To import the query client and the provider from tanstack
    -- Will import the Blog application 
    -- Creates a new query client to return information in the database
    -- Application will return the application wrapping the orignal application
*/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog.jsx'

// Import router libray functions =============================================
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Create a new query client to call the backend ==============================
const queryClient = new QueryClient()

// Create a router variable ===================================================
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },

  /*
  {
    path: '/signup',
    element: <Signup />,
  }, 
  {
    path: '/login',
    element: <Login />,
  },*/
])

// The application function ===========
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
