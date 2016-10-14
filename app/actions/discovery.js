import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'

// import fetch from 'node-fetch'

/**
 * Returns a list of feed items.
 *
 * @param {string} userId - (optional) the userId to pass
 * @param {integer} offset - (optional) the offset we should start at
 * @return {object}
 */
export function getFeed(userId, offset = 0) {
  const promise = fetch(`${DevineApiConfig.url}functions/feed`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify({userId, offset})
  }).then(res => res.json())

  return {
    type: actionTypes.GET_FEED,
    payload: {
      promise
    }
  }
}
