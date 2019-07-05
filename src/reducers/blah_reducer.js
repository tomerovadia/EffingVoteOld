
import merge from 'lodash/merge';
import { RECEIVE_BLAH } from '../actions/actions.js';

const _initialState = {
  blah: "",
  errors: {},
};

export default (oldState = _initialState, action) => {
  let newState = merge({}, oldState);
  switch(action.type){

    case RECEIVE_BLAH:
      newState.blah = action.blah;
      return newState;

    default:
      return oldState;
  }
};