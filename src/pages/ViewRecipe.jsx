import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Header } from '../components/Header.jsx'
import { Recipe } from '../components/Recipe.jsx'
import { getRecipeById } from '../api/recipes.js'

import { useEffect, useState } from 'react'
import { recipeTrackEvent } from '../api/events.js'

export function ViewRecipe({ recipeId }) {
  // Session states ===========================================================
  const [session, setSession] = useState()

  // Mutation to handle the user view event and update the system =============
  const trackEventMutation = useMutation({
    mutationFn: (action) => recipeTrackEvent({ recipeId, action, session }),
    onSuccess: (data) => setSession(data?.session),
  })

  // Define a hook to handle page view ========================================
  /* 
      Note: 
      -- will call the mutation after one (1) second has elapsed 
         to record the user has viewed the page

  */
  useEffect(() => {
    let timeout = setTimeout(() => {
      trackEventMutation.mutate('startview')
      timeout = null
    }, 1000)

    return () => {
      if (timeout) clearTimeout(timeout)
      else trackEventMutation.mutate('endview')
    }
  }, [])

  // Query function ===========================================================
  const recipeQuery = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })

  // Save the recipe data that is queried =========
  const recipe = recipeQuery.data

  // Form for displaring the data =================
  return (
    <div style={{ padding: 10 }}>
      {recipe.title && (
        <Helmet>
          <title>{recipe.title} | This Is The Recipe Blog </title>
        </Helmet>
      )}
      <Header />
      <br />
      <hr />
      <Link to='/'> Click To Go Back To Main Page </Link>
      <br />
      <hr />
      {recipe ? (
        <Recipe {...recipe} fullPost />
      ) : (
        `Recipe with id${recipeId} not found!`
      )}
      <button type='button'> Click Here To Like </button>
    </div>
  )
}
ViewRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
