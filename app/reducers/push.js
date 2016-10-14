import * as actionTypes from '../actions/actionTypes'

/**
 * Handles push registration and updates.
 *
 * @param {array} state - the new installation state. If not supplied it defaults to null
 * @param {object} action - the received action
 * @return {object} state - the new mutated state
 */
export default function push(state = {}, action) {
  switch (action.type) {
    case actionTypes.POST_PUSH_INSTALLATION:
    case actionTypes.PUT_PUSH_INSTALLATION:
      return {
        ...state,
        installation: action.payload.result
      }
    default:
      return state
  }
}
