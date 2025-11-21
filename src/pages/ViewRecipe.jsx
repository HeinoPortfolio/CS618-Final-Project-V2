import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
//import { Helmet } from 'react-helmet-async'
import { Header } from '../components/Header.jsx'
import { Recipe } from '../components/Recipe.jsx'
import { getRecipeById } from '../api/recipes.js'
//import { getUserInfo } from '../api/users.js'

export function ViewRecipe({ recipeId }) {
  // Query function =========
  const recipeQuery = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })

  // Save the recipe data that is queried =========
  const recipe = recipeQuery.data

  // Form for displaring the data =================
  return (
    <div style={{ padding: 10 }}>
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
