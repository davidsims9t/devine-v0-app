import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'

// import fetch from 'node-fetch'

/**
 * Fetch a user's conversations from the db.
 *
 * @param {string} userId - the user's id
 * @return {object} request
 */
export function getConversations(userId) {
  const promise = getMessagesPromise(userId)

  return {
    type: actionTypes.GET_CONVERSATIONS,
    payload: {
      promise
    }
  }
}

/**
 * Return messages (to and from a user).
 *
 * @param {string} userId - the user's id
 * @return {object} request
 */
export function getMessages(userId) {
  const promise = getMessagesPromise(userId)

  return {
    type: actionTypes.GET_MESSAGES,
    payload: {
      promise
    }
  }
}

/**
 * Returns messages from a given user.
 *
 * @param {string} userId - the user's id.
 * @return {object} promise
 */
function getMessagesPromise(userId) {
  const queryStr = JSON.stringify({
    "$or": [
      {
        "fromUser": {
          "className": "_User",
          "__type": "Pointer",
          "objectId": userId
        }
      },
      {
        "toUser": {
          "className": "_User",
          "__type": "Pointer",
          "objectId": userId
        }
      }
    ]
  })

  const promise = fetch(`${DevineApiConfig.url}classes/Message?where=${queryStr}`, {
    method: 'GET',
    headers: {...DevineApiConfig.apiKeys}
  }).then(res => res.json())

  return promise
}
