import express from 'express'

const app = express()

// Configure the server simply ============================
app.get('/', (req, res) => {
  res.send('Express is currently running!')
})

// export the app
export { app }
