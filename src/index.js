import React from 'react';
import ReactDOM from 'react-dom';
import autosize from 'autosize';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store/store.js';
import { RECEIVE_MESSAGE, MessageTypeEnum } from './actions/actions.js';

const store = configureStore();

export const receiveMessage = (message) => {
  console.log("Received: '" + message + "'");
  store.dispatch({
    type: RECEIVE_MESSAGE,
    message,
    messageType: MessageTypeEnum.RECEIVED,
  });
}

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  
  autosize(document.querySelectorAll('textarea'));
});