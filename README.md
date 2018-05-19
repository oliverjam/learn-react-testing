# Learn React Testing 📚

An introduction to integration testing React components.

### Learning outcomes

1.  Jest test runner
1.  Rendering to a fake DOM in Node
1.  React Testing Library
1.  Mocking a fetch request

## Introduction

### What's an integration test?

Where a unit test checks that a single "unit" of your code (usually a function) works as expected in isolation, an integration test ensures a more complete "feature" is working. This usually means testing a few tightly couples pieces of your code in one go.

For example you might render a component, check the rendered DOM for a button, simulate a click on that button, then finally check that the DOM has updated as you expected.

### Why not unit test?

Since stateless React components are effectively pure functions it seems like you could unit test them. This is possible, but is not necessarily useful. For example a component like `const Button = ({ children }) => <button>{children}</button>`

is essentially just some HTML. It's rendered by React magic, but that has already been extensively tested by the wonderful React team. It seems a bit of a waste of effort to unit test this component just because it happens to be a function.

It would be better to cover this component as part of an integration test that actually checks some functionality at the same time.

### Testing philosophy

We want the bulk of our tests to be similar to a real user interacting with our application. Users don't call functions in isolation, they find bits of the UI based on labels and interact with them with their mouse or keyboard.

That's not to say unit tests aren't valuable, but you can usually cover the majority of your frontend code with integration tests, then unit test things like helpers/utils and other pure functions.

## Workshop

### Part One: Jest

Jest is a test runner like Tape. It's got quite a lot more built in, and is used very heavily in React land. The syntax for assertions is pretty similar to other testing libraries, so you don't have to learn much.

`npm i -D jest` to add it to your project

Jest will automatically look for any filenames ending in either `.test.js` or `.spec.js` and run them. It'll also run anything in a folder called `__tests__`. This makes it easy to co-locate tests with the relevant component. This is a common component folder set-up:

```
button
    ├── button.css
    ├── button.js
    └── button.test.js
```

We can run our tests by using the [convenient npx tool](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b): `npx jest`

Jest has a convenient watch mode that will automatically run any tests that change. You can use this by passing `--watch` to Jest (`npx jest --watch`)

#### Test syntax

Clone this repo and run `npm i` to install the dependencies (just Jest and some Babel config so it understands ES6/React).

Run `npx jest --watch` to start the test watcher. You should see a few tests passing and one failing. Open up the `intro/intro.test.js` file to find them.

You create a test the same as in Tape: a function called `test` that takes a name string as the first argument and a function as the second.

```js
test('Jest is working', () => {
  expect(true).toBeTruthy();
});
```

You can group a set of related tests into a block with `describe`.

Fix the broken test and you should see the test automatically re-run in your terminal (and hopefully pass).

**Note**:

It's worth noting that `toEqual` performs a recursive check of all properties on an object (sometimes called deep equal). `toBe` on the other hand checks object identity. This means these two objects would pass a `toEqual` check, but not a `toBe`:

```js
const dip1 = {
  name: 'hummus',
  flavour: '*****',
};

const dip2 = {
  name: 'hummus',
  flavour: '*****',
};
```

---

#### Your first test

We'll do a couple of quick unit tests just to make sure your Jest environment is set up correctly and you've got the syntax down.

