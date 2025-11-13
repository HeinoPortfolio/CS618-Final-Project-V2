import PropTypes from 'prop-types'

// Recipe filter component ====================================================
export function RecipeFilter({ field }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}> {field}: </label>

      <input type='text' name={`filter-${field}`} id={`filter-${field}`} />
    </div>
  )
}

RecipeFilter.propTypes = {
  field: PropTypes.string.isRequired,
}
