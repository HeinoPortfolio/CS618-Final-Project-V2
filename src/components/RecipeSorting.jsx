import PropTypes from 'prop-types'

// Recipe sorting component ===================================================
export function RecipeSorting({ fields = [] }) {
  return (
    <div>
      <label htmlFor='sortBy'>Sort By: &nbsp;</label>
      <select name='sortBy' id='sortBy'>
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      &nbsp;
      <label htmlFor='sortOrder'> &nbsp;Sort Order: &nbsp;</label>
      <select name='sortOrder' id='sortOrder'>
        <option value={'ascending'}>Ascending </option>
        <option value={'descending'}>Descending </option>
      </select>
    </div>
  )
}

RecipeSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
}
