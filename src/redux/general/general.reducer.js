import GeneralActionTypes from './general.types';

const INITIAL_STATE = {
  loading: false,
  generalModal:{
    active: false,
    code: 0,
    modalText: ''
  },
}


const generalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GeneralActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case GeneralActionTypes.OPEN_GENERAL_MODAL:
      return {
        ...state,
        generalModal:{
          active: true,
          code: action.payload.code,
          modalText: action.payload.modalText
        }
      }
    case GeneralActionTypes.CLOSE_GENERAL_MODAL:
      return {
        ...state,
        generalModal:{
          active: false,
          code: 0,
          modalText: ""
        }
      }
    default:
      return state;
  }
}

export default generalReducer;
