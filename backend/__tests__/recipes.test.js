import mongoose from 'mongoose'
import { beforeEach, describe, expect, test } from '@jest/globals'
import {
  createRecipe,
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByTag,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../src/services/recipes.js'
import { Recipe } from '../src/db/models/recipe.js'

// Initialize the test use and the sample recipes =============================
const sampleRecipes = [
  {
    title: 'Sample Recipe 1',
    author: 'Matthew Heino',
    ingredientList: 'Some ingredients go here!!!!',
    imageURL: 'http://someUrl1.com',
    tags: ['beef'],
  },
  {
    title: 'Sample Recipe 2',
    author: 'Claudia Heino',
    ingredientList: 'Some ingredients go here again!!!!',
    imageURL: 'http://someUrl2.com',
    tags: ['onions', 'beef'],
  },
  {
    title: 'Sample Recipe 3',
  },
]

let createdSampleRecipes = []

beforeEach(async () => {
  await Recipe.deleteMany({})
  createdSampleRecipes = []
  for (const recipe of sampleRecipes) {
    const createdRecipe = new Recipe(recipe)
    createdSampleRecipes.push(await createdRecipe.save())
  }
})

// Tests for creating a recipe =================================================
describe('Creating recipes', () => {
  // Test for all the parameters set ==================================
  test('With all the parameters succeed', async () => {
    const recipe = {
      title: 'A Test Recipe',
      author: 'Matthew Heino',
      ingredientList: 'Some ingredients go here!!!!',
      imageURL: 'http://someUrl.com',
    }

    const createdRecipe = await createRecipe(recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundRecipe = await Recipe.findById(createdRecipe._id)
    expect(foundRecipe).toEqual(expect.objectContaining(recipe))
    expect(foundRecipe.createdAt).toBeInstanceOf(Date)
    expect(foundRecipe.updatedAt).toBeInstanceOf(Date)
  })
  // Test without a title ==============================================
  test('Without title should fail -- no title', async () => {
    const recipe = {
      author: 'Matthew Heino',
      ingredientList: 'Some additional ingredients go here!!!!',
      imageURL: 'http://someUrl.com',
      tags: ['empty'],
    }
    try {
      await createRecipe(recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })
  // Test with minimum parameters =============================================
  test('With minimal parameters should succeed--title only', async () => {
    const recipe = {
      title: 'Only a simple title',
    }
    const createdRecipe = await createRecipe(recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

// Tests for listing recipes ===================================================
describe('Listing recipes', () => {
  test('Should return all recipes', async () => {
    const recipes = await listAllRecipes()
    expect(recipes.length).toEqual(createdSampleRecipes.length)
  })

  // Should return all recipes in sorted order ================================
  test('Should return all recipes sorted by creation date in descending order', async () => {
    const recipes = await listAllRecipes()
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(recipes.map((recipe) => recipe.createdAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.createdAt),
    )
  }) // end

  // Should use the sorting options provided ==================================
  test('Should take into account the sorting options', async () => {
    const recipes = await listAllRecipes({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(recipes.map((recipe) => recipe.updatedAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.updatedAt),
    )
  }) // end

  // Should be able to filter by tags associcated with recipe =================
  test('Should be able filter recipes by tag', async () => {
    const recipes = await listRecipesByTag('beef')
    expect(recipes.length).toBe(2)
  }) // end

  //Sould be able to filter recipes by the author =============================
  test('Should be able to filter recipes by the author', async () => {
    const recipes = await listRecipesByAuthor('Matthew Heino')
    expect(recipes.length).toBe(1)
  }) // end

  // Tests for getting a single recipe ==========================================
  describe('Getting a post', () => {
    test('Should return the full recipe', async () => {
      const recipe = await getRecipeById(createdSampleRecipes[0]._id)
      expect(recipe.toObject()).toEqual(createdSampleRecipes[0].toObject())
    })
    test('Should fail if the id does not exist', async () => {
      const recipe = await getRecipeById('000000000000000000000000')
      expect(recipe).toEqual(null)
    })
  }) // end

  // Tests for updating a recipe ================================================
  describe('Updating recipes', () => {
    test('Should update the specified property', async () => {
      await updateRecipe(createdSampleRecipes[0]._id, {
        ingredientList: 'Updated ingredient list',
      })
      const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
      expect(updatedRecipe.ingredientList).toEqual('Updated ingredient list')
    })

    test('should not update other properties', async () => {
      await updateRecipe(createdSampleRecipes[0]._id, {
        ingredientList: 'Updated ingredient list',
      })
      const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
      expect(updatedRecipe.title).toEqual('Sample Recipe 1')
    })
    test('should update the updatedAt timestamp', async () => {
      await updateRecipe(createdSampleRecipes[0]._id, {
        ingredientList: 'Updated ingredient list',
      })
      const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
      expect(updatedRecipe.updatedAt.getTime()).toBeGreaterThan(
        createdSampleRecipes[0].updatedAt.getTime(),
      )
    })
    test('should fail if the id does not exist', async () => {
      const recipe = await updateRecipe('000000000000000000000000', {
        ingredientList: 'Updated ingredient list',
      })
      expect(recipe).toEqual(null)
    })
  })

  // Tests for deleting a recipe ================================================
  describe('Deleting recipe', () => {
    test('Should remove the recipe from the database', async () => {
      const result = await deleteRecipe(createdSampleRecipes[0]._id)
      expect(result.deletedCount).toEqual(1)

      const deletedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
      expect(deletedRecipe).toEqual(null)
    })

    test('Should fail if the id does not exist', async () => {
      const result = await deleteRecipe('000000000000000000000000')
      expect(result.deletedCount).toEqual(0)
    })
  })
})
