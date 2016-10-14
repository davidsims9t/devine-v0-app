import * as actionTypes from '../actions/actionTypes'

/**
 * Updates the current feed state.
 *
 * @param {array} - new state. If not supplied it defaults to {}
 * @param {object} action - the received action
 * @return {object} state - the new mutated state
 */
export default function feed(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_FEED_PENDING:
    case actionTypes.GET_FEED_RELATIONAL_DATA_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_FEED_FULFILLED:
      return {
        ...state,
        feedData: action.payload.results,
        isLoading: false
      }
    case actionTypes.GET_FEED_RELATIONAL_DATA_FULFILLED:
      return {
        ...state,
        relationData: action.payload.results,
        isLoading: false
      }
    default:
      return state
  }
}
