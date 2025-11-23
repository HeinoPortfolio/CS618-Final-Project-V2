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
// Function for total views of a recipe ========================
export async function getTotalViews(recipeId) {
  return {
    views: await Event.countDocuments({
      recipe: recipeId,
      action: 'startView',
    }),
  }
}

// Function for get the daily views of the recipe =============================
export async function getDailyViews(recipeId) {
  return await Event.aggregate([
    {
      $match: { recipe: recipeId, action: 'startView' },
    },
    {
      $group: {
        _id: {
          $dateTrunc: { date: '$date', unit: 'day' },
        },
        views: { $count: {} },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ])
} // end getDailyViews

// Function to get the daily durations ========================================
export async function getDailyDurations(recipeId) {
  return await Event.aggregate([
    {
      $match: {
        recipe: recipeId,
      },
    },
    {
      $project: {
        session: '$session',
        startDate: {
          $cond: [{ $eq: ['$action', 'startView'] }, '$date', undefined],
        },
        endDate: {
          $cond: [{ $eq: ['$action', 'endView'] }, '$date', undefined],
        },
      },
    },
    {
      $group: {
        _id: '$session',
        startDate: { $min: '$startDate' },
        endDate: { $max: '$endDate' },
      },
    },
    {
      $project: {
        day: { $dateTrunc: { date: '$startDate', unit: 'day' } },
        duration: { $subtract: ['$endDate', '$startDate'] },
      },
    },
    {
      $group: {
        _id: '$day',
        averageDuration: { $avg: '$duration' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ])
}
// Get total likes ===============================================
export async function getTotalLikes(recipeId) {
  return {
    likes: await Event.countDocuments({
      recipe: recipeId,
      action: 'liked',
    }),
  }
}

// Get total likes and recipe information ====================================
export async function getLikes() {
  return await Event.aggregate([
    {
      $match: { action: 'liked' },
    },
    {
      $group: {
        _id: '$recipe',
        totalLikes: { $count: {} },
      },
    },
    {
      $sort: { totalLikes: -1 },
    },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: '_id',
        as: 'recipeInfo',
      },
    },
    {
      $project: {
        _id: 0,
        recipeId: '$_id',
        title: '$recipeInfo.title',
        author: '$recipeInfo.author',
        ingredientList: '$recipeInfo.ingredientList',
        imageURL: '$recipeInfo.imageURL',
        totalLikes: '$totalLikes',
      },
    },
    { $unwind: '$title' },
    { $unwind: '$ingredientList' },
    { $unwind: '$author' },
    { $unwind: '$imageURL' },
  ])
}
