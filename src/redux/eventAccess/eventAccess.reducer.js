import { EventAccessActionTypes } from './eventAccess.types';

const INITIAL_STATE = {
  sessionId: '',
  sessionPassword: '',
  hostId: '',
  passwordCorrect: false,
  host: false,
  eventCreated: false,
  eventInformationFetched: false,
  removedFromEvent:{
    removed: false,
    reason: ''
  },
  error: null
}

const eventAccessReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventAccessActionTypes.EVENT_ACCESS_DEFAULT:
      return {
        ...state,
        sessionId: '',
        sessionPassword: '',
        hostId: '',
        passwordCorrect: false,
        host: false,
        eventCreated: false,
        eventInformationFetched: false,
        error: null
      }
    case EventAccessActionTypes.JOIN_SESSION:
    case EventAccessActionTypes.JOIN_EVENT_SUCCESS:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        passwordCorrect: action.payload.passwordCorrect,
        host: action.payload.host,
        error: null
      }
    case EventAccessActionTypes.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        sessionPassword: action.payload.sessionPassword,
        hostId: action.payload.hostId,
        eventCreated: true,
        error: null
      }
    case EventAccessActionTypes.CREATE_EVENT_FAILURE:
    case EventAccessActionTypes.JOIN_EVENT_FAILURE:
      return {
        ...state,
        error: action.payload
      }  
    case EventAccessActionTypes.REMOVE_FROM_EVENT:
      return {
        ...state,
        removedFromEvent:{
          removed: true,
          reason: action.payload
        }
      }
    case EventAccessActionTypes.SET_REMOVED_STATE_TO_DEFAULT:
      return {
        ...state,
        removedFromEvent:{
          removed: false,
          reason: ''
        }
      }
    case EventAccessActionTypes.SET_EVENT_INFORMATION_FETCHED:
      return {
        ...state,
        eventInformationFetched: true
      }
    default:
      return state;
  }
}

export default eventAccessReducer;
