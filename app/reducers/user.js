import * as actionTypes from '../actions/actionTypes'

/**
 * Updates the user state after various procedures such as login, sign-up, password reset, etc.
 *
 * @param {array} state - the current user or null if not logged in.
 * @param {object} action - the received action
 * @return {array} the new mutated state
 */
export default function user(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_CURRENT_USER_FULFILLED:
      return {
        ...state,
        currentUser: JSON.parse(action.payload),
        isLoading: false
      }
    case actionTypes.GET_USER_PENDING:
    case actionTypes.USER_SIGN_UP_PENDING:
    case actionTypes.USER_LOG_IN_PENDING:
    case actionTypes.USER_FACEBOOK_LOG_IN_PENDING:
    case actionTypes.PUT_USER_PENDING:
      return {
        ...state,
        isUpdating: true
      }
    case actionTypes.GET_USER_FULFILLED:
      return {
        ...state,
        isUpdating: false,
        user: action.payload.results
      }
    case actionTypes.USER_SIGN_UP_FULFILLED:
      return {
        ...state,
        isUpdating: false,
        isSignedUp: true,
        user: action.payload.results
      }
    case actionTypes.PUT_USER_FULFILLED:
      return {
        ...state,
        isUpdating: false,
        hasBeenSaved: true,
        user: action.payload.results
      }
    case actionTypes.USER_LOG_IN_FULFILLED:
      return {
        ...state,
        isUpdating: false,
        isLoggedIn: action.payload
      }
    case actionTypes.USER_FACEBOOK_LOG_IN_FULFILLED:
      return {
        ...state,
        isUpdating: false,
        isLoggedIn: action.payload
      }
    default:
      return state
  }
}
