import { EventDataActionTypes } from './eventData.types'

export const fetchEventInformationStart = data => ({
  type: EventDataActionTypes.FETCH_EVENT_INFORMATION_START,
  payload: data
})

export const fetchEventInformationSuccess = data => ({
  type: EventDataActionTypes.FETCH_EVENT_INFORMATION_SUCCESS,
  payload: data
})

export const fetchEventInformationFailure = error => ({
  type: EventDataActionTypes.FETCH_EVENT_INFORMATION_FAILURE,
  payload: error
})

export const updateEventUsername = username => ({
  type: EventDataActionTypes.UPDATE_EVENT_USERNAME,
  payload: username
})

export const updateUsers = users => ({
  type: EventDataActionTypes.UPDATE_USERS,
  payload: users
})

export const setHostOV = hostOV => ({
  type: EventDataActionTypes.SET_HOST_OV,
  payload: hostOV
})

export const updateTables = tables => ({
  type: EventDataActionTypes.UPDATE_TABLES,
  payload: tables
})

export const updateBanner = bannerPictureObj => ({
  type: EventDataActionTypes.UPDATE_BANNER,
  payload: bannerPictureObj
})

export const updateToken = token => ({
  type: EventDataActionTypes.UPDATE_TOKEN,
  payload: token
})

export const updateScreenShare = screenShare => ({
  type: EventDataActionTypes.UPDATE_SCREEN_SHARE,
  payload: screenShare
})

export const setInitialEventInfo = eventInfo => ({
  type: EventDataActionTypes.SET_INITIAL_EVENT_INFO,
  payload: eventInfo
})

export const setPublisher = publisher => ({
  type: EventDataActionTypes.SET_PUBLISHER,
  payload: publisher
})

export const setTablePublisher = tablePublisher => ({
  type: EventDataActionTypes.SET_TABLE_PUBLISHER,
  payload: tablePublisher
})

export const setSession = session => ({
  type: EventDataActionTypes.SET_SESSION,
  payload: session
})

export const setTableSessionId = tableSessionId => ({
  type: EventDataActionTypes.SET_TABLE_SESSION_ID,
  payload: tableSessionId
})

export const setTableSession = tableSession => ({
  type: EventDataActionTypes.SET_TABLE_SESSION,
  payload: tableSession
})

export const setToken = token => ({
  type: EventDataActionTypes.SET_TOKEN,
  payload: token
})

export const setTableToken = tableToken => ({
  type: EventDataActionTypes.SET_TABLE_TOKEN,
  payload: tableToken
})

export const setConnectionId = connectionId => ({
  type: EventDataActionTypes.SET_CONNECTION_ID,
  payload: connectionId
})

export const setTableConnectionId = tableConnectionId => ({
  type: EventDataActionTypes.SET_TABLE_CONNECTION_ID,
  payload: tableConnectionId
})

export const setTableView = tableView => ({
  type: EventDataActionTypes.SET_TABLE_VIEW,
  payload: tableView
})

export const changeEditMode = () => ({
  type: EventDataActionTypes.CHANGE_EDIT_MODE
})

export const mainEventStateUpdate = (data) => ({
  type: EventDataActionTypes.MAIN_EVENT_STATE_UPDATE,
  payload: data
})

export const serverDataRequestUpdate = (data) => ({
  type: EventDataActionTypes.SERVER_DATA_REQUEST_UPDATE,
  payload: data
})

export const setTableStateToDefault = () => ({
  type: EventDataActionTypes.SET_TABLE_STATE_TO_DEFAULT,
})

export const setTableStateToDefaultHost = () => ({
  type: EventDataActionTypes.SET_TABLE_STATE_TO_DEFAULT_HOST,
})

export const setDefaultForSocketReconnection = () => ({
  type: EventDataActionTypes.SET_DEFAULT_FOR_SOCKET_RECONNECTION
})

export const setStateToDefault = () => ({
  type: EventDataActionTypes.SET_STATE_TO_DEFAULT,
})

export const updateFullScreenMode = (fullScreen) => ({
  type: EventDataActionTypes.UPDATE_FULL_SCREEN_MODE,
  payload: fullScreen
})

export const setUserId = (id) => ({
  type: EventDataActionTypes.SET_USER_ID,
  payload: id
})