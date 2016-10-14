import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'

// import fetch from 'node-fetch'

/**
 * Post a new Push notification record.
 *
 * @param {object} data - the device installation data
 * @return {object}
 */
export function postPushInstallation(data) {
  const promise = fetch(`${DevineApiConfig.url}installations`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(data)
  }).then(res => res.json())

  return {
    type: actionTypes.POST_PUSH_INSTALLATION,
    payload: {
      promise
    }
  }
}

/**
 * Update push installation record. Usually used for updating the badge count.
 *
 * @param {string} objectId - installation record to update
 * @param {object} data - the new installation params
 * @return {object}
 */
export function putPushInstallation(objectId, data) {
  const promise = fetch(`${DevineApiConfig.url}installations/${objectId}`, {
    method: 'PUT',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(data)
  }).then(res => res.json())

  return {
    type: actionTypes.PUT_PUSH_INSTALLATION,
    payload: {
      promise
    }
  }
}
