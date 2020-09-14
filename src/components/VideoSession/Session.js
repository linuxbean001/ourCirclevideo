//import React, { Component } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
  selectHost, 
  selectSessionId, 
  selectRemovedFromEvent 
} from '../../redux/eventAccess/eventAccess.selectors';
import { selectUser } from '../../redux/user/user.selectors';
import { selectEventData, selectUsers } from '../../redux/eventData/eventData.selectors';
import { selectSocketData, selectSocket } from '../../redux/socket/socket.selectors'
import { 
  initializeSocketChannel, 
  disconnectSocket, 
  socketReconnectedDefault,
  pullDataFromServerFalse 
} from '../../redux/socket/socket.actions';

import { 
  updateEventUsername,
  updateUsers,
  setStateToDefault,
  setPublisher,
  setSession,
  setToken,
  setConnectionId,
  setHostOV
 } from '../../redux/eventData/eventData.actions';

 import { setLoading } from '../../redux/general/general.actions.js';

import { OpenVidu } from 'openvidu-browser';

import { isMobile } from 'react-device-detect';

import './Session.scss'

import UsernameModal from './UsernameModal/UsernameModal';
import ZoomedView from './ZoomedView/ZoomedView';
import EventHeader from './EventHeader/EventHeader';
import LobbyView from './LobbyView/LobbyView';
import FullScreenMode from './FullScreenMode/FullScreenMode';

import { SERVER_URL } from '../../utils/constants';

const Session = () => {
  // const [endTime, setEndTime] = useState('');
  const [username, setUsername] = useState(this.props.user.username);
  const [usernameModalToggle, setUsernamemodal] = useState(true);

  useEffect(() => {
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.props.initializeSocketChannel();
  }, [])

  useEffect((prevProps) => {
  
    if (!prevProps.eventData.id && this.props.eventData.id){
      let hostOV = this.props.eventData.hostOV;
      hostOV.enableProdMode();
      if (hostOV.checkSystemRequirements()){
        this.props.setSession(hostOV.initSession());
      }
      else{
        alert("Sorry, your browser isn't supported by our streaming service.");
      }
    }
    else if (!prevProps.eventData.session && this.props.eventData.session){
      this.joinSession();
    }
    else if (!prevProps.eventData.connectionId 
    && this.props.eventData.connectionId
    && this.props.eventData.token){
      this.props.socket.emit('join-session', {
        id: this.props.eventData.id,
        sessionId: this.props.sessionId,
        connectionId: this.props.eventData.connectionId,
        tableConnectionId: this.props.eventData.tableConnectionId,
        username: this.props.eventData.username,
        socketId: this.props.socket.id,
        profilePictureKey: this.props.user.profilePictureKey,
        host: this.props.host
      })
    }
    if (this.props.removedFromEvent.reason !== ''){
      this.leaveSession();
    }
    if (!prevProps.socketData.socketReconnection && this.props.socketData.socketReconnection){
      /*this.setState({
        username: this.props.user.username,
        usernameModalToggle: true
      })*/
      setUsername(this.props.user.username);
      setUsernamemodal(true)

    }
    if(!prevProps.socketData.pullDataFromServer && this.props.socketData.pullDataFromServer){
      this.props.socket.emit('get-server-data', {
        sessionId: this.props.sessionId
      });
      this.props.pullDataFromServerFalse();
    }
    
  }) 

  useEffect(() => {
    return () => {
      this.disconnect();
      window.removeEventListener('beforeunload', this.onbeforeunload);
    }
  }, []) // notice the empty array

  const onbeforeunload = () => {
    this.disconnect();
  }

  const usernameModalSubmit = (e) => {
    e.preventDefault(); 
    this.props.socketReconnectedDefault();

    setUsernamemodal( false, () => { 
      this.props.updateEventUsername(this.state.username);
      this.props.setHostOV(new OpenVidu())
      this.props.socket.emit('get-user-id');
      this.props.setLoading(true);
    });
    
   /* this.setState({
      usernameModalToggle: false,
    }, () => {
      this.props.updateEventUsername(this.state.username);
      this.props.setHostOV(new OpenVidu())
      this.props.socket.emit('get-user-id');
      this.props.setLoading(true);
    })*/
  }

  const handleChangeUsername = (e) => {
   /* this.setState({
      username: e.target.value
    })*/
    setUsername(e.target.value);
  }

  const disconnect = () => {
    if (this.props.removedFromEvent.reason !== 'deleted'){
      if (this.props.socket){
        this.props.socket.emit('leave-session', {
          sessionId: this.props.sessionId,
          id: this.props.eventData.id
        })
      }
    }
    const session = this.props.eventData.session;
    if (session) {
      session.disconnect();
    }
    this.props.setStateToDefault();
    this.props.disconnectSocket();
  }

  const joinSession = () => {
    let session = this.props.eventData.session;

    session.on('streamCreated', (event) => {

        let stream = session.subscribe(event.stream, undefined);
        //let connectionId = event.stream.connection.connectionId;
        let users = [...this.props.users];
        let id = event.stream.connection.data;
        let found = false;

        users.forEach((user) => {
          if (user.id === id){
            user.stream = stream;
            found = true;
          }
        })
        if (!found){
          users.push({
            stream,
            id
          })
        }
        this.props.updateUsers(users);
    });
    // On every Stream destroyed...
    session.on('streamDestroyed', (event) => {
     
    });

    this.getToken().then((token) => {
      const session = this.props.eventData.session;

      this.props.setToken(token);
      session.connect(token, this.props.eventData.id)
        .then(() => {
          this.props.setConnectionId(session.connection.connectionId);
        })
        .catch((error) => {
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
      });
  }

  const getToken = () => {
    return fetch(SERVER_URL + '/get-token', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sessionId: this.props.sessionId,
        host: this.props.host
      })
    })
    .then(response => response.json())
    .then(data => data.token)
    .catch(console.log)
  }

  const leaveSession = () => {
    this.props.history.push(`/join`);
  }

  return (
    <div className='event-page'>
      <div className='session-container'>
        <EventHeader />
      {
        this.props.eventData.tableView.active
        ? <ZoomedView />
        : <LobbyView />
      }
      </div>
      {
        this.props.eventData.fullScreenMode &&
        <FullScreenMode />
      }
      {
        this.state.usernameModalToggle &&
        <UsernameModal 
          usernameModalSubmit={this.usernameModalSubmit}
          username={this.state.username}
          handleChangeUsername={this.handleChangeUsername}
          socketReconnection={this.props.socketData.socketReconnection}
        />
      }
    </div>
  );

}

