import { RecipeList } from './components/RecipeList.jsx'

export function App() {
  // Create some test recipes =============================================
  const recipes = [
    {
      title: 'This is a test recipe title',
      ingredientList: 'Some ingredients go here. \nSome others go here.',
      author: 'Matthew Heino',
      imageURL: 'http://someUrl1.com',
    },
    {
      title: 'This is another test recipe title',
      ingredientList: 'Some other ingredients go here. \nMore go here.',
      author: 'Claudia Heino',
      imageURL: 'http://someUrl1.com',
    },
  ]

  return <RecipeList recipes={recipes} />
}
