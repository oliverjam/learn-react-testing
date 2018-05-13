# Learn React Testing 📚

An introduction to integration testing React components.

### Learning outcomes

1. Jest test runner
1. Rendering to a fake DOM in Node
1. React Testing Library
1. Mocking a fetch request

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

#### Your first test





### Enzyme

In my opinion Enzyme has a huge bloated API that isn't well-suited to learning to test. It encourages you to write bad tests because you can pretty much do anything with it, and the docs aren't great so it takes forever to figure out how to do what you want to do.
Snapshots

Over the last 9 months we've become less and less enamoured with snapshot testing components at Ticketmaster. They end up effectively serving the same purpose as reviewing a diff in a PR.

Snapshots are useful for testing generated output and making sure it doesn't change when you refactor (e.g. we use them for testing date/currency formatting), but not HTML/CSS output
