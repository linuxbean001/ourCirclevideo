import GeneralActionTypes from './general.types'

export const setLoading = loading => ({
  type: GeneralActionTypes.SET_LOADING,
  payload: loading
})

export const openGeneralModal = data => ({
  type: GeneralActionTypes.OPEN_GENERAL_MODAL,
  payload: data
})

export const closeGeneralModal = () => ({
  type: GeneralActionTypes.CLOSE_GENERAL_MODAL
})