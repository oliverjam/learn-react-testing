import React from 'react';
import { render, Simulate, wait } from 'react-testing-library';
import fetchMock from 'fetch-mock';
import Markdownifier from './markdownifier.js';

test('Markdownifier component', async () => {
  const mockResponse = `<h1 id="a-heading">a heading</h1>`;
  fetchMock.mock('https://micro-marked-nqbbqbtkrq.now.sh/', mockResponse);
  const { container, getByText, getByLabelText, getByTestId } = render(
    <Markdownifier />
  );
  const button = getByText('Markdownify');
  const form = container.querySelector('form');
  const input = getByLabelText('Enter markdown');
  input.value = `# a heading`;
  Simulate.change(input);
  Simulate.submit(form);
  await wait(() => getByTestId('output'));
  const output = getByTestId('output');
  expect(output.innerHTML).toEqual(mockResponse);
});
