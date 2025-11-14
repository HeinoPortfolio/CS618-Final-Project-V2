import PropTypes from 'prop-types'
import { User } from './User.jsx'

// Recipe component ===========================================================
/*  
    Note: 
        Will display a single recipe and its associated information.
        Will display the title, author, ingredient list and the actual image 
        of the recipe
        Will display the ingredient list as a list if separated by the new
        line (\n) character

*/
export function Recipe({ title, author: userId, ingredientList, imageURL }) {
  return (
    <article>
      <h3>{title}</h3>

      <div>
        <pre>{ingredientList}</pre>
      </div>
      <div>
        <img src={imageURL} width='200' height='150' alt={title} />
      </div>
      {userId && (
        <em>
          <br />
          Written by:{' '}
          <strong>
            <User id={userId} />
          </strong>
        </em>
      )}
    </article>
  )
} // end Recipe

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredientList: PropTypes.string,
  author: PropTypes.string,
  imageURL: PropTypes.string,
}
