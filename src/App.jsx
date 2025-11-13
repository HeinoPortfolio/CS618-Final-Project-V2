import { Recipe } from './components/Recipe.jsx'

export function App() {
  return (
    <Recipe
      title='Another simple recipe'
      ingredientList='This is another a simple recipe. \n With a new line.'
      author='George Heino'
      imageURL='http://someurl.com'
    />
  )
}

export default App
