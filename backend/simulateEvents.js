/* 
    File Purpose:
    -- To simulatee user events
    -- will create users, start and end view, and likes

*/
import { initDatabase } from './src/db/init.js'
import { Recipe } from './src/db/models/recipe.js'
import { User } from './src/db/models/user.js'
import { Event } from './src/db/models/event.js'
import { createUser } from './src/services/users.js'
import { createRecipe } from './src/services/recipes.js'
import { trackEvent } from './src/services/events.js'
import dotenv from 'dotenv'

dotenv.config()

const simulationStart = Date.now() - 1000 * 60 * 60 * 24 * 30
const simulationEnd = Date.now()

/* 
Default:
        simulatedUsers:   5
        simulatedPosts:   10
        simulatedViews:   10
Lecture:
        simulatedUsers:   5
        simulatedPosts:   10
        simulatedViews:   10000   
*/
const simulatedUsers = 5
const simulatedPosts = 10
const simulatedViews = 10000

async function simulateEvents() {
  const connection = await initDatabase()
  await User.deleteMany({})
  const createdUsers = await Promise.all(
    Array(simulatedUsers)
      .fill(null)
      .map(
        async (_, u) =>
          await createUser({
            username: `user-${u}`,
            password: `password-${u}`,
          }),
      ),
  )
  console.log(`created ${createdUsers.length} users`)

  await Recipe.deleteMany({})
  const createdRecipes = await Promise.all(
    Array(simulatedPosts)
      .fill(null)
      .map(async (_, p) => {
        const randomUser =
          createdUsers[Math.floor(Math.random() * simulatedUsers)]
        return await createRecipe(randomUser._id, {
          title: `Test Post ${p}`,
          ingredientList: `This is a test post ${p}`,
          imageURL:
            'https://github.com/HeinoPortfolio/images/blob/main/fried-chicken.jpg?raw=false',
        })
      }),
  )
  console.log(`created ${createdRecipes.length} posts`)

  await Event.deleteMany({})
  const createdViews = await Promise.all(
    Array(simulatedViews)
      .fill(null)
      .map(async () => {
        const randomRecipe =
          createdRecipes[Math.floor(Math.random() * simulatedPosts)]
        const sessionStart =
          simulationStart + Math.random() * (simulationEnd - simulationStart)
        const sessionEnd =
          sessionStart + 1000 * Math.floor(Math.random() * 60 * 5)

        // Start of event ================================
        const event = await trackEvent({
          recipeId: randomRecipe._id,
          action: 'startView',
          date: new Date(sessionStart),
        })
        await trackEvent({
          recipeId: randomRecipe._id,
          session: event.session,
          action: 'endView',
          date: new Date(sessionEnd),
        })

        await trackEvent({
          recipeId: randomRecipe._id,
          session: event.session,
          action: 'liked',
          date: new Date(sessionEnd),
        })
      }),
  )
  console.log(`successfully simulated ${createdViews.length} views and likes`)

  await connection.disconnect()
}

simulateEvents()
