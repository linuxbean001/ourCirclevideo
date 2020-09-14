import { take, takeEvery, takeLatest, put, call, all, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import io from 'socket.io-client';

import SocketActionTypes from './socket.types';

import {
  socketConnected, 
  socketDisconnected, 
  socketReconnected,
  updatePacketStatus
} from './socket.actions';
import {selectSocket, selectSocketData} from './socket.selectors';
import {selectEventData} from '../eventData/eventData.selectors';
import {
  setDefaultForSocketReconnection, 
  mainEventStateUpdate,
  setUserId,
  serverDataRequestUpdate
} from '../eventData/eventData.actions';
import { removeFromEvent } from '../eventAccess/eventAccess.actions';
import { setLoading } from '../general/general.actions';
import { selectLoading } from '../general/general.selectors';
import {
  mainIntervalUpdate,
  socketDisconnect,
  processServerDataRequest
} from './socket.utils';

import { SERVER_URL } from '../../utils/constants';


// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createEventChannel(socket) {
  return eventChannel(emit => {
    //socket.on((message) => emit(message.data));
    socket.on('main-interval-update', (data) => {
      emit({
        type: 'main-interval-update',
        data
      });
    })

    socket.on('server-data-request', (data) => {
      emit({
        type: 'server-data-request',
        data
      });
    })

    socket.on('user-id', (data) => {
      emit({
        type: 'user-id',
        data
      });
    })

    socket.on('connect', () => {
      console.log("REDUX SAGA SOCKET CONNECTED");
      
    });

    socket.on('disconnect', () => {
      console.log("REDUX SAGA SOCKET DISCONNECTED");
      emit({
        type: 'disconnect'
      });
      //emit(END);
    });
    socket.on('reconnect', () => {
      console.log("REDUX SAGA SOCKET RECONNECT");
      emit({
        type: 'reconnect'
      });
    });
    socket.on('remove-users', (reason) => {
      emit({
        type: 'remove-users',
        data: reason
      });
    });
    
    socket.on('remove-users', () => {
      console.log("REDUX SAGA SOCKET REMOVE USERS");
      
    });
    return () => {
      console.log("CLOSING SOCKET SAGA")
      socket.close();
    };
  });
}


function* initializeSocketChannel() {
  const socket = yield io.connect(SERVER_URL);
  yield put(socketConnected(socket));
  const channel = yield call(createEventChannel, socket);
  while (true) {
    try{
      const event = yield take(channel);
      if (event.type === 'main-interval-update') {
        const eventData = yield select(selectEventData);
        const socketData = yield select(selectSocketData);
        const { 
          newStateData, 
          newReduxPacketCount, 
          pullDataFromServer 
        } = yield mainIntervalUpdate(event.data, eventData, socketData.packetCount);

        yield put(updatePacketStatus({
          newReduxPacketCount,
          pullDataFromServer
        }))

        yield put(mainEventStateUpdate(newStateData));
      }
      else if (event.type === 'server-data-request'){
        const eventData = yield select(selectEventData);
        const newStateData = yield processServerDataRequest(event.data, eventData);
        const loading = yield select(selectLoading);
        if (loading){
          yield put(setLoading(false));
        }
        yield put(serverDataRequestUpdate(newStateData));
      }
      else if (event.type === 'user-id'){
        yield put(setUserId(event.data.id));
      }
      else if (event.type === 'disconnect'){
        const {session, tableSession} = yield select(selectEventData);
        yield socketDisconnect(session, tableSession);

      }
      else if (event.type === 'reconnect'){
        yield put(setDefaultForSocketReconnection());
        yield put(socketReconnected());
      }
      else if (event.type === 'remove-users'){
        yield put(removeFromEvent(event.data));
      }
      //yield put({type: WEBSOCKET_MESSAGE_RECEIVED, message});
    }
    catch (error) {
      console.error('socket error:', error)
    }
  }
}

function* disconnectSocket() {
  const socket = yield select(selectSocket);
  yield socket.disconnect();
  yield put(socketDisconnected());
}

export function* onSocketInitialize() {
  yield takeEvery(SocketActionTypes.INITIALIZE_SOCKET_CHANNEL, initializeSocketChannel)
}

export function* onDisconnectSocket() {
  yield takeLatest(SocketActionTypes.DISCONNECT_SOCKET, disconnectSocket)
}

export function* socketSagas() {
  yield all([
    call(onSocketInitialize),
    call(onDisconnectSocket)
  ])
}