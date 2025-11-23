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

import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'

import slug from 'slug'
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
        <Link to={`/recipes/${_id}/${slug(title)}`}>
          <h3> {title} </h3>
          <div style={{ fontSize: '18px' }}>
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
      {fullPost && (
        <div style={{ fontSize: '18px' }}>
          <pre>{ingredientList}</pre>
        </div>
      )}
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
  title: PropTypes.string,
  ingredientList: PropTypes.string,
  author: PropTypes.string,
  imageURL: PropTypes.string,
  _id: PropTypes.string,
  fullPost: PropTypes.bool,
}
