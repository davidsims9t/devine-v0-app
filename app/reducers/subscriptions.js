import * as actionTypes from '../actions/actionTypes'

/**
 * Handles updating the channel subscription state when actions are received.
 *
 * @param {array} state - the subscription data. If not supplied it defaults to {}
 * @param {action} action - the received action
 * @return {object} the new mutated state
 */
export default function subscriptions(state = {}, action) {
  switch (action.type) {
    case actionTypes.SUBSCRIBE_TO_CHANNEL_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.SUBSCRIBE_TO_CHANNEL_FULFILLED:
      return {
        ...state,
        messages: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
