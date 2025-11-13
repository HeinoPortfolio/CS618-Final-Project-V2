// Model to define a user in the recipe database===============================
import mongoose, { Schema } from 'mongoose'

// Schema for the user ========================================================
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// Export =====
export const User = mongoose.model('user', userSchema)