/*class Session extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user.username,
            usernameModalToggle: true
        };
    }
    componentDidMount() {
      window.addEventListener('beforeunload', this.onbeforeunload);
      this.props.initializeSocketChannel();
    }

    componentDidUpdate(prevProps){
      if (!prevProps.eventData.id && this.props.eventData.id){
        let hostOV = this.props.eventData.hostOV;
        hostOV.enableProdMode();
        if (hostOV.checkSystemRequirements()){
          this.props.setSession(hostOV.initSession());
        }
        else{
          alert("Sorry, your browser isn't supported by our streaming service.");
        }
      }
      else if (!prevProps.eventData.session && this.props.eventData.session){
        this.joinSession();
      }
      else if (!prevProps.eventData.connectionId 
      && this.props.eventData.connectionId
      && this.props.eventData.token){
        this.props.socket.emit('join-session', {
          id: this.props.eventData.id,
          sessionId: this.props.sessionId,
          connectionId: this.props.eventData.connectionId,
          tableConnectionId: this.props.eventData.tableConnectionId,
          username: this.props.eventData.username,
          socketId: this.props.socket.id,
          profilePictureKey: this.props.user.profilePictureKey,
          host: this.props.host
        })
      }
      if (this.props.removedFromEvent.reason !== ''){
        this.leaveSession();
      }
      if (!prevProps.socketData.socketReconnection && this.props.socketData.socketReconnection){
        this.setState({
          username: this.props.user.username,
          usernameModalToggle: true
        })
      }
      if(!prevProps.socketData.pullDataFromServer && this.props.socketData.pullDataFromServer){
        this.props.socket.emit('get-server-data', {
          sessionId: this.props.sessionId
        });
        this.props.pullDataFromServerFalse();
      }
    }

    componentWillUnmount() {
      this.disconnect();
      window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload = () => {
      this.disconnect();
    }

    usernameModalSubmit = (e) => {
      e.preventDefault(); 
      this.props.socketReconnectedDefault();
      this.setState({
        usernameModalToggle: false,
      }, () => {
        this.props.updateEventUsername(this.state.username);
        this.props.setHostOV(new OpenVidu())
        this.props.socket.emit('get-user-id');
        this.props.setLoading(true);
      })
    }

    handleChangeUsername = (e) => {
      this.setState({
        username: e.target.value
      })
    }

    disconnect = () => {
      if (this.props.removedFromEvent.reason !== 'deleted'){
        if (this.props.socket){
          this.props.socket.emit('leave-session', {
            sessionId: this.props.sessionId,
            id: this.props.eventData.id
          })
        }
      }
      const session = this.props.eventData.session;
      if (session) {
        session.disconnect();
      }
      this.props.setStateToDefault();
      this.props.disconnectSocket();
    }

    joinSession = () => {
      let session = this.props.eventData.session;

      session.on('streamCreated', (event) => {

          let stream = session.subscribe(event.stream, undefined);
          //let connectionId = event.stream.connection.connectionId;
          let users = [...this.props.users];
          let id = event.stream.connection.data;
          let found = false;

          users.forEach((user) => {
            if (user.id === id){
              user.stream = stream;
              found = true;
            }
          })
          if (!found){
            users.push({
              stream,
              id
            })
          }
          this.props.updateUsers(users);
      });
      // On every Stream destroyed...
      session.on('streamDestroyed', (event) => {
       
      });

      this.getToken().then((token) => {
        const session = this.props.eventData.session;

        this.props.setToken(token);
        session.connect(token, this.props.eventData.id)
          .then(() => {
            this.props.setConnectionId(session.connection.connectionId);
          })
          .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
          });
        });
    }

    getToken = () => {
      return fetch(SERVER_URL + '/get-token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          sessionId: this.props.sessionId,
          host: this.props.host
        })
      })
      .then(response => response.json())
      .then(data => data.token)
      .catch(console.log)
    }

    leaveSession = () => {
      this.props.history.push(`/join`);
    }


    render() {
      return (
        <div className='event-page'>
          <div className='session-container'>
            <EventHeader />
          {
            this.props.eventData.tableView.active
            ? <ZoomedView />
            : <LobbyView />
          }
          </div>
          {
            this.props.eventData.fullScreenMode &&
            <FullScreenMode />
          }
          {
            this.state.usernameModalToggle &&
            <UsernameModal 
              usernameModalSubmit={this.usernameModalSubmit}
              username={this.state.username}
              handleChangeUsername={this.handleChangeUsername}
              socketReconnection={this.props.socketData.socketReconnection}
            />
          }
        </div>
      );
    }
  }*/

  const mapStateToProps = createStructuredSelector({
    host: selectHost,
    sessionId: selectSessionId,
    user: selectUser,
    eventData: selectEventData,
    users: selectUsers,
    removedFromEvent: selectRemovedFromEvent,
    socketData: selectSocketData,
    socket: selectSocket
  })
  
  const mapDispatchToProps = dispatch => ({
    updateUsers: users => dispatch(updateUsers(users)),
    setStateToDefault: () => dispatch(setStateToDefault()),
    updateEventUsername: username => (dispatch(updateEventUsername(username))),
    setPublisher: publisher => dispatch(setPublisher(publisher)),
    setSession: session => dispatch(setSession(session)),
    setToken: token => dispatch(setToken(token)),
    setConnectionId: connectionId => dispatch(setConnectionId(connectionId)),
    setHostOV: (hostOV) => dispatch(setHostOV(hostOV)),
    initializeSocketChannel: () => dispatch(initializeSocketChannel()),
    disconnectSocket: () => dispatch(disconnectSocket()),
    socketReconnectedDefault: () => dispatch(socketReconnectedDefault()),
    pullDataFromServerFalse: () => dispatch(pullDataFromServerFalse()),
    setLoading: (loading) => dispatch(setLoading(loading))
  })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Session));