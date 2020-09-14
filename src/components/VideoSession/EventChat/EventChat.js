import React from 'react';

import './EventChat.scss';

import EventChatBox from './EventChatBox/EventChatBox';

const EventChat = () => {
  
  return (
    <div className='event-chat-container'>
      <div className='lobby-event-chat'>
        <EventChatBox 
          location={'lobby'}
        />
      </div>
    </div>
  )
}

export default EventChat;