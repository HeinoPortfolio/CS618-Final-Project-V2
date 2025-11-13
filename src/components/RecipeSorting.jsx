import PropTypes from 'prop-types'

// Recipe sorting component ===================================================
export function RecipeSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}) {
  return (
    <div>
      <label htmlFor='sortBy'>Sort By: &nbsp;</label>
      <select
        name='sortBy'
        id='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      &nbsp;
      <label htmlFor='sortOrder'> &nbsp;Sort Order: &nbsp;</label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value={'ascending'}>Ascending </option>
        <option value={'descending'}>Descending </option>
      </select>
    </div>
  )
}

RecipeSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}
