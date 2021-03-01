import React from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const App = () => (
  <Styles>
    <h1>🏁 React Final Form - Simple Example</h1>
    <a href="https://github.com/erikras/react-final-form#-react-final-form">
      Read Docs
    </a>
    <Form
      onSubmit={onSubmit}
      mutators={{ upper, lower }}
      initialValues={{ stooge: "larry", employed: false }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div>
            <label>Last Name</label>
            <Field
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                form.mutators.upper("firstName");
                form.mutators.upper("lastName");
              }}
              disabled={submitting || pristine}
            >
              ToUpperCase
            </button>
            <button
              type="button"
              onClick={() => {
                form.mutators.lower("firstName");
                form.mutators.lower("lastName");
              }}
              disabled={submitting || pristine}
            >
              ToLowerCase
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  </Styles>
);

/** Converts a form value to uppercase **/
const upper = ([name], state, { changeValue }) => {
  changeValue(state, name, value => value && value.toUpperCase());
};

/** Converts a form value to uppercase **/
const lower = ([name], state, { changeValue }) => {
  changeValue(state, name, value => value && value.toLowerCase());
};

render(<App />, document.getElementById("root"));
