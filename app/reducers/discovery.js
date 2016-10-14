import * as actionTypes from '../actions/actionTypes'

/**
 * Updates the initial feed state
 *
 * @param array state the feed data. If not supplied it defaults to []
 * @param action the received action
 * @return state the new mutated state
 */
export default function discovery(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_FEED_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_FEED_FULFILLED:
      return {
        ...state,
        isLoading: false,
        feedData: action.payload.result
      }
    default:
      return state
  }
}
