import React from "react";
import "./Form.css";

const Form = props => {
  return (
    <form>
      <label>
        How will you discover new music?
        </label>
      <br />
      <input id="text" type="text" name="name" />
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
}
export default Form;