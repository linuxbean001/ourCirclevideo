//import React, { Component } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectEventData } from '../../../../redux/eventData/eventData.selectors';
import { selectSessionId } from '../../../../redux/eventAccess/eventAccess.selectors'

import { selectSocket } from '../../../../redux/socket/socket.selectors';

import './TableChatBox.scss';

import TableMessageList from './TableMessageList/TableMessageList';


const TableChatBox = () => { 
  const [userMessage, setuserMessage] = useState();

  useEffect(() => { 
    updateScroll();
  }, []);

 const  handleUserMessage = (e) => {
    setuserMessage(e.target.value);
  }

  const publishMessage = (e) => {
    e.preventDefault();

    let newMessage={
      user: this.props.eventData.username,
      message: this.state.userMessage
    }
    
    this.props.socket.emit('new-table-message', {
      sessionId: this.props.sessionId,
      id: this.props.eventData.id,
      table: this.props.table,
      newMessage
    })
    setuserMessage('');
   /* this.setState({
      userMessage: ''
      
    })*/
  }

  const updateScroll = () => {
    let messageList = document.getElementById("table-messageList");
    messageList.scrollTop = messageList.scrollHeight;
  }

  return (
    <div className='table-chat-box-container'>
      <div className='chat-box'>
        <div className='chat-title-container'>
          <div className='chat-title'>
            Table Chat
          </div>
        </div>
        <div id='table-messageList' className='group-chat-container'>
            <TableMessageList 
              messages={this.props.eventData.tableMessages[this.props.table]}
            />
        </div>
        <div className='user-input-container'>
          <form className='form-container' onSubmit={this.publishMessage}>
            <div className='input-container'>
              <input
                className="input"
                type="text"
                id="sessionId"
                value={this.state.userMessage}
                onChange={this.handleUserMessage}
                placeholder='Enter Your Message...'
                maxLength={75}
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

export default connect(mapStateToProps)(TableChatBox)