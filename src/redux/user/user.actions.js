import UserActionTypes from './user.types'

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT
})

export const updateExistingEventInfo = data => ({
  type: UserActionTypes.UPDATE_EXISTING_EVENT_INFO,
  payload: data
})

export const signInStart = emailAndPassword => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: emailAndPassword
})

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
})

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
})

export const signUpStart = userDetails => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userDetails
})

export const signUpSuccess = user => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user
})

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
})

export const editProfileAndPictureStart = data => ({
  type: UserActionTypes.EDIT_PROFILE_AND_PICTURE_START,
  payload: data
})

export const editProfileAndPictureSuccess = data => ({
  type: UserActionTypes.EDIT_PROFILE_AND_PICTURE_SUCCESS,
  payload: data
})

export const editProfileAndPictureFailure = error => ({
  type: UserActionTypes.EDIT_PROFILE_AND_PICTURE_FAILURE,
  payload: error
})

export const editProfileStart = data => ({
  type: UserActionTypes.EDIT_PROFILE_START,
  payload: data
})

export const editProfileSuccess = data => ({
  type: UserActionTypes.EDIT_PROFILE_SUCCESS,
  payload: data
})

export const editProfileFailure = error => ({
  type: UserActionTypes.EDIT_PROFILE_FAILURE,
  payload: error
})

export const changeActiveStateStart = data => ({
  type: UserActionTypes.CHANGE_ACTIVE_STATE_START,
  payload: data
})

export const changeActiveStateSuccess = data => ({
  type: UserActionTypes.CHANGE_ACTIVE_STATE_SUCCESS,
  payload: data
})

export const changeActiveStateFailure = error => ({
  type: UserActionTypes.CHANGE_ACTIVE_STATE_FAILURE,
  payload: error
})

export const deleteEventStart = data => ({
  type: UserActionTypes.DELETE_EVENT_START,
  payload: data
})

export const deleteEventSuccess = data => ({
  type: UserActionTypes.DELETE_EVENT_SUCCESS,
  payload: data
})

export const deleteEventFailure = error => ({
  type: UserActionTypes.DELETE_EVENT_FAILURE,
  payload: error
})

export const submitEmailStart = data => ({
  type: UserActionTypes.SUBMIT_EMAIL_START,
  payload: data
})

export const submitEmailSuccess = () => ({
  type: UserActionTypes.SUBMIT_EMAIL_SUCCESS
})

export const submitEmailFailure = error => ({
  type: UserActionTypes.SUBMIT_EMAIL_FAILURE,
  payload: error
})