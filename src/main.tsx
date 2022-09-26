import React from 'react';
import ReactDOM from 'react-dom';
import { Playground } from './app/Playground';

ReactDOM.render(
  <React.StrictMode>
    <Playground groundSize={[10, 10]} />
  </React.StrictMode>,
  document.getElementById('root')
);
