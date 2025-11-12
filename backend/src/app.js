import express from 'express'

const app = express()

// Configurethe server simply =======
app.get('/', (req, res) => {
  res.send('Express is currently running!')
})

// export the app
export { app }
