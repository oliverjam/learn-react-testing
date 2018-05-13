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

We can run our tests by either creating an npm script:

```json
"scripts": {
  "test": "jest"
}
```

or by using the [convenient npx tool](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b): `npx jest`

Jest has a convenient watch mode that will automatically run any tests that change. You can use this by passing `--watch` to Jest (`npx jest --watch`)

#### Test syntax

Clone this repo and run `npm i -D jest`. Once it's installed run `npx jest --watch` to start the test watcher. You should see a few tests passing and one failing. Open up the `intro/intro.test.js` file to see them.

You create a test the same as in Tape: a function called `test` that takes a description string as the first argument and a function as the second. You can also use `it` if you find that more readable (it's just an alias for `test`).

```js
test('Jest is working', () => {
  expect(true).toBeTruthy();
});
```

You can group a set of related tests into a block with `describe`.

Fix the broken test and you should see the test automatically re-run in your terminal.

##### Note:

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

#### Your first test

We'll do a couple of quick unit tests just to make sure your Jest environment is set up correctly and you've got the syntax down.

Have a look at the `utils/jadenCase.js` helper function. It turns strings into wonderfully philosophical [Jaden tweets](https://twitter.com/officialjaden).

Create a file in `utils/` called `jadenCase.test.js`, then write two tests:

1.  Check that the helper capitalises a single word
1.  Check that it capitalises every word in a sentence

### Testing React components

So how do we test React components? We're going to try and test them as closely to how they'll really be used as possible. That means rendering them in a "DOM" and simulating events to test interaction.

#### jsdom

Jest comes with [jsdom](https://github.com/jsdom/jsdom) set-up. This is a Node implementation of most of the browser APIs needed to interact with the DOM. This means we can treat our Jest test environment as if it were a browser, which makes rendering a React component easy.

We use `ReactDOM.render` to render our component into a node in our "DOM" (we'll have to create this node via JS since we don't have an actual HTML DOM):

```jsx
import ReactDOM from 'react-dom';
import Button from './button.js';

test('The button renders', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Button />, root);
  console.log(root.querySelector('button')); // HTMLButtonElement { ...
});
```

### Enzyme

<!-- In my opinion Enzyme has a huge bloated API that isn't well-suited to learning to test. It encourages you to write bad tests because you can pretty much do anything with it, and the docs aren't great so it takes forever to figure out how to do what you want to do.
Snapshots

Over the last 9 months we've become less and less enamoured with snapshot testing components at Ticketmaster. They end up effectively serving the same purpose as reviewing a diff in a PR.

Snapshots are useful for testing generated output and making sure it doesn't change when you refactor (e.g. we use them for testing date/currency formatting), but not HTML/CSS output -->
