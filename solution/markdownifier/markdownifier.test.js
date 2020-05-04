import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Markdownifier from "../../workshop/markdownifier/markdownifier";

const mockResponse = `<h1 id="a-heading">a heading</h1>`;
global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ text: () => Promise.resolve(mockResponse) })
  );

test("Markdownifier component", () => {
  render(<Markdownifier />);

  const input = screen.getByLabelText("Enter markdown");
  fireEvent.change(input, { target: { value: "# a heading" } }); // fire a change event with the right value

  const button = screen.getByText("Markdownify");
  fireEvent.click(button); // fire a real browser event on the submit button

  // check that our mock fetch has been called
  expect(global.fetch).toHaveBeenCalledTimes(1);

  // Jest will wait for a promise if you return it from the test:
  // https://facebook.github.io/jest/docs/en/asynchronous.html#promises
  // Otherwise the test will end immediately and the async bit won't run
  return screen
    .findByTestId("output")
    .then((output) => expect(output.innerHTML).toEqual(mockResponse));
});
