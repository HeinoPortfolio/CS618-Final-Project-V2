import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { RecipeStat } from './RecipeStat.jsx'

// Recipe list component - to list all the recipes in the database ============
export function RecipeListStat({ recipes = [] }) {
  return (
    <div>
      <hr />
      {recipes.map((recipe) => (
        <Fragment key={recipe._id}>
          <RecipeStat {...recipe} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

RecipeListStat.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(RecipeStat.propTypes)).isRequired,
}
