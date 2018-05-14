import React from 'react';
import { render, Simulate } from 'react-testing-library';
import Button from './button.js';

test('The button updates when clicked', () => {
  const { container, getByText } = render(<Button>click me</Button>);
  console.log(container); //
  const buttonNode = getByText('click me');
  Simulate.click(buttonNode);
  console.log(buttonNode.textContent); // just clicked
});
