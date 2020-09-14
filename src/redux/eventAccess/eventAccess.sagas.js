import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import { EventAccessActionTypes } from './eventAccess.types';

import { updateExistingEventInfo } from '../user/user.actions';
import { 
  createEventSuccess,
  createEventFailure,
  joinEventSuccess,
  joinEventFailure 
} from './eventAccess.actions';
import { selectExistingEventInfo } from '../user/user.selectors';
import { setLoading } from '../general/general.actions';

import { SERVER_URL } from '../../utils/constants';

export function* createEvent({payload: {eventName, email, numOfAttendees, seatsPerTable}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/create-event', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        eventName,
        email,
        numOfAttendees,
        seatsPerTable
        // startTime: startTime,
        // endTime: endTime
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data === "access denied"){
        throw new Error('access denied');
      }
      else if (data === 'unable to create event'){
        throw new Error('unable to create event');
      }
      else{
        return data;
      }
    })
    const existingEventInfo = yield select(selectExistingEventInfo);
    yield put(setLoading(false));
    yield put(updateExistingEventInfo([...existingEventInfo, data]));
    yield put(createEventSuccess({
      sessionId: data.sessionId,
      sessionPassword: data.sessionPassword,
      hostId: data.hostId
    }))

  } catch(error){
    yield put(setLoading(false));
    yield put(createEventFailure(error))
  }
}

export function* joinEvent({payload: {sessionId, sessionPassword, hostId}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/join-event', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sessionId,
        sessionPassword,
        hostId
      })
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('unable to join event');
      }
    })
    yield put(setLoading(false));
    yield put(joinEventSuccess({
      host: data.isHost,
      sessionId: sessionId,
      passwordCorrect: true
    }))

  } catch(error){
    yield put(setLoading(false));
    yield put(joinEventFailure(error))
  }
}

export function* onCreateEventStart(){
  yield takeLatest(EventAccessActionTypes.CREATE_EVENT_START, createEvent)
}
export function* onJoinEventStart(){
  yield takeLatest(EventAccessActionTypes.JOIN_EVENT_START, joinEvent)
}

export function* eventAccessSagas() {
  yield all([
    call(onCreateEventStart),
    call(onJoinEventStart) 
  ])
}