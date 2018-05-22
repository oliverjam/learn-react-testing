import React from 'react';
import ReactDOM from 'react-dom';
import Toggle from './toggle.js';
import TestUtils from 'react-dom/test-utils';
import { prettyDOM } from 'react-testing-library';

test('The toggle toggles when clicked', () => {
  const root = document.createElement('div');
  ReactDOM.render(<Toggle>just clicked</Toggle>, root);
  const buttonNode = root.querySelector('button');
  TestUtils.Simulate.click(buttonNode);
  const childrenNode = root.lastChild;
  expect(childrenNode.textContent).toEqual('just clicked');
});
