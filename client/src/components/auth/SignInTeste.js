import React from 'react'

class SigninTeste extends React.Component {
  render() {
    return (
      <div>
        <h2>Form elements</h2>
        <form action="/myform" method="post">
          <p>
            Textbox: <br />
            <input type="text" name="test" />
          </p>
          <p>Textarea: <br />
            <textarea name="textarea_1" value="My Textarea" />
          </p>
          <p>Checkbox: <br />
            <input type="checkbox" name="category" value="category1" /> Cat1
<input type="checkbox" name="category" value="category2" /> Cat2
<input type="checkbox" name="category" value="category3" /> Cat3
</p>
          <p>Radio: <br />
            <input type="radio" name="location" value="location1" /> Loc1
<input type="radio" name="location" value="location2" /> Loc2
<input type="radio" name="location" value="location3" /> Loc3
</p>
          <p>Select: <br />
            <select name="product" defaultValue={2}>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </p>
          <input type="submit" value="Submit Form" />
        </form>
      </div>
    );
  }
}

export default SigninTeste