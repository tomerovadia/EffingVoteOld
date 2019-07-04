import * as BlahAPIUtil from '../util/blah_api_util';

// Constants

export const RECEIVE_BLAH = 'RECEIVE_BLAH';

// Regular object action creators

export const receiveBlah = (blah) => {
  return {
    type: RECEIVE_BLAH,
    blah,
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