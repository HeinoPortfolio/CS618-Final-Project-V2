import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '../api/recipes.js'

export function CreateRecipe() {
  // Create the states=========================================================
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [ingredientList, setIngredientList] = useState('')
  const [imageURL, setImageURL] = useState('')

  // Create the query client ==================================================
  const queryClient = useQueryClient()

  // Create the recipe mutation for creating the new recipe ===================
  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe({ title, author, ingredientList, imageURL }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  // Handle the click to create a new recipe button ===========================
  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  // Form for creating the new recipe =========================================
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>
          <b>Recipe Title: </b>
        </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>
          {' '}
          <b>Author: </b>
        </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-imageURL'>
          <b>URL for image: </b>
        </label>
        <input
          type='text'
          name='create-imageURL'
          id='create-imageURL'
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor='recibe-box'>
        <b>Enter the recipe&#39;s ingredients below: </b>
      </label>
      <br />
      <br />
      <textarea
        id='comment-box'
        name='recipe-area'
        rows='15'
        cols='40'
        value={ingredientList}
        onChange={(e) => setIngredientList(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={
          createRecipeMutation.isPending
            ? 'Creating the recipe...'
            : 'Create a New Recipe'
        }
        disabled={!title}
      />
      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          <br />
          New recipe created successfully!
        </>
      ) : null}
    </form>
  )
} // end function
