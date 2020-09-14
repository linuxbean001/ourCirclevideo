import { createSelector } from 'reselect';

export const selectSocketData = state => state.socketData;

export const selectSocket = createSelector(
  [selectSocketData],
  socketData => socketData.socket
)