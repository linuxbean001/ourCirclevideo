import SocketActionTypes from './socket.types'

export const initializeSocketChannel = () => ({
  type: SocketActionTypes.INITIALIZE_SOCKET_CHANNEL
})

export const socketConnected = socket => ({
  type: SocketActionTypes.SOCKET_CONNECTED,
  payload: socket
})

export const disconnectSocket = () => ({
  type: SocketActionTypes.DISCONNECT_SOCKET
})

export const socketDisconnected = () => ({
  type: SocketActionTypes.SOCKET_DISCONNECTED
})

export const socketReconnected = () => ({
  type: SocketActionTypes.SOCKET_RECONNECTED
})

export const socketReconnectedDefault = () => ({
  type: SocketActionTypes.SOCKET_RECONNECTED_DEFAULT
})

export const updatePacketStatus = (packetStatus) => ({
  type: SocketActionTypes.UPDATE_PACKET_STATUS,
  payload: packetStatus
})

export const pullDataFromServerFalse = () => ({
  type: SocketActionTypes.PULL_DATA_FROM_SERVER_FALSE
})