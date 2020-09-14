import { createSelector } from 'reselect';

export const selectEventData = state => state.eventData;

export const selectUsers = createSelector(
  [selectEventData],
  eventData => eventData.users
)

export const selectEventUsername = createSelector(
  [selectEventData],
  eventData => eventData.username
)
