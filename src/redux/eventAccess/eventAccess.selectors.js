import { createSelector } from 'reselect';

export const selectEventAccess = state => state.eventAccess;

export const selectSessionId = createSelector(
  [selectEventAccess],
  eventAccess => eventAccess.sessionId
)

export const selectPasswordCorrect = createSelector(
  [selectEventAccess],
  eventAccess => eventAccess.passwordCorrect
)

export const selectHost = createSelector(
  [selectEventAccess],
  eventAccess => eventAccess.host
)

export const selectRemovedFromEvent = createSelector(
  [selectEventAccess],
  eventAccess => eventAccess.removedFromEvent
)