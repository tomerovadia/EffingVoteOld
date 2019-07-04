import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import App from './App';

const Root = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={App} />
    </div>
  </HashRouter>
);

export default Root;