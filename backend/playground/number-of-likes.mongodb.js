/* global use, db */
use('recipes-blog-simulated')

db.getCollection('events').aggregate([
  {
    $match: {
      action: 'liked',
    },
  },
  {
    $group: {
      _id: '$recipe',
      totalLikes: { $count: {} },
    },
  },
])
