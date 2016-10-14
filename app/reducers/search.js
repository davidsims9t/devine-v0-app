import * as actionTypes from '../actions/actionTypes'

/**
 * Handles search results.
 *
 * @param {array} state - the new search state. If not supplied it defaults to {}
 * @param {object} action - the received action
 * @return {object} state - the new mutated state
 */
export default function search(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_SEARCH_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_SEARCH_FULFILLED:
      return {
        ...state,
        isLoading: false,
        searchResults: action.payload.results
      }
    default:
      return state
  }
}
