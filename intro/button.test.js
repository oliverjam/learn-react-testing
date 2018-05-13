import React from 'react';
import ReactDOM from 'react-dom';
// import Button from './button.js';

const Button = ({ children }) => <button>{children}</button>;

test('The button renders its children', () => {
  const root = document.createElement('div');

  const message = 'Click';
  ReactDOM.render(<Button>{message}</Button>, root);
  console.log(root.querySelector('button'));
  expect(root.querySelector('button').textContent).toEqual(message);
});
