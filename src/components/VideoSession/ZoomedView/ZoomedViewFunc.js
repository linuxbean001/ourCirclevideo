import React, { useState, useEffect } from 'react';
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
  setTableView
 } from '../../../redux/eventData/eventData.actions';

 import { selectEventData } from '../../../redux/eventData/eventData.selectors';
 import { selectSessionId, selectHost } from '../../../redux/eventAccess/eventAccess.selectors';
 import { selectSocket } from '../../../redux/socket/socket.selectors';

import ZoomedTable from './ZoomedTable';
import ZoomedViewHost from './ZoomedViewHost';
import EventChatBox from '../EventChat/EventChatBox/EventChatBox';

import { SERVER_URL } from '../../../utils/constants';

const ZoomedView = ({
  setTableSessionId,
  eventData,
  sessionId,
  setTableSession,
  socket,
  updateUsers,
  setTableStateToDefault,
  setTableToken,
  setTableConnectionId,
  setTableView,
  host
}) => {

  const [OV, setOV] = useState(null);

  
  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    setTableSessionId(sessionId+eventData.tableView.table.toString());
    setOV(new OpenVidu());
    
    return () => {
      console.log("EVENT DATA BEFORE DISCONNECT: ", eventData)
      disconnect();
      window.removeEventListener('beforeunload', onbeforeunload);
      console.log("USE EFFECT RETURN")
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (OV){
      if (OV.checkSystemRequirements()){
        setTableSession(OV.initSession());
      }
      else{
        alert("Sorry, your browser isn't supported by our streaming service.");
      }
    }
    // eslint-disable-next-line
  }, [OV])

  useEffect(() => {
    if (eventData.tableSession){
      joinTableSession();
    }
    // eslint-disable-next-line
  }, [eventData.tableSession])

  useEffect(() => {
    if (eventData.tableConnectionId){
        socket.emit('new-table-user', {
          sessionId: sessionId,
          tableSessionId: eventData.tableSessionId,
          connectionId: eventData.connectionId,
          tableConnectionId: eventData.tableConnectionId,
          isVisible: eventData.isVisible,
          zoomed: true
        })
      }
      // eslint-disable-next-line
  }, [eventData.tableConnectionId])

  const onbeforeunload = () => {
    if (eventData.tableSession !== undefined){
      disconnect();
    }
  }

  const disconnect = () => {
    console.log("DISCONNECT START")
    const tableSession = eventData.tableSession;
    let users = [...eventData.users];
    console.log("TABLE SESSIOn", tableSession)
    if (tableSession) {
      console.log("TABLE SESSION CONDITION")
      tableSession.disconnect();
    }
    socket.emit('leave-table', {
      sessionId: sessionId,
      tableSessionId: eventData.tableSessionId,
      connectionId: eventData.connectionId,
    })
    users.forEach((user) => {
      if (user.position.table === eventData.tableView.table){
        user.stream = undefined;
        //user.tableConnectionId = '';
      }
    })
    updateUsers(users);
    setTableStateToDefault();
    console.log("DISCONNECT END")
  }

  const joinTableSession = () => {
    // --- 1) Get an OpenVidu object ---
    // --- 2) Init a session ---
    let tableSession = eventData.tableSession;
    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    tableSession.on('streamCreated', (event) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        let stream = tableSession.subscribe(event.stream, undefined);
        let tableConnectionId = event.stream.connection.connectionId;
        let connectionId = event.stream.connection.data.split('%')[0];
        let users = [...eventData.users];
        let found = false;

        users.forEach((user) => {
          if (user.tableConnectionId === tableConnectionId){
            user.stream = stream;
            found = true;
          }
        })
        if (!found){
          users.forEach((user) => {
            if (user.connectionId === connectionId){
              user.tableConnectionId = tableConnectionId;
              user.stream = stream;
            }
          })
        }
        // Update the state with the new subscribers
        updateUsers(users);
    });
    // On every Stream destroyed...
    tableSession.on('streamDestroyed', (event) => {
        // Remove the stream from 'subscribers' array
        // this.deleteSubscriber(event.stream.streamManager);
    });


    getToken().then((tableToken) => {
      const tableSession = eventData.tableSession;
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      setTableToken(tableToken);
      tableSession
        .connect(
          tableToken,
          eventData.connectionId
        )
        .then(() => {
          setTableConnectionId(tableSession.connection.connectionId);
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
        sessionId: sessionId,
        tableSessionId: eventData.tableSessionId
      })
    })
    .then(response => response.json())
    .then(data => data.token)
    .catch(console.log)
  }

  const unZoomTable = () => {
    setTableView({
      active: false,
      table: -1
    });
    if (host){
      socket.emit('host-table', {
        sessionId: sessionId,
        hostTable: -2
      })
    }
  }

  return (
    <div className='zoomed-view'>
      <div className='title-and-button'>
        <div className='button-container'>
          <button className='button' onClick={unZoomTable}>Back to Lobby</button>
        </div>
        {
          eventData.tables[eventData.tableView.table-1] &&
          <div className='title'>
            {eventData.tables[eventData.tableView.table-1].tableName}
          </div>
        }
      </div>
      <div className='main-section'>
        <div className='table-section'>
          <ZoomedTable 
            OV={OV}
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
  );
}

const mapStateToProps = createStructuredSelector({
  sessionId: selectSessionId,
  eventData: selectEventData,
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
  setTableView: tableView => dispatch(setTableView(tableView))
})

export default connect(mapStateToProps, mapDispatchToProps)(ZoomedView);