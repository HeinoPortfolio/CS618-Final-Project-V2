import PropTypes from 'prop-types'
//import { User } from './User.jsx'

export function RecipeStat({
  title,
  ingredientList,
  author,
  imageURL,
  totalLikes,
}) {
  return (
    <article>
      <h3>{title}</h3>
      <div>
        <pre>{ingredientList}</pre>
      </div>
      {author && (
        <em>
          <br />
          Written by: {author}
        </em>
      )}
      <br />
      Image of recipe:
      <br />
      <br />
      <img src={imageURL} width='200' height='200' alt={title} />
      <br />
      <br />
      Total likes: {totalLikes}
    </article>
  )
}

RecipeStat.propTypes = {
  title: PropTypes.string,
  ingredientList: PropTypes.string,
  author: PropTypes.string,
  imageURL: PropTypes.string,
  totalLikes: PropTypes.string,
}
