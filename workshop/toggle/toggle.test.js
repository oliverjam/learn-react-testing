import React from 'react';
import ReactDOM from 'react-dom';
import Toggle from './toggle.js';
import ReactTestUtils from 'react-dom/test-utils';

test('The toggle toggles when clicked', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Toggle>click me</Toggle>, root);
  const buttonNode = root.querySelector('button');
  ReactTestUtils.Simulate.click(buttonNode);
  expect(buttonNode.textContent).toEqual('just clicked');
});
