# Learn React Testing 📚

An introduction to integration testing React components.

### Learning outcomes

1.  Jest test runner
1.  Rendering to the DOM in Node
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

## Workshop

### Part One: Jest

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

#### Test syntax

Clone this repo and run `npm i` to install the dependencies (just Jest and some Babel config so it understands ES6/React).

Run `npm t` to start the test watcher. You should see a few tests passing and one failing. Open up the `intro/intro.test.js` file to find them.

You create a test the same as in Tape: a function called `test` that takes a name string as the first argument and a function as the second.

```js
test("Jest is working", () => {
  expect(true).toBeTruthy();
});
```

You can group a set of related tests into a block with `describe`.

Fix the broken test and you should see the test automatically re-run in your terminal (and hopefully pass).

**Note**:

It's worth noting that `toEqual` performs a recursive check of all properties on an object (sometimes called deep equal). `toBe` on the other hand checks object identity. This means these two objects would pass a `toEqual` check, but not a `toBe`:

```js
const dip1 = {
  name: "hummus",
  flavour: "*****"
};

const dip2 = {
  name: "hummus",
  flavour: "*****"
};
```

---

#### Your first test

We'll do a couple of quick unit tests just to make sure your Jest environment is set up correctly and you've got the syntax down.

Have a look at the `workshop/utils/jadenCase.js` helper function. It turns regular strings into philosophical [Jaden Smith tweets](https://twitter.com/officialjaden) (That Are Formatted With This Strange Capitalisation).

Create a file in `utils/` called `jadenCase.test.js`, then write two tests:

1.  Check that the helper capitalises the first letter of a single word
1.  Check that it capitalises the first letter of every word in a lowercase sentence

---

### Part Two: Testing React components

So how do we test React components? We're going to try and test them as closely to how they'll really be used as possible. That means rendering them in a "DOM" and firing events to test user interaction.

#### jsdom

Jest comes with [jsdom](https://github.com/jsdom/jsdom) set-up. This is a Node implementation of most of the browser APIs needed to interact with the DOM. This means we can treat our Jest environment as if it were a browser.

#### React Testing Library

We'll be using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (RTL) to render our React components to jsdom, fire events and find things on the "page".

#### Rendering

We can render our components to jsdom using RTL's [`render`](https://testing-library.com/docs/react-testing-library/api#render) method.

```jsx
import React from "react-dom";
import { render } from "react-testing-library";
import Button from "./Button";

test("The button renders", () => {
  render(<Button>click me</Button>);
});
```

#### Finding our elements

The return value of `render` is an object with [useful methods](https://testing-library.com/docs/dom-testing-library/api-queries#queries) for finding elements on the page. You can destructure them out like this:

```jsx
import React from "react-dom";
import { render } from "react-testing-library";
import Button from "./Button";

test("The button renders", () => {
  const { getByText } = render(<Button>click me</Button>);
  const buttonNode = getByText("click me"); // <button>click me</button>;
});
```

We're using `getByText` to search for an element with a certain text content (the same way a user would).

The object that `render` returns includes lots of useful things, including:

- `container` is the div your component was rendered into.
- `getByText`, `getByLabelText` and `getByTestId`. The first will find nodes by text content, the second by label content (for inputs), and the third by `data-testid` attributes (for nodes that are hard to find by text).
- `debug()` will pretty print the DOM tree so you can see what you're working with.

#### Testing interactivity

We're trying to test components that _do stuff_ here, so we need a way to trigger events. We'll use RTL's [`fireEvent`](https://testing-library.com/docs/api-events#fireevent) export for this.

Imagine the `Button` component we're testing changes its text from 'click me' to 'just clicked' when you click it.

```jsx
import React from "react-dom";
import { render } from "react-testing-library";
import Button from "./Button";

test("The button renders", () => {
  const { getByText } = render(<Button>click me</Button>);
  const buttonNode = getByText("click me"); // <button>click me</button>;
  fireEvent.click(buttonNode);
  getByText("just clicked"); // the same button node with updated text
  // getByText will fail the test if it can't find an element with matching text
});
```

---

Open the `workshop/toggle` folder. There's a component in there that will show or hide its children when a button is pressed.

Create a file called `toggle.test.js` and write a test that renders the `Toggle`, then triggers a click on the button and asserts that the children you passed in have been rendered.

<details>
<summary>Click for a hint</summary>

```jsx
const { getByText } = render(<Toggle>text I can search for</Toggle>);
```

</details>

---

**Note:**

If you read the docs for `render` you'll see that it's recommended to be used with the `cleanup` function. This will ensure you don't end up with lots of copies of your component in the same document.

You can use Jest's handy method that runs after each test to do this: `afterEach(cleanup)`.

---

Refactor your `Toggle` test from before to use React Testing Library. It's also worth reading the [Queries section of the docs](https://testing-library.com/docs/api-queries) as they're not too long and cover a few more methods that you might want to use.

---

### Part Four: Testing a real component

Let's get testing a more complex component. Run `npm run dev` and take a look at http://localhost:1234. We're going to write some tests for the Jadenizer component on the left.

Have a look at `workshop/jadenizer/jadenizer`. This component renders a form containing an input. When submitted it converts the input string to Jaden Case and renders it under the form.

Create a file in the same directory called `jadenizer.test.js`. Use React Testing Library to:

1.  render the Jadenizer component
1.  input a string
1.  submit the form
1.  assert that the string is correctly converted to Jaden Case and rendered

It's worth writing a few tests to cover different potential scenarios the app might encounter with real use. What happens if a user submits an empty form?

### Interlude: async tests

You need to ensure your test doesn't finish before your async code has run. The simplest way to do this is to return a promise. Jest will spot this and wait for the promise to resolve before finishing the test:

```js
test("Async code", () => {
  return fetch("http://test").then(res => {
    expect(res.ok).toBeTruthy();
  });
});
```

### Part Five: Mocking network requests

You may have noticed another component on the page. This one takes some text input, then submits it to a [Node server](https://github.com/oliverjam/micro-marked) that converts Markdown to HTML. It then renders the HTML to the page.

Testing this component is going to be a little trickier because of that network request. First we need to consider that our DOM is going to get updated asynchronously because React will wait for the API call to finish befor rendering. React Testing Library exposes [`findByText`](https://testing-library.com/docs/api-queries#findby) etc methods that you can use when you need to wait for an element to appear.

We don't need to waste time testing the API. Those tests should live with the source code in that repo. We want to test that our React component does what we expect. So what we want is a way to intercept any network requests made by our component and respond with a mock value, so we can test what our component does once it receives the response.

Create a test file in the `workshop/markdownifier/` directory, and then we can mock the global `fetch` method.

Jest has a built-in way to create mocked functions using `jest.fn()`. You can read more about that in [the Jest docs](https://jestjs.io/docs/en/mock-functions).

We want to replace the globally available fetch implementation with our own one that returns some mock data for our test. We need to make sure it matches the implementation in our component—e.g. we expect it to return a promise that resolves with a response object with a `text` method that also returns a promise that eventually resolves with our mock HTML.

If you want to have a go at trying to implement this yourself feel free; if not there's a ready-made one below :)

<details>
<summary>Spoiler</summary>
<div class="highlight highlight-source-js-jsx">
<pre>
const mockResponse = `insert your mock html here`;
global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ text: () => Promise.resolve(mockResponse) })
  );
</pre>
</div>
</details>

Write some tests that:

1.  set up a fetch mock that responds with what you expect
1.  render the Markdownifier component
1.  input some markdown
1.  submit the form
1.  assert that Markdownifier submitted the right request to the API
1.  assert that Markdownifier rendered the mocked HTML response

## Caveats (for completeness)

We deliberately haven't covered a couple of things that you'll encounter a lot in the React world. Here's our justification for why 🙃

### Enzyme

Enzyme is a very popular React testing library from Airbnb. It has some of the same functionality as React Testing Library, but can do _a lot_ more stuff, and has a correspondingly bigger API. It can be a bit overwhelming at first, and makes it easy to write bad tests since you can pretty much do anything with it.

For example you can "shallow render" a component (i.e. not to a real DOM), and then test your component methods directly (e.g. by calling `handleClick` instead of actually simulating a click on a button). This can encourage you to test implementation details of the component, rather than the user-facing "API"—the rendered UI.

That's not to say you can't write good tests with Enzyme, just that when you're learning it's easier to have a more limited API that guides you in the right direction.

### Snapshot testing

Jest has a feature called "snapshots". This is a way to automatically take a copy of your test output (the first time it runs), then assert that this output hasn't change for all subsequent test runs. (Jest keeps these in a `__snapshots__` directory next to the test file). This can sometimes get overused as it's very easy to simply render a component, create a snapshot and end up with a test that fails whenever the rendered output changes.

They're also reliant on your code outputting the correct result the first time the test runs, otherwise you're asserting against an already wrong snapshot.

Over the last 9 months we've become less and less enamoured with snapshot testing components at Ticketmaster. They end up effectively serving the same purpose as reviewing a diff in a PR. You change the render method of a component, see the snapshot fail (duh, you just changed it), then have to update it.

Snapshots are useful for testing generated output and making sure it doesn't change when you refactor. For example we use them for testing date/currency formatting where it would be a hassle to maintain a list of all the correctly formatted strings.
