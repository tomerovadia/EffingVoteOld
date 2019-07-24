import React from 'react';
import './messages.css';
import { MessageTypeEnum } from './actions/actions.js';

export default (props) => {
  var messageBubbleTypeClassName;
  var messageContainerTypeClassName;
  if(props.messageType === MessageTypeEnum.SENT) {
    messageBubbleTypeClassName = "sent-message-bubble";
    messageContainerTypeClassName = "sent-message-container";
  } else if (props.messageType === MessageTypeEnum.RECEIVED) {
    messageBubbleTypeClassName = "received-message-bubble";
    messageContainerTypeClassName = "received-message-container";
  }

  return (
    <div className={`message-container ${messageContainerTypeClassName}`}>
      <div className={`message-bubble ${messageBubbleTypeClassName}`}>
        <p>{props.message}</p>
      </div>
    </div>
  );
}