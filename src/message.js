import React from 'react';
import './messages.css';
import { RECEIVE_MESSAGE, MessageTypeEnum } from './actions/actions.js';

export default (props) => {
  var messageTypeClassName;
  if(props.messageType === MessageTypeEnum.SENT) {
    messageTypeClassName = "sent-message-bubble";
  } else if (props.messageType === MessageTypeEnum.RECEIVED) {
    messageTypeClassName = "received-message-bubble";
  }

  return (
    <div className='message-container'>
      <div className={`message-bubble ${messageTypeClassName}`}>
        <p>{props.message}</p>
      </div>
    </div>
  );
}