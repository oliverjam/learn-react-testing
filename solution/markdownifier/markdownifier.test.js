import React from 'react';
import {
  renderIntoDocument,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';
import fetchMock from 'fetch-mock';
import Markdownifier from './markdownifier.js';

// ensures our document gets cleared out after each test
// so we don't have lots of copies of our component in there
// otherwise our tests might affect each other
afterEach(cleanup);

test('Markdownifier component', async () => {
  const mockResponse = `<h1 id="a-heading">a heading</h1>`;
  fetchMock.mock('https://micro-marked-nqbbqbtkrq.now.sh/', mockResponse);

  const { debug, getByText, getByLabelText, getByTestId } = renderIntoDocument(
    <Markdownifier />
  ); // use renderIntoDocument so we have a real document with browser events

  const button = getByText('Markdownify');
  const input = getByLabelText('Enter markdown');

  input.value = `# a heading`;
  fireEvent.change(input); // ensure our onChange gets called
  fireEvent.click(button); // fire a real browser event on the submit button

  // Jest will wait for a promise if you return it from the test:
  // https://facebook.github.io/jest/docs/en/asynchronous.html#promises
  // Otherwise the test will end immediately and the async bit won't run
  return waitForElement(() => getByTestId('output')).then(output =>
    expect(output.innerHTML).toEqual(mockResponse)
  );
  // wait until our element callback finds the output DOM node
  // then we have access to the node
  // so we can assert against it to make sure the innerHTML is correct
});
