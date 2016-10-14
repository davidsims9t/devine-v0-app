import * as actionTypes from '../actions/actionTypes'

/**
 * Updates the user state after various procedures
 *
 * @param {array} state - the current user or null if not logged in.
 * @param {object} action - the received action
 * @return {array} the new mutated state
 */
export default function userBoutique(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_USER_BOUTIQUE_PENDING:
    case actionTypes.POST_USER_BOUTIQUE_PENDING:
    case actionTypes.PUT_USER_BOUTIQUE_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_USER_BOUTIQUE_FULFILLED:
      console.log(action.payload)
      return {
        ...state,
        results: action.payload.results,
        isLoading: false
      }
    case actionTypes.POST_USER_BOUTIQUE_FULFILLED:
    case actionTypes.PUT_USER_BOUTIQUE_FULFILLED:
      return {
        ...state,
        results: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
