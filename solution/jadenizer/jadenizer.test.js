import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Jadenizer from "../../workshop/jadenizer/jadenizer";

test("Jadenizer component", () => {
  render(<Jadenizer />);

  const input = screen.getByLabelText("Enter text for Jadenization");
  fireEvent.change(input, {
    target: { value: `how can mirrors be real if our eyes aren't real` },
  }); // fire the onChange event with a value

  const button = screen.getByText("Jadenize");
  fireEvent.click(button); // fire a real browser event on the submit button

  screen.getByText("How Can Mirrors Be Real If Our Eyes Aren't Real");
});
