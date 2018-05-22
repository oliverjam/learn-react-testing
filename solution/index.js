import React from 'react';
import ReactDOM from 'react-dom';

import Jadenizer from './jadenizer/jadenizer';
import Markdownifier from './markdownifier/markdownifier';

const App = () => (
  <main>
    <Jadenizer />
    <Markdownifier />
    <span className="🐙" />
  </main>
);

ReactDOM.render(<App />, document.getElementById('🦑'));
