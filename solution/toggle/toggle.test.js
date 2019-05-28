import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "react-testing-library";
import Toggle from "../../workshop/toggle/toggle";

test("The toggle toggles when clicked", () => {
  const { getByText } = render(<Toggle>just clicked</Toggle>);
  const buttonNode = getByText(/show/i);
  fireEvent.click(buttonNode);
  getByText(/just clicked/i);
});
