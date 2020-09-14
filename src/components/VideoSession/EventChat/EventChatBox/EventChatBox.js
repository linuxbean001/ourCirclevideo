import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectEventData } from '../../../../redux/eventData/eventData.selectors';
import { selectSessionId } from '../../../../redux/eventAccess/eventAccess.selectors';

import { selectSocket } from '../../../../redux/socket/socket.selectors';

import './EventChatBox.scss';

import EventMessageList from './EventMessageList/EventMessageList';

const EventChatBox = ({
  socket,
  eventData,
  sessionId,
  location
}) => {

  const [userMessage, setUserMessage] = useState('');

  const updateScroll = () => {
    let messageList = document.getElementById(`event-messageList-${location}`);
    messageList.scrollTop = messageList.scrollHeight;
    
  }

  useEffect(() => {
    updateScroll();
  })

  const handleUserMessage = (e) => {
    setUserMessage(e.target.value);
  }

  const publishMessage = (e) => {
    e.preventDefault();

    let newMessage={
      user: eventData.username,
      message: userMessage
    }
    
    socket.emit('new-event-message', {
      sessionId: sessionId,
      id: eventData.id,
      newMessage
    })
    
    setUserMessage('');
  }

  return (
    <div className={`event-chat-box-container ${location}`}>
      <div className='chat-box'>
        <div className='chat-title-container'>
          <div className='chat-title'>
            Event Chat
          </div>
        </div>
        <div id={`event-messageList-${location}`} className='group-chat-container'>
            <EventMessageList 
              messages={eventData.messages}
            />
        </div>
        <div className='user-input-container'>
          <form className='form-container' onSubmit={publishMessage}>
            <div className='input-container'>
              <input
                className="input"
                type="text"
                id="userMessage"
                value={userMessage}
                onChange={handleUserMessage}
                placeholder='Enter Your Message...'
                maxLength={100}
                autoComplete="off"
                required
              />
            </div>
            <div className='button-container'>
              <button className='submit-button'>
                <span>SEND</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  eventData: selectEventData,
  sessionId: selectSessionId,
  socket: selectSocket
})

export default connect(mapStateToProps)(EventChatBox);