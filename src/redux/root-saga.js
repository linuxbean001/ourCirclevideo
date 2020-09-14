import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { eventAccessSagas } from './eventAccess/eventAccess.sagas'
import { eventDataSagas } from './eventData/eventData.sagas'
import { socketSagas } from './socket/socket.sagas';

export default function* rootSaga(){
  yield all([
    call(userSagas), 
    call(eventAccessSagas),
    call(eventDataSagas),
    call(socketSagas)
  ])
}