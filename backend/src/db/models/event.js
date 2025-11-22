// An event schema for saving data about user interactions with recipes
// Modified from the lecture/book schema =====================
/*
    recipe:     keep track of events related to the recipe
    session:    the unique id of the event that occurred
    action:     keep tracks of any action as a string 
    date:       the date/time of the action

*/

import mongoose, { Schema } from 'mongoose'

const eventsSchema = new Schema(
  {
    recipe: { type: Schema.Types.ObjectId, ref: 'recipe', required: true },
    session: { type: String, required: true },
    action: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true },
)

export const Event = mongoose.model('events', eventsSchema)
