import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'
import { useState } from 'react'
import { Header } from '../components/Header.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
import { Helmet } from 'react-helmet-async'

import { useNavigate } from 'react-router-dom'
import { ViewRecipeStatsComp } from '../components/ViewRecipeStatsComp.jsx'

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

  // Button states ============================================================
  const [likeStatText] = useState('Click Here To View Recipe Like Statistics')

  // Create a navigate to page
  const navigate = useNavigate()

  // Function to handle the button click ===========
  const handleLikeClick = () => {
    // Go to the recipe statistics page
    navigate('/ViewRecipeStats')
  }

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

  // Get the socket conection
  const { status } = useSocket()

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>The Recipe Blog</title>
      </Helmet>
      <Header />
      <br />
      The connection status is:&nbsp;&nbsp; <b>{status} </b>
      <br />
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
      <RecipeSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <br />
      <br />
      <button onClick={handleLikeClick}> {likeStatText}</button>
      <br />
      <hr />
      <div
        style={{
          maxHeight: '600px',
          maxWidth: '600px',
          overflowY: 'scroll',
          overflowX: 'scroll',
          border: '3px solid #ccc',
          padding: '50px',
        }}
      >
        <RecipeList recipes={recipes} />
      </div>
      <ViewRecipeStatsComp />
    </div>
  )
}
