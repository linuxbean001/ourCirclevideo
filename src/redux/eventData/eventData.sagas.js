import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import { 
  fetchEventInformationSuccess,
  fetchEventInformationFailure
} from './eventData.actions'
import { setEventInformationFetched } from '../eventAccess/eventAccess.actions'
import { EventDataActionTypes } from './eventData.types'
import { selectUser } from '../user/user.selectors'

import { setLoading } from '../general/general.actions';
import { SERVER_URL } from '../../utils/constants';


export function* fetchEventInformation({payload: {sessionId}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/get-event-information', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sessionId
      })
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('unable to fetch event information');
      }
    })
    yield put(setLoading(false));
    const user = yield select(selectUser);
    yield put(fetchEventInformationSuccess({
      eventName: data.eventName,
      tables: data.tables,
      bannerPicture: data.bannerPicture,
      bannerPictureKey: data.bannerPictureKey,
      username: user.username,
      seatsPerTable: data.seatsPerTable
    }))
    yield put(setEventInformationFetched());

  } catch(error){
    yield put(setLoading(false));
    yield put(fetchEventInformationFailure(error));
  }
}


export function* onFetchEventInformationStart(){
  yield takeLatest(EventDataActionTypes.FETCH_EVENT_INFORMATION_START, fetchEventInformation)
}

export function* eventDataSagas() {
  yield all([
    call(onFetchEventInformationStart) 
  ])
}