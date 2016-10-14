import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'

/**
 * Groups all messages to and from a given user.
 *
 * @param {object} state - the feed data. If not supplied it defaults to null
 * @param {object} action - the received action
 * @return {object} state - the new mutated state
 */
export default function messages(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_CONVERSATIONS_PENDING:
    case actionTypes.GET_MESSAGES_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_CONVERSATIONS_FULFILLED:
      const conversations = getConversations(action.payload.results)
      return {
        ...state,
        isLoading: false,
        conversations
      }
    case actionTypes.GET_MESSAGES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messages: action.payload.results
      }
    default:
      return state
  }
}

/**
 * Returns a grouped collection of messages.
 *
 * @param {array} messages - an array of messages
 * @return {object} conversations
 */
export default function getConversations(messages, userId) {
  let conversations = []

  const messagesGroupedByUser = _.groupBy(messages, message => {
    const fromUser = message.fromUser
    const toUser = message.toUser

    if (fromUser && fromUser.objectId != userId) {
      return fromUser.objectId
    }

    if (toUser && toUser.objectId != userId) {
      return toUser.objectId
    }
  })

  _.forEach(messagesGroupedByUser, (messageList, messageGroup) => {
    const newestMessage = _.max(messageList, message => {
      return new Date(message.createdAt).getTime()
    })

    conversations.push(newestMessage)
  })

  return conversations
}
