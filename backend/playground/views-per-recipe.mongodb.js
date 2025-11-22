/* global use, db */

use('recipes-blog-simulated')

// Aggregate function to get total number of view of the recipes ==============
db.getCollection('events').aggregate([
  {
    $match: { action: 'startView' },
  },

  {
    $group: {
      _id: '$recipe',
      views: { $count: {} },
    },
  },
])
