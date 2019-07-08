
import merge from 'lodash/merge';
import { RECEIVE_BLAH, RECEIVE_SOCKET_CLIENT, RECEIVE_MESSAGE } from '../actions/actions.js';

const _initialState = {
  blah: "",
  socketClient: null,
  messages: [],
  errors: {},
};

export default (oldState = _initialState, action) => {
  let newState = merge({}, oldState);
  switch(action.type){

    case RECEIVE_BLAH:
      newState.blah = action.blah;
      return newState;

    case RECEIVE_SOCKET_CLIENT:
      newState.socketClient = action.socketClient;
      return newState;

    case RECEIVE_MESSAGE:
      newState.messages.push(action.message);
      return newState;

    default:
      return oldState;
  }
};