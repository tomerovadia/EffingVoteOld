
import merge from 'lodash/merge';
import { RECEIVE_BLAH, RECEIVE_SOCKET_CLIENT, RECEIVE_MESSAGE, MessageTypeEnum } from '../actions/actions.js';

const _initialState = {
  blah: "",
  socketClient: null,
  messages: [
    {
      message: "How do I effin' vote?",
      messageType: MessageTypeEnum.SENT,
    },
    {
      message: "I'd love to help! What state are you in?",
      messageType: MessageTypeEnum.RECEIVED,
    }
  ],
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
      newState.messages.push({
        message: action.message,
        messageType: action.messageType,
      });
      return newState;

    default:
      return oldState;
  }
};