import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'
import _ from 'lodash'

// import fetch from 'node-fetch'

/**
 * Queries a boutique class.
 *
 * @param {string} objectId - the object id of the boutique
 * @return {object}
 */
export function getBoutique(objectId) {
  const promise = fetch(`${DevineApiConfig.url}classes/Boutique?where={"objectId":"${objectId}"}`, {
    method: 'GET',
    headers: {...DevineApiConfig.apiKeys}
  }).then(res => res.json())

  return {
    type: actionTypes.GET_BOUTIQUE,
    payload: {
      promise
    }
  }
}
