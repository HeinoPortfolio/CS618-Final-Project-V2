// File to initialize the database ==================================
import mongoose from 'mongoose'

export function initDatabase() {
  //const DATABASE_URL = 'mongodb://localhost:27017/recipe-blog-v2'
  const DATABASE_URL = process.env.DATABASE_URL

  mongoose.connection.on('open', () => {
    console.info('Successfully connected to the database: ', DATABASE_URL)
  })

  const connection = mongoose.connect(DATABASE_URL)

  return connection
}
