import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'
import dotenv from 'dotenv'

dotenv.config()
await initDatabase()

const recipe = new Recipe({
  title: 'Super Chocolate Pudding',
  author: 'Steve Jobs',
  ingredientList: '1/2 lb. of sugar \n1/4 chocolate powder \n1 tsp. of butter ',
  imageURL: 'http://someUrl6.com',
  tags: ['chocolate', 'pudding'],
})

await recipe.save()

const recipe2 = new Recipe({
  title: 'Fried Shrimp',
  author: 'Lynn Redgraves',
  ingredientList: '1lb. of prawns \n1/4 bread crumbs \n1 tsp. of butter',
  imageURL: 'http://someUrl7.com',
  tags: ['shrimp', 'fried'],
})

await recipe2.save()

const recipe3 = new Recipe({
  title: 'Beef Stroganoff',
  author: 'Tommy Lee Jones',
  ingredientList: '1lb. of beef cubes \n1/2 onion \n1 tsp. of butter',
  imageURL: 'http://someUrl8.com',
  tags: ['beef', 'onion', 'butter'],
})
await recipe3.save()

const recipe4 = new Recipe({
  title: 'Some Other Recipe Part 2',
  author: 'Will Smith',
  ingredientList: '1lb. of chicken cubes \n1/2 onion \n1 tsp. of broth',
  imageURL: 'http://someUrl4.com',
  tags: ['chicken', 'onion', 'broth'],
})

await recipe4.save()

const recipes = await Recipe.find()

console.log(recipes)
