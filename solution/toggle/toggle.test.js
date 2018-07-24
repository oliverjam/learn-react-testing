import React from 'react';
import ReactDOM from 'react-dom';
import Toggle from './toggle.js';
import TestUtils from 'react-dom/test-utils';
import { render, fireEvent } from 'react-testing-library';

test('The toggle toggles when clicked', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Toggle>just clicked</Toggle>, root);
  document.body.appendChild(root);
  const buttonNode = root.querySelector('button');
  buttonNode.click();
  const childrenNode = root.lastChild;
  expect(childrenNode.textContent).toEqual('just clicked');
});

//react-testing-library solution
test('The toggle toggles when clicked', () => {
  const { getByText, container } = render(<Toggle>just clicked</Toggle>);
  const buttonNode = getByText('Show');
  fireEvent.click(buttonNode);
  expect(container.lastChild.textContent).toEqual('just clicked');
});