Have a look at the `workshop/utils/jadenCase.js` helper function. It turns regular strings into philosophical [Jaden Smith tweets](https://twitter.com/officialjaden).

Create a file in `utils/` called `jadenCase.test.js`, then write two tests:

1.  Check that the helper capitalises the first letter of a single word
1.  Check that it capitalises the first letter of every word in a lowercase sentence

---

### Part Two: Testing React components

So how do we test React components? We're going to try and test them as closely to how they'll really be used as possible. That means rendering them in a "DOM" and simulating events to test interaction.

#### jsdom

Jest comes with [jsdom](https://github.com/jsdom/jsdom) set-up. This is a Node implementation of most of the browser APIs needed to interact with the DOM. This means we can treat our Jest environment as if it were a browser.

#### Rendering

We use `ReactDOM.render` to render our component into a node in our "DOM" (we'll have to create this node via JS since we don't have an actual HTML DOM):

```jsx
import ReactDOM from 'react-dom';
import Button from './button.js';

test('The button renders', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Button>click me</Button>, root);
});
```

#### Finding our component

Since we have our root `div` as a variable already we use that to find the bits we want to test. We're using normal DOM methods so there are lots of ways to find elements:

```js
console.log(root.querySelector('button'));
// HTMLButtonElement { ...
console.log(root.children[0]);
// HTMLButtonElement { ...
console.log(root.querySelector('button').textContent);
// "click me"
```

#### Testing interactivity

We're trying to test components that _do stuff_ here, so we need a way to simulate events. Luckily the ReactDOM package exposes `ReactTestUtils`, which includes the `Simulate` method. This can simulate any event that React understands.

Imagine the `Button` component we're testing changes its text from 'click me' to 'just clicked' when you click it.

```jsx
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Button from './button.js';

test('The button updates when clicked', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Button>click me</Button>, root);
  const buttonNode = root.querySelector('button');
  ReactTestUtils.Simulate.click(buttonNode);
  console.log(buttonNode.textContent); // just clicked
});
```

---

Open the `workshop/toggle` folder. There's a component in there that will show or hide its children when a button is pressed.

Create a file called `toggle.test.js` and write a test that renders the `Toggle`, then simulates a click on the button and asserts that the children have been rendered.

---

### Part Three: React Testing Library 🐐

It gets a bit annoying constantly creating divs and rendering components into them. It would also be nice if we had some general helper functions for finding DOM nodes to assert about in our tests.

This is where [React Testing Library](https://github.com/kentcdodds/react-testing-library) comes in. It's designed to help you write good React integration tests.

#### The library

You'll mostly need two methods the library exposes: `render` and `Simulate`. `Simulate` is just the same method we've been using from `ReactTestUtils`, re-exported by this library.

The `render` method does exactly what we've already been doing: creates a div and uses ReactDOM to render your component into it. If you're interested you can look at the [15 line source](https://github.com/kentcdodds/react-testing-library/blob/master/src/index.js). What's nice is that the method returns an object with the container div itself and a few helper methods for finding DOM nodes.

Some of these are `getByText`, `getByLabelText` and `getByTestId`. The first will find nodes by text content, the second by label content (for inputs), and the third by `data-testId` attributes (for nodes that are hard to find by text).

There are a few others (like `getByAltText` for images), but those three are the most useful. If you can't find a node using one of them you can still use regular DOM methods on the `container` that is returned.

A useful convenience method when debugging is `prettyDOM`, which you can use to log nicely formatted HTML nodes (`console.log(prettyDOM(node)))`)

Here's our button example from above, re-written:

```js
import { render, Simulate } from 'react-testing-library';
import Button from 'button.js';

test('The button updates when clicked', () => {
  const { container, getByText } = render(<Button>click me</Button>);
  console.log(container); // HTMLDivElement (our root node)
  const buttonNode = getByText('click me');
  Simulate.click(buttonNode);
  console.log(buttonNode.textContent); // just clicked
});
```

---

Refactor your `Toggle` test from before to use React Testing Library. It's also worth reading the [docs](https://github.com/kentcdodds/react-testing-library/) as they're not too long and cover a few more methods that you might want to use.

---

### Part Four: Testing a real component

Let's get testing a component that actually does something. Run `npm run dev` and take a look at `http://localhost:3000`. We're going to write some tests for the Jadenizer component on the left.

Have a look at `workshop/jadenizer/jadenizer`. This component renders a form containing an input. When submitted it converts the input string to Jaden Case and renders it under the form.

Create a file in the same directory called `jadenizer.test.js`. Use React Testing Library to:

1.  render the Jadenizer component
1.  input a string
1.  submit the form
1.  assert that the string is correctly converted to Jaden Case (and is actually rendered)

It's worth writing a few tests to cover different potential scenarios the app might encounter with real use. What happens if a user submits an empty form?

### Part Five: Mocking network requests

You may have noticed another component on the page. This one takes some text input, then submits it to a [little Node server](https://github.com/oliverjam/micro-marked) that converts Markdown to HTML. It then renders the HTML to the page.

Testing this component is going to be a little trickier because of that network request.

<!-- ### Enzyme

In my opinion Enzyme has a huge bloated API that isn't well-suited to learning to test. It encourages you to write bad tests because you can pretty much do anything with it, and the docs aren't great so it takes forever to figure out how to do what you want to do.
Snapshots

Over the last 9 months we've become less and less enamoured with snapshot testing components at Ticketmaster. They end up effectively serving the same purpose as reviewing a diff in a PR.

Snapshots are useful for testing generated output and making sure it doesn't change when you refactor (e.g. we use them for testing date/currency formatting), but not HTML/CSS output -->
