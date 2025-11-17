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
// Provide the token ==========================================================
import { AuthContextProvider } from './contexts/AuthContext.jsx'

// Import for socke.io client =================================================
import { io } from 'socket.io-client'

// Create a socket ============================================================
const socket = io(import.meta.env.VITE_SOCKET_HOST)

// Create a new query client to call the backend ==============================
const queryClient = new QueryClient()

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
]) // end router variable

// Event handlers =============================================================
socket.on('connect', () => {
  console.log('Connected to socket.io as', socket.id)
  // Send a message to the server ======================
  // The message will be about being connected =========
  //socket.emit('chat.message', 'Frontend client has connected succesfully!')
  /*
      Note: will get message from parameters in the address bar of the 
      browser. To differentiate the messages for testing purposes
  */
  socket.emit(
    'chat.message',
    new URLSearchParams(window.location.search).get('mymsg'),
  )
})

// COnnection error event =====================================================
socket.on('connect_error', (err) => {
  console.error('socket.io connect error:', err)
})
//Client chat.message =========================================================
socket.on('chat.message', (msg) => {
  console.log(`${msg.username}: ${msg.message}`)
})
// End event handlers ==========================================================

// The application function ===========
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
