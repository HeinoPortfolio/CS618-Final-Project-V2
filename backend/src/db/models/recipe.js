import mongoose, { Schema } from 'mongoose'

// Recipe Schema to model a recipe and the desired information ================
const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    ingredientList: String,
    imageURL: String,
    tags: [String],
  },

  { timestamps: true },
)

// Export the recipe schema so it can be used =======================
/*
    Note:   'recipe' is used to indicate the name of the Mongodb 
            collection to be created 
*/
export const Recipe = mongoose.model('recipe', recipeSchema)
