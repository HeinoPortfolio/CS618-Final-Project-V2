import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

// Connection information =====================================================
const url = 'mongodb://localhost:27017/'
const dbName = 'recipe-blog-v2'

// Create a new Mongo client ===============================
const client = new MongoClient(url)

// Connect to the recipe blog v2 database ==================
try {
  await client.connect()
  console.log('Successfully connected to the database!')
} catch (err) {
  console.error('Error connecting to the database!', err)
}

// Create the server =====================================
const server = createServer(async (req, res) => {
  const db = client.db(dbName)
  const users = db.collection('users')

  const usersList = await users.find().toArray()

  res.statusCode = 200

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(usersList))
})

const host = 'localhost'
const port = 3000

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
