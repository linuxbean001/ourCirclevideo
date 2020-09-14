import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { 
  signInSuccess, 
  signInFailure, 
  signUpSuccess,
  signUpFailure,
  editProfileAndPictureSuccess,
  editProfileAndPictureFailure,
  editProfileSuccess,
  editProfileFailure,
  changeActiveStateSuccess,
  changeActiveStateFailure,
  deleteEventSuccess,
  deleteEventFailure,
  submitEmailSuccess,
  submitEmailFailure 
} from './user.actions';
import { setLoading, openGeneralModal } from '../general/general.actions';

import { SERVER_URL } from '../../utils/constants';

export function* signIn({payload: {email, password}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email.toLowerCase(),
        password
      })
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('error signing in');
      }
    })
    yield put(setLoading(false));
    yield put(signInSuccess(data))

  } catch(error){
    yield put(setLoading(false));
    yield put(signInFailure(error))
  }
}

export function* signUp({payload: {email, password, displayName}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        profilePicture: null,
        name: displayName,
        email: email.toLowerCase(),
        password: password
      })
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('error signing up');
      }
    })
    yield put(setLoading(false));
    yield put(signUpSuccess(data))

  } catch(error){
    yield put(setLoading(false));
    yield put(signUpFailure(error))
  }
}

export function* editProfileAndPicture({payload: {formData}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/edit-profile-picture', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('error editing profile');
      }
    })
    yield put(setLoading(false));
    yield put(editProfileAndPictureSuccess(data))

  } catch(error){
    yield put(setLoading(false));
    yield put(editProfileAndPictureFailure(error))
  }
}

export function* editProfile({payload: {username, email}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/edit-profile-no-picture', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        email: email
      })
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('error editing profile');
      }
    })
    yield put(setLoading(false));
    yield put(editProfileSuccess(data))

  } catch(error){
    yield put(setLoading(false));
    yield put(editProfileFailure(error))
  }
}

export function* changeActiveState({payload: {sessionId, active, existingEventInfo, eventInfo}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/change-active-state', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sessionId,
        active
      })
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('error changing active state');
      }
    })
    .then(data => {
      let existingEventInfoTemp = [...existingEventInfo];
      existingEventInfoTemp.forEach(event => {
        if (event.sessionId === eventInfo.sessionId){
          event.active = data.active;
        }
      })
      return existingEventInfoTemp;
    })
    yield put(setLoading(false));
    yield put(changeActiveStateSuccess(data))

  } catch(error){
    yield put(setLoading(false));
    yield put(changeActiveStateFailure(error))
  }
}

export function* deleteEvent({payload: {sessionId, sessionIdArray, email, handleEventModalClose}}){
  try{
    yield put(setLoading(true));
    const data = yield fetch(SERVER_URL + '/delete-event', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sessionId,
        sessionIdArray,
        email
      })
    })
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('error deleting event');
      }
    })
    yield put(setLoading(false));
    handleEventModalClose();
    yield put(deleteEventSuccess(data))
  
  } catch(error){
    yield put(setLoading(false));
    yield put(deleteEventFailure(error))
  }
}

export function* submitEmail({payload: {email}}){
  try{
    yield put(setLoading(true));
    yield fetch(SERVER_URL + '/free-trial', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email
      })
    })
    .then(response => {
      console.log('response:',response);
      if (response.ok){
        return;
      }
      else{
        throw new Error('error submitting email');
      }
    })
    yield put(setLoading(false));
    yield put(openGeneralModal({
      code: 0,
      modalText: "You should receive an email within 2 minutes."
    }));
    yield put(submitEmailSuccess());
    
  } catch(error){
    yield put(setLoading(false));
    yield put(openGeneralModal({
      code: 0,
      modalText: "There was an error sending your email. Please try again."
    }));
    yield put(submitEmailFailure(error));
  }
}

export function* onSignInStart(){
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn)
}
export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}
export function* editProfileAndPictureStart(){
  yield takeLatest(UserActionTypes.EDIT_PROFILE_AND_PICTURE_START, editProfileAndPicture)
}
export function* editProfileStart(){
  yield takeLatest(UserActionTypes.EDIT_PROFILE_START, editProfile)
}
export function* changeActiveStateStart(){
  yield takeLatest(UserActionTypes.CHANGE_ACTIVE_STATE_START, changeActiveState)
}
export function* deleteEventStart(){
  yield takeLatest(UserActionTypes.DELETE_EVENT_START, deleteEvent)
}
export function* submitEmailStart(){
  yield takeLatest(UserActionTypes.SUBMIT_EMAIL_START, submitEmail)
}

export function* userSagas() {
  yield all([
    call(onSignInStart), 
    call(onSignUpStart), 
    call(editProfileAndPictureStart),
    call(editProfileStart),
    call(changeActiveStateStart),
    call(deleteEventStart),
    call(submitEmailStart)
  ])
}