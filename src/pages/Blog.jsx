import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'
import { useState } from 'react'

import { Header } from '../components/Header.jsx'

import { Status } from '../components/Status.jsx'

export function Blog() {
  // Use states of the BLog application ===================
  /* 
    Note:  The default states are the following:
    -- author, setAuthor: undefined
    -- sortBy, setSortby: created at date ['createdAt]
    -- sortOrder, setSortOrder: descending 
  */
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // Create a usequery instance ===========================
  /* 
    Note:  Will use the getRecipes API to make 
    the call to get the recipes  
  */
  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })

  // Get the data from the query ============================
  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 10 }}>
      <Header />
      <br />
      <Status />
      <br />
      <CreateRecipe />
      <br />
      <hr />
      <b>Filter by:</b>
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <hr />

      <RecipeSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <div
        style={{
          maxHeight: '600px',
          maxWidth: '800px',
          overflowY: 'scroll',
          overflowX: 'scroll',
          border: '3px solid #ccc',
          padding: '50px',
        }}
      >
        <RecipeList recipes={recipes} />
      </div>
    </div>
  )
}
