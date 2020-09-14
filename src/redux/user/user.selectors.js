import { createSelector } from 'reselect';

export const selectUser = state => state.user;

export const selectIsSignedIn = createSelector(
  [selectUser],
  user => user.isSignedIn
)

export const selectEmail = createSelector(
  [selectUser],
  user => user.email
)

export const selectUsername = createSelector(
  [selectUser],
  user => user.username
)
export const selectExistingEventInfo = createSelector(
  [selectUser],
  user => user.existingEventInfo
)
