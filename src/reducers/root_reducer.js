import { combineReducers } from 'redux';
import blahReducer from './blah_reducer';

export default combineReducers(
  {
    blah: blahReducer,
  }
);