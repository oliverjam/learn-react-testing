import React from 'react';
import { render, Simulate, fireEvent } from 'react-testing-library';
import Jadenizer from './jadenizer.js';

test('Jadenizer component', () => {
  const { container, getByText, getByLabelText, getByTestId } = render(
    <Jadenizer />
  );
  const button = getByText('Jadenize');
  const form = container.querySelector('form');
  const input = getByLabelText('Enter text for Jadenization');
  input.value = `how can mirrors be real if our eyes aren't real`;
  Simulate.change(input);
  Simulate.submit(form);
  const output = getByTestId('output');
  expect(output.textContent).toBe(
    `How Can Mirrors Be Real If Our Eyes Aren't Real`
  );
});
