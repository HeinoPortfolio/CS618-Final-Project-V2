import { writeFileSync, readFileSync } from 'node:fs'

const users = [{ name: 'Adam Ondra', eamil: 'adam.ondra@clim.ing' }]

const usersJson = JSON.stringify(users)

writeFileSync('users.json', usersJson)

const readUsersJson = readFileSync('users.json')
const readUsers = JSON.parse(readUsersJson)

// Show contents ==========================================
console.log(readUsers)
