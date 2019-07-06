import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store/store.js';
import { RECEIVE_MESSAGE } from './actions/actions.js';

const store = configureStore();

export const receiveMessage = (e) => {
  if (typeof e.data === 'string') {
      console.log("Received: '" + e.data + "'");
  }
  store.dispatch({
    type: RECEIVE_MESSAGE,
    message: e.data,
  });
}

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});