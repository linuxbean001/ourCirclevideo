//import React, { Component } from 'react';
import React, { useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OpenVidu } from 'openvidu-browser';
import './ZoomedView.scss';
import { 
  updateUsers,
  setTableSessionId,
  setTableSession,
  setTableToken,
  setTableConnectionId,
  setTableStateToDefault,
  setTableStateToDefaultHost,
  setTableView,
 } from '../../../redux/eventData/eventData.actions';

import { selectEventData, selectUsers } from '../../../redux/eventData/eventData.selectors';
import { selectSessionId, selectHost } from '../../../redux/eventAccess/eventAccess.selectors';
import { selectSocket } from '../../../redux/socket/socket.selectors';
import ZoomedTable from './ZoomedTable';
import ZoomedViewHost from './ZoomedViewHost';
import EventChatBox from '../EventChat/EventChatBox/EventChatBox';

import { SERVER_URL } from '../../../utils/constants';

const ZoomedView = () => {
  useEffect(() => {
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.props.setTableSessionId(this.props.sessionId+this.props.eventData.tableView.table.toString());
    this.OV = new OpenVidu();
    if (this.OV.checkSystemRequirements()){
      this.props.setTableSession(this.OV.initSession());
    }
    else{
      alert("Sorry, your browser isn't supported by our streaming service.");
    }
  }, [])


  useEffect((prevProps) => {
  
    if (!prevProps.eventData.tableSession && this.props.eventData.tableSession){
      this.joinTableSession();
    }
    if (!prevProps.eventData.tableConnectionId 
      && this.props.eventData.tableConnectionId
      && this.props.eventData.tableToken){
        this.props.socket.emit('new-table-user', {
          sessionId: this.props.sessionId,
          tableSessionId: this.props.eventData.tableSessionId,
          id: this.props.eventData.id,
          tableConnectionId: this.props.eventData.tableConnectionId,
          zoomed: true
        })
      }
    
  }) 

  useEffect(() => {
    return () => {
      if (this.props.eventData.tableSession !== undefined){
        this.disconnect();
      }
      window.removeEventListener('beforeunload', this.onbeforeunload);
    }
  }, []) // notice the empty array
 

  const onbeforeunload = () => {
    if (this.props.eventData.tableSession !== undefined){
      this.disconnect();
    }
  }

  const disconnect = () => {
    const tableSession = this.props.eventData.tableSesssion;
    let users = [...this.props.users];
    if (tableSession) {
        console.log("DISCONNECT")
        tableSession.disconnect();
    }
    this.props.socket.emit('leave-table', {
      sessionId: this.props.sessionId,
      tableSessionId: this.props.eventData.tableSessionId,
      id: this.props.eventData.id,
    })
    users.forEach((user) => {
      if (user.position.table === this.props.eventData.tableView.table){
        user.stream = undefined;
      }
    })
    this.props.updateUsers(users);
    if (this.props.eventData.position.seat === -2){
      this.props.setTableStateToDefaultHost();
    }
    else{
      this.props.setTableStateToDefault();
    }
  }
  
  const joinTableSession = () => {
    // --- 1) Get an OpenVidu object ---
    // --- 2) Init a session ---
    let tableSession = this.props.eventData.tableSession;
    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    
    tableSession.on('streamCreated', (event) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own

        let stream = tableSession.subscribe(event.stream, undefined);
        // let tableConnectionId = event.stream.connection.connectionId;
        let id = event.stream.connection.data;
        let users = [...this.props.users];

        users.forEach((user) => {
          if (user.id === id){
            user.stream = stream;
          }
        })
        // Update the state with the new subscribers
        this.props.updateUsers(users);
    });
    // On every Stream destroyed...
    tableSession.on('streamDestroyed', (event) => {
        // Remove the stream from 'subscribers' array
        // this.deleteSubscriber(event.stream.streamManager);
    });


    this.getToken().then((tableToken) => {
      const tableSession = this.props.eventData.tableSession;
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      this.props.setTableToken(tableToken);
      tableSession
        .connect(
          tableToken,
          this.props.eventData.id
        )
        .then(() => {
          this.props.setTableConnectionId(tableSession.connection.connectionId);
        })
        .catch((error) => {
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
      });
    }

    const getToken = () => {
      return fetch(SERVER_URL + '/get-table-token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          sessionId: this.props.sessionId,
          tableSessionId: this.props.eventData.tableSessionId
        })
      })
      .then(response => response.json())
      .then(data => data.token)
      .catch(console.log)
    }

    const unZoomTable = () => {
      this.props.setTableView({
        active: false,
        table: -1
      });
      if (this.props.host){
        this.props.socket.emit('host-table', {
          sessionId: this.props.sessionId,
          hostTable: -2
        })
      }
    }

  return(        
  <div className='zoomed-view'>
  <div className='title-and-button'>
    <div className='button-container'>
      <button className='button' onClick={this.unZoomTable}>Back to Lobby</button>
    </div>
    {
      this.props.eventData.tables[this.props.eventData.tableView.table-1] &&
      <div className='title'>
        {this.props.eventData.tables[this.props.eventData.tableView.table-1].tableName}
      </div>
    }
  </div>
  <div className='main-section'>
    <div className='table-section'>
      <ZoomedTable 
        OV={this.OV}
      />
    </div>
    <div className='main-event'> 
      <div className='host-video-container'>
        <ZoomedViewHost />
      </div>
      <div className='table-event-chat'>
        <EventChatBox 
          location={'table'}
        />
      </div>
    </div>
  </div>
</div>
) 
}
const mapStateToProps = createStructuredSelector({
  sessionId: selectSessionId,
  eventData: selectEventData,
  users: selectUsers,
  host: selectHost,
  socket: selectSocket
})

const mapDispatchToProps = dispatch => ({
  updateUsers: users => dispatch(updateUsers(users)),
  setTableSessionId: tableSessionId => dispatch(setTableSessionId(tableSessionId)),
  setTableSession: tableSession => dispatch(setTableSession(tableSession)),
  setTableToken: tableToken => dispatch(setTableToken(tableToken)),
  setTableConnectionId: tableConnectionId => dispatch(setTableConnectionId(tableConnectionId)),
  setTableStateToDefault: () => dispatch(setTableStateToDefault()),
  setTableStateToDefaultHost: () => dispatch(setTableStateToDefaultHost()),
  setTableView: tableView => dispatch(setTableView(tableView))
})

export default connect(mapStateToProps, mapDispatchToProps)(ZoomedView);