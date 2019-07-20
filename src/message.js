import React from 'react';
import './messages.css';

export default (props) => {

  return (
    <div className='message-container'>
      <div className='message-bubble'>
        <p>{props.message}</p>
      </div>
    </div>
  );
}