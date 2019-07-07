import * as BlahAPIUtil from '../util/blah_api_util';

// Constants

export const RECEIVE_BLAH = 'RECEIVE_BLAH';
export const RECEIVE_WS_CLIENT = 'RECEIVE_WS_CLIENT';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

// Regular object action creators

export const receiveBlah = (blah) => {
  return {
    type: RECEIVE_BLAH,
    blah,
  };
};

export const receiveWSClient = (wsClient) => {
  return {
    type: RECEIVE_WS_CLIENT,
    wsClient,
  };
};

// const receiveMessage = (message) => {
//   return {
//     type: RECEIVE_MESSAGE,
//     message,
//   };
// };

// Thunk function action creators

export const fetchBlah = () => dispatch => {
  return BlahAPIUtil.getBlah()
    .then(
      (blah) => dispatch(receiveBlah(blah))
      // (errors) => dispatch(jQuery.parseJSON(errors.responseText))
    );
};

export const fetchWSClient = () => dispatch => {
  return BlahAPIUtil.fetchWSClient()
    .then(
      (wsClient) => dispatch(receiveWSClient(wsClient))
      // (errors) => dispatch(jQuery.parseJSON(errors.responseText))
    );
};

// export const addMessage = (message) => dispatch => {
//   return new Promise((resolve, reject) => {
//     resolve(dispatch(receiveMessage(message)));
//   })
// }