import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "../../workshop/toggle/toggle";

test("The toggle toggles when clicked", () => {
  render(<Toggle>just clicked</Toggle>);
  const buttonNode = screen.getByText(/show/i);
  fireEvent.click(buttonNode);
  screen.getByText(/just clicked/i);
});
