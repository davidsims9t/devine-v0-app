import * as actionTypes from '../actions/actionTypes'

/**
 * Updates the current boutique state.
 *
 * @param {array} - new state. If not supplied it defaults to []
 * @param {object} action - the received action
 * @return {object} state - the new mutated state
 */
export default function boutique(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_BOUTIQUE:
      return {
        ...state,
        boutique: action.payload.results
      }
    default:
      return state
  }
}
