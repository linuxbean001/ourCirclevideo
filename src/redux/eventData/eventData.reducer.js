import { EventDataActionTypes } from './eventData.types';

const INITIAL_STATE = {
  users: [],
  eventName: '',
  username:'',
  session: undefined,
  publisher: undefined,
  connectionId: '',
  tableConnectionId: '',
  token: '',
  tables: [],
  position: {
    table: -1,
    seat: -1
  },
  seatsPerTable: 8,
  tableView: {
    active: false,
    table: -1
  },
  isVisible: false,
  messages:[],
  tableMessages:{},
  editMode: false,
  bannerPicture: null,
  bannerPictureKey: null,
  hostTable: -2,
  tableSessionId: '',
  tableSession: undefined,
  hasAudio: false,
  tablePublisher: undefined,
  tableToken: '',
  screenShare: false,
  hostOV: null,
  error: null,
  fullScreenMode: false,
  id: '',
}


const eventDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventDataActionTypes.FETCH_EVENT_INFORMATION_SUCCESS:
      return {
        ...state,
        eventName: action.payload.eventName,
        tables: action.payload.tables,
        bannerPicture: action.payload.bannerPicture,
        bannerPictureKey: action.payload.bannerPictureKey,
        username: action.payload.username,
        seatsPerTable: action.payload.seatsPerTable,
        error: null
      }
    case EventDataActionTypes.FETCH_EVENT_INFORMATION_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case EventDataActionTypes.UPDATE_EVENT_USERNAME:
      return {
        ...state,
        username: action.payload
      }

    case EventDataActionTypes.UPDATE_USERS:
      return {
        ...state,
        users: action.payload
      }

    case EventDataActionTypes.SET_HOST_OV:
      return {
        ...state,
        hostOV: action.payload
      }  

    case EventDataActionTypes.UPDATE_HOST_TABLE:
      return {
        ...state,
        hostTable: action.payload
      }

    case EventDataActionTypes.UPDATE_TABLES:
      return {
        ...state,
        tables: action.payload
      }

    case EventDataActionTypes.UPDATE_BANNER:
      return {
        ...state,
        bannerPicture: action.payload.bannerPicture,
        bannerPictureKey: action.payload.bannerPictureKey
      }

    case EventDataActionTypes.UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload
      }

    case EventDataActionTypes.UPDATE_SCREEN_SHARE:
      return {
        ...state,
        screenShare: action.payload
      }

    case EventDataActionTypes.CHANGE_EDIT_MODE:
      return {
        ...state,
        editMode: !state.editMode
      }

    case EventDataActionTypes.SET_PUBLISHER:
      return {
        ...state,
        publisher: action.payload
      }

    case EventDataActionTypes.SET_TABLE_SESSION_ID:
      return {
        ...state,
        tableSessionId: action.payload
      }

    case EventDataActionTypes.SET_TABLE_VIEW:
      return {
        ...state,
        tableView: action.payload
      }

    case EventDataActionTypes.SET_SESSION:
      return {
        ...state,
        session: action.payload
      }

    case EventDataActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }

    case EventDataActionTypes.SET_TABLE_PUBLISHER:
      return {
        ...state,
        tablePublisher: action.payload
      }

    case EventDataActionTypes.SET_TABLE_SESSION:
      return {
        ...state,
        tableSession: action.payload
      }

    case EventDataActionTypes.SET_TABLE_TOKEN:
      return {
        ...state,
        tableToken: action.payload
      }

    case EventDataActionTypes.SET_CONNECTION_ID:
      return {
        ...state,
        connectionId: action.payload
      }

    case EventDataActionTypes.SET_TABLE_CONNECTION_ID:
      return {
        ...state,
        tableConnectionId: action.payload
      }

    case EventDataActionTypes.UPDATE_FULL_SCREEN_MODE:
      return {
        ...state,
        fullScreenMode: action.payload
      }

    case EventDataActionTypes.SET_USER_ID:
      return {
        ...state,
        id: action.payload
      }

    case EventDataActionTypes.MAIN_EVENT_STATE_UPDATE:
      return {
        ...state,
        users: action.payload.users,
        position: action.payload.position,
        hostTable: action.payload.hostTable,
        messages: action.payload.messages,
        tableMessages: action.payload.tableMessages,
        isVisible: action.payload.isVisible,
        hasAudio: action.payload.hasAudio
      }
    case EventDataActionTypes.SERVER_DATA_REQUEST_UPDATE:
        return {
          ...state,
          users: action.payload.users,
          hostTable: action.payload.hostTable
        }
    case EventDataActionTypes.SET_TABLE_STATE_TO_DEFAULT:
      return {
        ...state,
        tableSession: undefined,
        tableSessionId: '',
        tablePublisher: undefined,
        tableConnectionId: '',
        tableToken: '',
        isVisible: false,
        hasAudio: false,
      }
    case EventDataActionTypes.SET_TABLE_STATE_TO_DEFAULT_HOST:
      return {
        ...state,
        tableSession: undefined,
        tableSessionId: '',
        tablePublisher: undefined,
        tableConnectionId: '',
        tableToken: '',
      }
    case EventDataActionTypes.SET_DEFAULT_FOR_SOCKET_RECONNECTION:
      return {
        ...state,
        users: [],
        username:'',
        session: undefined,
        publisher: undefined,
        connectionId: '',
        tableConnectionId: '',
        token: '',
        position: {
          table: -1,
          seat: -1
        },
        tableView: {
          active: false,
          table: -1
        },
        isVisible: false,
        messages:[],
        tableMessages:{},
        editMode: false,
        hostTable: -2,
        tableSessionId: '',
        tableSession: undefined,
        hasAudio: false,
        tablePublisher: undefined,
        tableToken: '',
        screenShare: false,
        hostOV: null,
        error: null,
        fullScreenMode: false,
        id: ''
      }
    case EventDataActionTypes.SET_STATE_TO_DEFAULT:
      return {
        ...state,
        users: [],
        eventName: '',
        username:'',
        session: undefined,
        publisher: undefined,
        connectionId: '',
        tableConnectionId: '',
        token: '',
        tables: [],
        position: {
          table: -1,
          seat: -1
        },
        seatsPerTable: 8,
        tableView: {
          active: false,
          table: -1
        },
        isVisible: false,
        messages:[],
        tableMessages:{},
        editMode: false,
        bannerPicture: null,
        bannerPictureKey: null,
        hostTable: -2,
        tableSessionId: '',
        tableSession: undefined,
        hasAudio: false,
        tablePublisher: undefined,
        tableToken: '',
        screenShare: false,
        hostOV: null,
        error: null,
        fullScreenMode: false,
        id: ''
      }
    default:
      return state;
  }
}

export default eventDataReducer;
