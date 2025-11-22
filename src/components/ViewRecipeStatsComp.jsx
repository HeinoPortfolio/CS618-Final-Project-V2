import { useState } from 'react'
import { getLikesInfo } from '../api/events.js'
import { useQuery } from '@tanstack/react-query'
import { User } from './User.jsx'

export function ViewRecipeStatsComp() {
  // Remove bullets from posts ====================
  const listStyle = {
    listStyleType: 'none',
  }

  const recipeInfoQuery = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getLikesInfo(),
    enabled: true,
  })

  const recipesStat = recipeInfoQuery.data ?? []

  // States for the sorting ===================================================
  const [recipes, setPosts] = useState(recipesStat)

  const sortAscending = () => {
    const sortedPosts = [...recipes].sort((a, b) => a.totalLikes - b.totalLikes)
    setPosts(sortedPosts)
  }

  const sortDescending = () => {
    const sortedPosts = [...recipes].sort((a, b) => b.totalLikes - a.totalLikes)
    setPosts(sortedPosts)
  }
  if (recipeInfoQuery.isLoading) {
    return <div>Loading recipe stats...</div>
  }
  return (
    <div
      style={{
        padding: 8,
        fontSize: 22,
      }}
    >
      <br />
      <br />
      <hr />
      <h1>The Ranked Recipe List </h1>
      <h2>Sort The Recipes By Number Of Likes</h2>
      <button onClick={sortAscending}>Sort By Least Liked</button> &nbsp;&nbsp;
      <button onClick={sortDescending}>Sort By Most Liked</button>
      <br />
      <br />
      <div
        style={{
          padding: 12,
          maxHeight: '500px',
          maxWidth: '1000px',
          overflowY: 'scroll',
          overflowX: 'scroll',
          border: '3px solid #ccc',
        }}
      >
        <ul style={listStyle}>
          {recipes.map((recipe) => (
            <li key={recipe.recipeId}>
              <b>Title:</b> {recipe.title}
              <br />
              <b>Author:</b> <User id={recipe.author} />
              <br />
              <b>Ingredient List:</b> <pre>{recipe.ingredientList}</pre>
              <b>Total Likes:</b> {recipe.totalLikes}
              <br />
              <br /> Image of recipe:
              <br />
              <br />
              <img
                src={recipe.imageURL}
                width='200'
                height='200'
                alt={recipe.title}
              />
              <br />
              <br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
      <br />
    </div>
  )
}
