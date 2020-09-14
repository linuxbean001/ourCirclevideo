import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import eventAccessReducer from './eventAccess/eventAccess.reducer';
import eventDataReducer from './eventData/eventData.reducer';
import generalReducer from './general/general.reducer';
import socketReducer from './socket/socket.reducer';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  user: userReducer,
  eventAccess: eventAccessReducer,
  eventData: eventDataReducer,
  general: generalReducer,
  socketData: socketReducer
})

export default persistReducer(persistConfig, rootReducer);