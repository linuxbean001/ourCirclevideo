import UserActionTypes from './user.types';

const INITIAL_STATE = {
  isSignedIn: false,
  username: '',
  email: '',
  profilePicture: null,
  profilePictureKey: null,
  existingEventInfo: [],
  submitEmailForTrial: false,
  plan: 0,
  error: null
}


const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        username: action.payload.name,
        email: action.payload.email,
        profilePicture: action.payload.profilePicture,
        profilePictureKey: action.payload.profilePictureKey,
        existingEventInfo: action.payload.existingEventInfo,
        plan: action.payload.plan,
        error: null
      }

    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        username: action.payload.name,
        email: action.payload.email,
        profilePicture: action.payload.profilePicture,
        profilePictureKey: action.payload.profilePictureKey,
        existingEventInfo: action.payload.existingEventInfo,
        plan: action.payload.plan,
        error: null
      }
    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        username: '',
        email: '',
        profilePicture: null,
        profilePictureKey: null,
        existingEventInfo: [],
        plan: 0,
        error: null
      }
    case UserActionTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        username: action.payload.name,
        email: action.payload.email,
        error: null
      }
    case UserActionTypes.EDIT_PROFILE_AND_PICTURE_SUCCESS:
      return {
        ...state,
        username: action.payload.name,
        email: action.payload.email,
        profilePicture: action.payload.profilePicture,
        profilePictureKey: action.payload.profilePictureKey,
        error: null
      }
    case UserActionTypes.CHANGE_ACTIVE_STATE_SUCCESS:
    case UserActionTypes.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        existingEventInfo: action.payload,
        error: null
      }
    case UserActionTypes.UPDATE_EXISTING_EVENT_INFO:
      return {
        ...state,
        existingEventInfo: action.payload
      }
    case UserActionTypes.SUBMIT_EMAIL_SUCCESS:
      return{
        ...state,
        submitEmailForTrial: true,
        error: null
      }
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.EDIT_PROFILE_FAILURE:
    case UserActionTypes.EDIT_PROFILE_AND_PICTURE_FAILURE:
    case UserActionTypes.CHANGE_ACTIVE_STATE_FAILURE:
    case UserActionTypes.DELETE_EVENT_FAILURE:
    case UserActionTypes.SUBMIT_EMAIL_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;
