import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import { render, fireEvent } from "react-testing-library";
import Toggle from "../../workshop/toggle/toggle.js";

test("The toggle toggles when clicked", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Toggle>just clicked</Toggle>, root);
  document.body.appendChild(root);
  const buttonNode = root.querySelector("button");
  buttonNode.click();
  const childrenNode = root.lastChild;
  expect(childrenNode.textContent).toEqual("just clicked");
});

//react-testing-library solution
test("The toggle toggles when clicked", () => {
  const { getByText } = render(<Toggle>just clicked</Toggle>);
  const buttonNode = getByText(/show/i);
  fireEvent.click(buttonNode);
  getByText(/just clicked/i);
});
