# Learn React Testing 📚

An introduction to integration testing React components.

## Learning outcomes

1.  Jest test runner
1.  React Testing Library
1.  Mocking a fetch request

## Introduction

### What's an integration test?

Where a unit test checks that a single "unit" of your code (usually a function) works as expected in isolation, an integration test ensures a more complete "feature" is working. This usually means testing a few tightly couples pieces of your code in one go.

For example you might render a component, check the rendered DOM for a button, click on that button, then finally check that the DOM has updated as you expected.

### Why not unit test?

Unit tests are useful for pure functions, but it's hard to unit test a UI. Integration tests also tend to give you more coverage in a single test—a good test for a component will end up ensuring quite a lot of code works as expected.

That's not to say unit tests aren't valuable, but you can usually cover the majority of your frontend code with integration tests, then unit test things like helpers/utils and other pure functions.

### Testing philosophy

We want the bulk of our tests to be similar to a real user interacting with our application. Users don't call functions in isolation, they find bits of the UI based on labels and interact with them with their mouse or keyboard.

## Part One: Jest

Jest is a test runner like Tape. It's got quite a lot more built in, and is used very heavily in React land. The syntax for assertions is pretty similar to other testing libraries, so you don't have to learn much.

Jest will automatically look for any filenames ending in either `.test.js` or `.spec.js` and run them. It'll also run anything in a folder called `__tests__`. This makes it easy to co-locate tests with the relevant component. This is a common component folder set-up:

```
button
├── button.css
├── button.js
└── button.test.js
```

We can create a test script in our `package.json`:

```
"test": "jest --watch"
```

The `--watch` starts Jest in watch mode. This will automatically run any tests relating to files that have changed.

You create Jest tests using the `test` function. This is provided as a global variable so you don't need to import it. It takes two arguments: a label string and a callback function containing your test code.

```js
test("Jest is working", () => {
  expect(true).toBeTruthy();
});
```

Jest has lots of useful assertions for writing tests. Here are a few useful ones:

```js
expect(x).toBeTruthy();
expect(x).toBeFalsy();
expect(x).toEqual(y);
```

## Workshop setup

1. Clone this repo
1. Run `npm i` to install the dependencies
1. Run `npm test` to start the test watcher

### Your first test

We'll do a couple of quick unit tests just to make sure your Jest environment is set up correctly and you've got the syntax down.

