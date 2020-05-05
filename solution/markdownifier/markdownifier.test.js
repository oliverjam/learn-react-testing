import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Markdownifier from "../../workshop/markdownifier/markdownifier";

const mockResponse = `<h1 id="a-heading">a heading</h1>`;

// fetch is a function that returns a promise
// The promise resolves with an object containing a `text` property
// `text` is also a function that returns a promise
// This promise resolves with the text response
// e.g. it is be used like this inside the component:
// fetch("blah").then(res => res.text()).then(html => console.log(html))
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
  fireEvent.click(button);

  // check that our mock fetch has been called
  expect(global.fetch).toHaveBeenCalledTimes(1);

  // Jest will wait for a promise if you return it from the test:
  // https://facebook.github.io/jest/docs/en/asynchronous.html#promises
  // Otherwise the test will end immediately and the async bit won't run
  return screen.findByText("a heading", { selector: "h1" });
  // the second argument to query methods is an options object
  // here we're specifying a selector to check that the element is an h1
  // this verifies that the html response from the API is rendered correctly
});
