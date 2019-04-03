# Learn React Testing 📚

An introduction to integration testing React components.

## Workshop

### Part Three: React Testing Library 🐐

This is where [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) comes in. It's designed to help you write good React integration tests.

#### The library

You'll mostly need two methods the library exposes: [`render`](https://testing-library.com/docs/react-testing-library/api#render) and [`fireEvent`](https://testing-library.com/docs/api-events#fireevent). The first will render your React component into jsdom's `document` (like we were above), and the second is a utility for triggering DOM events (since not every event has an equivalent to `node.click()`.

The `render` method does exactly what we've already been doing: creates a div and uses ReactDOM to render your component into it. This method returns an object with some convenient tools to help us test. You can destructure just the things you need:

```js
const { container, getByText, getByLabelText, getByTestId, debug } = render(
  <Button>Click me</Button>
);
```

- `container` is the div your component was rendered into (useful for `container.querySelector()` to find DOM nodes).
- `getByText`, `getByLabelText` and `getByTestId`. The first will find nodes by text content, the second by label content (for inputs), and the third by `data-testid` attributes (for nodes that are hard to find by text).
- `debug(node)` will pretty print the DOM tree of the node so you can see what you're working with.

Here's our button example from above, re-written:

```js
import { render, fireEvent } from "react-testing-library";
import Button from "button.js";

test("The button updates when clicked", () => {
  const { getByText } = render(<Button>click me</Button>);
  const buttonNode = getByText("click me"); // our rendered button node
  fireEvent.click(buttonNode);
  getByText("just clicked"); // the same button node with updated text
});
```

**Note:**

If you read the docs for `render` you'll see that it's recommended to be used with the `cleanup` function. This will ensure you don't end up with lots of copies of your component in the same document.

You can use Jest's handy method that runs after each test to do this: `afterEach(cleanup)`.

---

### Part Four: Testing a real component

Let's get testing a component that actually does something. Run `npm run dev` and take a look at http://localhost:1234. We're going to write some tests for the Jadenizer component on the left.

Create `workshop/jadenizer/jadenizer.test.js`, then Use React Testing Library to:

1.  render the Jadenizer component
1.  input a string
1.  submit the form
1.  assert that the string is correctly converted to Jaden Case and rendered

### Interlude: async tests

You need to ensure your test doesn't finish before your async code has run. The simplest way to do this is to return a promise. Jest will wait for the promise to resolve before finishing the test:

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

Create a test file in the `workshop/markdownifier/` directory, and then we can mock the global `fetch` method.

Jest has a built-in way to create mocked functions using `jest.fn()`. You can read more about that in [the Jest docs](https://jestjs.io/docs/en/mock-functions).

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
