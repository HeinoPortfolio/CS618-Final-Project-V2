import { expressjwt } from 'express-jwt'

// Function to  require authentication ========================================
export const requireAuth = expressjwt({
  secret: () => process.env.JWT_SECRET,
  algorithms: ['HS256'],
})
