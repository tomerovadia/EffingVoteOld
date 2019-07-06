
import merge from 'lodash/merge';
import { RECEIVE_BLAH, RECEIVE_WS_CLIENT } from '../actions/actions.js';

const _initialState = {
  blah: "",
  wsClient: null,
  errors: {},
};

export default (oldState = _initialState, action) => {
  let newState = merge({}, oldState);
  switch(action.type){

    case RECEIVE_BLAH:
      newState.blah = action.blah;
      return newState;

    case RECEIVE_WS_CLIENT:
      newState.wsClient = action.wsClient;
      return newState;

    default:
      return oldState;
  }
};