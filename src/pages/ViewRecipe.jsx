import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Header } from '../components/Header.jsx'
import { Recipe } from '../components/Recipe.jsx'
import { getRecipeById } from '../api/recipes.js'
//import { getUserInfo } from '../api/users.js'
import { /*useEffect,*/ useState } from 'react'
import { recipeTrackEvent } from '../api/events.js'
import { RecipeStatistics } from '../components/RecipeStatistics.jsx'

export function ViewRecipe({ recipeId }) {
  // Button states ===============================
  const [likeText, setButtonText] = useState('Click Here To Like')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [textFieldValue, setTextFieldValue] = useState('')

  // Session states ========================================
  const [session, setSession] = useState()

  const trackEventMutation = useMutation({
    mutationFn: (action) => recipeTrackEvent({ recipeId, action, session }),
    onSuccess: (data) => setSession(data?.session),
  })

  // Define a hook to handle page view =================
  /*
  useEffect(() => {
    let timeout = setTimeout(() => {
      trackEventMutation.mutate('startView')
      timeout = null
    }, 1000)

    return () => {
      if (timeout) clearTimeout(timeout)
      else trackEventMutation.mutate('endView')
    }
  }, [])
  */

  const navigate = useNavigate()

  // Query function =========
  const recipeQuery = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })

  // Save the recipe data that is queried =========
  const recipe = recipeQuery.data

  // Function to handle the button click ===========
  const handleLikeClick = () => {
    setButtonText('Recipe Liked!')

    // Show information to the user ==
    setTextFieldValue('Returning to main page after two seconds.')

    // Disable the button after click
    setIsButtonDisabled(true)

    // Trigge the mutation ===========
    trackEventMutation.mutate('liked')

    // Return back to the mainpage
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  // Form for displaring the data =================
  return (
    <div style={{ padding: 10 }}>
      {recipe.title && (
        <Helmet>
          <title>{recipe.title} </title>
        </Helmet>
      )}
      <Header />
      <br />
      <hr />
      <Link to='/'> Click To Go Back To Main Page </Link>
      <br />
      <hr />
      {recipe ? (
        <div>
          <Recipe {...recipe} fullPost />
          <hr />
          <RecipeStatistics recipeId={recipeId} />
        </div>
      ) : (
        `Recipe with id${recipeId} not found!`
      )}

      <button onClick={handleLikeClick} disabled={isButtonDisabled}>
        {likeText}
      </button>
      <br />
      <input
        type='text'
        value={textFieldValue}
        style={{ width: 300, height: 10 }}
        readOnly
      />
    </div>
  )
}
ViewRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
