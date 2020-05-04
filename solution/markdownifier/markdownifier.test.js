import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Markdownifier from "../../workshop/markdownifier/markdownifier";

// ensures our document gets cleared out after each test
// so we don't have lots of copies of our component in there
// otherwise our tests might affect each other
afterEach(cleanup);

const mockResponse = `<h1 id="a-heading">a heading</h1>`;
global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ text: () => Promise.resolve(mockResponse) })
  );

test("Markdownifier component", () => {
  const { debug, getByText, getByLabelText, findByTestId } = render(
    <Markdownifier />
  );

  const input = getByLabelText("Enter markdown");
  fireEvent.change(input, { target: { value: "# a heading" } }); // fire a change event with the right value

  const button = getByText("Markdownify");
  fireEvent.click(button); // fire a real browser event on the submit button

  // check that our mock fetch has been called
  expect(global.fetch).toHaveBeenCalledTimes(1);

  // Jest will wait for a promise if you return it from the test:
  // https://facebook.github.io/jest/docs/en/asynchronous.html#promises
  // Otherwise the test will end immediately and the async bit won't run
  return findByTestId("output").then((output) =>
    expect(output.innerHTML).toEqual(mockResponse)
  );
});
