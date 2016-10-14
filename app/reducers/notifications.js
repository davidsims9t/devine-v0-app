import * as actionTypes from '../actions/actionTypes'

/**
 * Handles retrieving and updating user notifications.
 *
 * @param {object} state - the user notification data. If not supplied it defaults to []
 * @param {object} action - the received action
 * @return {object} state - the new mutated state
 */
export default function notifications(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_NOTIFICATIONS_PENDING:
    case actionTypes.PUT_NOTIFICATIONS_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_NOTIFICATIONS_FULFILLED:
      return {
        ...state,
        notifications: action.payload.results,
        isLoading: false
      }
    case actionTypes.PUT_NOTIFICATIONS_FULFILLED:
      return {
        ...state,
        notificationsUpdated: action.payload.results,
        isLoading: false
      }
    default:
      return state
  }
}
