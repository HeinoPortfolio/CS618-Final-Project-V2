import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'

import { Chat } from './pages/Chat.jsx'

// Create a router variable ===================================================
export const routes = [
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

  {
    path: '/chat',
    element: <Chat />,
  },
] // end router variable
