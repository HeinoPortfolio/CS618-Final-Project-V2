import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'

// Recipe component ===========================================================
/*  
    Note: 
        Will display a single recipe and its associated information.
        Will display the title, author, ingredient list and the actual image 
        of the recipe
        Will display the ingredient list as a list if separated by the new
        line (\n) character

*/
// Recipe component ===========================================================
export function Recipe({
  title,
  author,
  ingredientList,
  imageURL,
  _id,
  fullPost = false,
}) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${_id}`}>
          <h3> {title} </h3>
          <div style={{ 'font-size': '18px' }}>
            <pre>{ingredientList}</pre>
          </div>
          <div>
            Image of recipe:
            <br />
            <br />
            <img src={imageURL} width='200' height='200' alt={title} />
            <br />
            <br />
          </div>
        </Link>
      )}
      {fullPost && <div>{ingredientList}</div>}
      {author && (
        <em>
          {' '}
          {fullPost && <br />}
          Written by:{' '}
          <strong>
            <User id={author} />
          </strong>
        </em>
      )}
      {fullPost && (
        <div>
          <br />
          Image of recipe:
          <br />
          <br />
          <img src={imageURL} width='200' height='200' alt={title} />
          <br />
          <br />
        </div>
      )}
    </article>
  )
} // end Recipe

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredientList: PropTypes.string,
  author: PropTypes.string,
  imageURL: PropTypes.string,
  _id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
