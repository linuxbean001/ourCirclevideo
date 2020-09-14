import React from 'react';

import './EventMessageList.scss';

const EventMessageList = ({messages}) => {
  return (
    <ul className='event-message-list'>
    {
      messages.map(message => {
        return (
          <li className='message-container' key={message.count}>
            <div className={`message ${message.me ? "local-message" : "remote-message"}`}>
              <div className='sender-details'>
                <div className='sender-name'>
                  {message.user + ' '}
                </div>
                <div className='sender-time'>
                  @{message.time}
                </div>
              </div>
              <div className='sender-message'>
                <span>{message.message}</span>
              </div>
            </div>
          </li>
        )
      })
    }
    </ul>
  )
}

export default EventMessageList;