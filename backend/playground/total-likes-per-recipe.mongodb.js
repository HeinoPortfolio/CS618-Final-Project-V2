/* global use, db */

use('recipes-blog-simulated')

const top_number = 10
// Aggregate function to get total number of view of the recipes ==============
db.getCollection('events').aggregate([
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
      Likes: '$totalLikes',
    },
  },
  { $unwind: '$title' },
  { $unwind: '$ingredientList' },
  { $unwind: '$author' },
  { $unwind: '$imageURL' },
  {
    $limit: top_number,
  },
])
