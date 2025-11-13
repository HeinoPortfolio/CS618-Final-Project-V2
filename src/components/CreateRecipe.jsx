export function CreateRecipe() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor='create-title'>
          <b>Recipe Title: </b>
        </label>
        <input type='text' name='create-title' id='create-title' />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>
          {' '}
          <b>Author: </b>
        </label>
        <input type='text' name='create-author' id='create-author' />
      </div>
      <br />
      <div>
        <label htmlFor='create-imageURL'>
          <b>URL for image: </b>
        </label>
        <input type='text' name='create-imageURL' id='create-imageURL' />
      </div>
      <br />
      <label htmlFor='recibe-box'>
        <b>Enter the recipe&#39;s ingredients below: </b>
      </label>
      <br />
      <textarea id='comment-box' name='recipe-area' rows='10' cols='40' />
      <br />
      <br />
      <input type='submit' value='Create' />
    </form>
  )
}
