import PropTypes from 'prop-types'

// Recipe component ===========================================================
/*  
    Note: 
        Will display a single recipe and its associated information.
        Will display the title, author, ingredient list and the actual image 
        of the recipe
        Will display the ingredient list as a list if separated by the new
        line (\n) character

*/
export function Recipe({ title, author, ingredientList, imageURL }) {
  return (
    <article>
      <h3>{title}</h3>

      <div>
        <pre>{ingredientList}</pre>
      </div>

      {author && (
        <em>
          <br />
          Written by: <strong>{author}</strong>
        </em>
      )}

      <div>
        <img src={imageURL} alt='' />
      </div>
    </article>
  )
} // end Recipe

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredientList: PropTypes.string,
  author: PropTypes.string,
  imageURL: PropTypes.string,
}