Have a look at the `workshop/utils/jadenCase.js` helper function. It turns regular strings into philosophical [Jaden Smith tweets](https://twitter.com/jaden/status/329768040235413504?lang=en) (That Are Formatted With This Strange Capitalisation).

Create a file in `utils/` called `jadenCase.test.js`, then write two tests:

1. Check that the helper capitalises the first letter of a single word
1. Check that it capitalises the first letter of every word in a lowercase sentence

## Part Two: Testing React components

So how do we test React components? We're going to try and test them as closely to how they'll really be used as possible. That means rendering them in a "DOM" and firing events to test user interaction.

### `jsdom`

Jest comes with [jsdom](https://github.com/jsdom/jsdom) set-up. This is a Node implementation of most of the browser APIs needed to interact with the DOM. This means we can treat our Jest environment as if it were a browser.

### React Testing Library

We'll be using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (RTL) to render our React components to jsdom, fire events and find things on the "page".

### Rendering

We can render our components to jsdom using RTL's [`render`](https://testing-library.com/docs/@testing-library/react/api#render) method.

```jsx
import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

test("The button renders", () => {
  render(<Button>click me</Button>);
});
```

### Finding our elements

We need a way to access DOM elements on the page in order to test them. RTL exports a `screen` object containing lots of different query functions that let us search the DOM.

```jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("The button renders", () => {
  render(<Button>click me</Button>);
  const buttonNode = screen.getByText("click me");
});
```

We're using `screen.getByText` to search for an element with a certain text content (the same way a user would). Another useful method is `screen.getByLabelText`. This finds an input using its label text.

Here's the [full list of queries](https://testing-library.com/docs/dom-testing-library/api-queries). All methods starting with `getBy` will automatically fail your test if they can't find a matching element. That means you don't necessarily need any assertions.

### Debugging the DOM

One more useful method is `screen.debug`. Calling it will pretty print the entire DOM to your terminal. You can also pass this a single element for a smaller log. This is helpful for checking the DOM you're actually rendering (since you can't see it in a real browser).

### Testing interactivity

We're trying to test components that _do stuff_ here, so we need a way to trigger events. We'll use RTL's [`fireEvent`](https://testing-library.com/docs/api-events#fireevent) export for this.

Imagine the `Button` component we're testing changes its text from 'click me' to 'just clicked' when you click it. We need to find the button, fire a click event, then search for the updated button text to verify the DOM was correctly changed.

```jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("The button renders", () => {
  render(<Button>click me</Button>);
  const buttonNode = screen.getByText("click me"); // <button>click me</button>;
  fireEvent.click(buttonNode);
  screen.getByText("just clicked"); // the same button node with updated text
  // getByText will fail the test if it can't find an element with matching text
});
```

---

Open the `workshop/toggle` folder. There's a component in there that will show or hide its children when a button is pressed.

Create a file called `toggle.test.js` and write a test that renders the `Toggle`, then triggers a click on the button and asserts that the children you passed in have been rendered.

<details>
<summary>Click for a hint</summary>

```jsx
render(<Toggle>some text that will appear</Toggle>);
// get the button
// click on the button
// verify that "some text that will appear" is on the page
```

</details>

---

## Part Four: Testing a real component

Let's get testing a more complex component. Run `npm run dev` and take a look at http://localhost:1234. We're going to write some tests for the Jadenizer component on the left.

Have a look at `workshop/jadenizer/jadenizer.js`. This component renders a form containing an input. When submitted it converts the input string to Jaden Case and renders it under the form.

Create a file in the same directory called `jadenizer.test.js`. Use React Testing Library to:

1.  render the Jadenizer component
1.  use `fireEvent` to type something into the input
1.  use `fireEvent` to submit the form
1.  assert that a JadenCased version of the string you entered is rendered

### Hint

```javascript
fireEvent.change(inputNode, { target: { value: "my mock value" } });
```

## Async tests

When testing asynchronous code we need to ensure our test doesn't finish before our code has run. Otherwise the test will immediately pass before any of our promises etc resolve.

The simplest way to do this is to return a promise. Jest will spot this and wait for the promise to resolve before finishing the test:

```js
test("Async code", () => {
  return fetch("http://test").then((res) => {
    expect(res.ok).toBeTruthy();
  });
});
```

---

## Part Five: Mocking network requests

You may have noticed another component on the page. This one takes some text input, then submits it to a [Node server](https://github.com/oliverjam/micro-marked) that converts Markdown to HTML. It then renders the HTML to the page.

Testing this component is going to be a little trickier because of that network request. First we need to consider that our DOM is going to get updated asynchronously because React will wait for the API call to finish before updating the page.

### Searching for elements that aren't there yet

React Testing Library has asynchronous variants of all the `getBy` methods—they start with `findBy` instead. For example [`findByText`](https://testing-library.com/docs/api-queries#findby) will search for an element by its text content, but return a promise. The promise either resolves when that element eventually appears, or rejects if it doesn't appear after 5 seconds.

### Mocks

We don't need to waste time testing the API. Those tests should live with the source code in that repo. We want to test that our React component does what we expect. So what we want is a way to intercept any network requests made by our component and respond with a mock value, so we can test what our component does once it receives the response.

Create a test file in the `workshop/markdownifier/` directory, and then we can mock the global `fetch` method.

Jest has a built-in way to create mocked functions using `jest.fn()`. You can read more about that in [the Jest docs](https://jestjs.io/docs/en/mock-functions).

We want to replace the globally available fetch implementation with our own one that returns some mock data for our test. We need to make sure it matches the implementation in our component—e.g. we expect it to return a promise that resolves with a response object with a `text` method that also returns a promise that eventually resolves with our mock HTML.

If you want to have a go at trying to implement this yourself feel free; if not there's a ready-made one below :)

<details>
<summary>Spoiler</summary>

```javascript
const mockResponse = `insert your mock html here`;
global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ text: () => Promise.resolve(mockResponse) })
  );
```

</details>

Write some tests that:

1. Set up a fetch mock that responds with what you expect
1. Render the Markdownifier component
1. Input some markdown
1. Submit the form
1. Ensure that Markdownifier submitted the right request to the API
1. Ensure that Markdownifier rendered the mocked HTML response
