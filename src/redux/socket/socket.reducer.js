import SocketActionTypes from './socket.types';

const INITIAL_STATE = {
  socket: null,
  socketReconnection: false,
  packetCount: -1,
  pullDataFromServer: false
}


const socketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SocketActionTypes.SOCKET_CONNECTED:
      return {
        ...state,
        socket: action.payload
      }
    case SocketActionTypes.SOCKET_DISCONNECTED:
      return {
        ...state,
        socket: null,
        socketReconnection: false,
        packetCount: -1,
        pullDataFromServer: false
      }
    case SocketActionTypes.SOCKET_RECONNECTED:
      return {
        ...state,
        socketReconnection: true
      }
    case SocketActionTypes.SOCKET_RECONNECTED_DEFAULT:
      return {
        ...state,
        socketReconnection: false
      }
    case SocketActionTypes.UPDATE_PACKET_STATUS:
      return {
        ...state,
        packetCount: action.payload.newReduxPacketCount,
        pullDataFromServer: action.payload.pullDataFromServer
      }
    case SocketActionTypes.PULL_DATA_FROM_SERVER_FALSE:
      return {
        ...state,
        pullDataFromServer: false
      }
    default:
      return state;
  }
}

export default socketReducer;
