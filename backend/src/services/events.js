// Service layer function to track the user event ==============================
/* 
    Note:   Will create an event in the database.
    date:   Date of the event    
*/
import { v4 as uuidv4 } from 'uuid'
import { Event } from '../db/models/event.js'

export async function trackEvent({
  recipeId,
  action,
  session = uuidv4(),
  date = Date.now(),
}) {
  const event = new Event({ recipe: recipeId, action, session, date })

  // Save the event to the database (events) ==================================
  return await event.save()
}
