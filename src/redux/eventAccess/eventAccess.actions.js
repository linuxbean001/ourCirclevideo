import { EventAccessActionTypes } from './eventAccess.types'

export const joinSession = eventData => ({
  type: EventAccessActionTypes.JOIN_SESSION,
  payload: eventData
})

export const setEventAccessDefault = eventData => ({
  type: EventAccessActionTypes.EVENT_ACCESS_DEFAULT,
  payload: eventData
})

export const removeFromEvent = reason => ({
  type: EventAccessActionTypes.REMOVE_FROM_EVENT,
  payload: reason
})

export const setRemovedStateToDefault = () => ({
  type: EventAccessActionTypes.SET_REMOVED_STATE_TO_DEFAULT
})

export const createEventStart = data => ({
  type: EventAccessActionTypes.CREATE_EVENT_START,
  payload: data
})

export const createEventSuccess = data => ({
  type: EventAccessActionTypes.CREATE_EVENT_SUCCESS,
  payload: data
})

export const createEventFailure = error => ({
  type: EventAccessActionTypes.CREATE_EVENT_FAILURE,
  payload: error
})

export const joinEventStart = data => ({
  type: EventAccessActionTypes.JOIN_EVENT_START,
  payload: data
})

export const joinEventSuccess = data => ({
  type: EventAccessActionTypes.JOIN_EVENT_SUCCESS,
  payload: data
})

export const joinEventFailure = error => ({
  type: EventAccessActionTypes.JOIN_EVENT_FAILURE,
  payload: error
})

export const setEventInformationFetched = () => ({
  type: EventAccessActionTypes.SET_EVENT_INFORMATION_FETCHED
})