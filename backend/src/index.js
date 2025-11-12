import { app } from './app.js'

// Port for the database =================
const PORT = 3000

app.listen(PORT)

console.info(`Express Server running on: http://localhost:${PORT}`)
