import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'
import { createRecipe } from '../src/services/recipes.js'
import { Recipe } from '../src/db/models/recipe.js'

describe('Creating recipes', () => {
  // Test for all the parameters set ==========================================
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
  // Test without a title =====================================================
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
