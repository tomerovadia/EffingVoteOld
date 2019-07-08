import * as BlahAPIUtil from '../util/blah_api_util';

// Constants

export const RECEIVE_BLAH = 'RECEIVE_BLAH';
export const RECEIVE_SOCKET_CLIENT = 'RECEIVE_SOCKET_CLIENT';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

// Regular object action creators

export const receiveBlah = (blah) => {
  return {
    type: RECEIVE_BLAH,
    blah,
  };
};

export const receiveSocketClient = (socketClient) => {
  return {
    type: RECEIVE_SOCKET_CLIENT,
    socketClient,
  };
};

// Thunk function action creators

export const fetchBlah = () => dispatch => {
  return BlahAPIUtil.getBlah()
    .then(
      (blah) => dispatch(receiveBlah(blah))
      // (errors) => dispatch(jQuery.parseJSON(errors.responseText))
    );
};

export const fetchSocketClient = () => dispatch => {
  return BlahAPIUtil.fetchSocketClient()
    .then(
      (socketClient) => dispatch(receiveSocketClient(socketClient))
      // (errors) => dispatch(jQuery.parseJSON(errors.responseText))
    );
};