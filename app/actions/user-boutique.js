import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'

// import fetch from 'node-fetch'

/**
 * Given a specific userId and boutiqueId, return the user boutique record.
 *
 * @param {object} params - userId, boutiqueId, isFollowing, isClient
 * @return {object} request
 */
export function getUserBoutique(params) {
  let where = {}

  if (params.userId) {
    where.user = {
      "className": "_User",
      "__type": "Pointer",
      "objectId": params.userId
    }
  }

  if (params.boutiqueId) {
    where.boutique = {
      "className": "Boutique",
      "__type": "Pointer",
      "objectId": params.boutiqueId
    }
  }

  if (params.isFollowing) {
    where.isFollowing = params.isFollowing
  }

  if (params.isClient) {
    where.isClient = params.isClient
  }

  where = JSON.stringify(where)

  const promise = fetch(`${DevineApiConfig.url}classes/UserBoutique?where=${where}`, {
    method: 'GET',
    headers: {...DevineApiConfig.apiKeys}
  }).then(res => res.json())

  return {
    type: actionTypes.GET_USER_BOUTIQUE,
    payload: {
      promise
    }
  }
}

/**
 * Creates a new user boutique record.
 *
 * @param {object} params - user, boutique, isClient, isFollowing
 * @return {object} request
 */
export function postUserBoutique(params) {
  if (!params.userId || !params.boutiqueId) {
    return false
  }

  let fields = {}

  fields.user = {
    "className": "_User",
    "__type": "Pointer",
    "objectId": params.userId
  }

  fields.boutique = {
    "className": "Boutique",
    "__type": "Pointer",
    "objectId": params.boutiqueId
  }

  fields.isClient = !!params.isClient
  fields.isFollowing = !!params.isFollowing

  const promise = fetch(`${DevineApiConfig.url}classes/UserBoutique`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(fields)
  }).then(res => res.json())

  return {
    type: actionTypes.POST_USER_BOUTIQUE,
    payload: {
      promise
    }
  }
}

/**
 * Updates an existing user boutique record.
 *
 * @param {object} params - objectId, isClient, isFollowing
 * @return {object} request
 */
export function putUserBoutique(params) {
  if (!params.objectId) {
    return false
  }

  let fields = {}

  if (typeof params.isClient != "undefined") {
    fields.isClient = params.isClient
  }

  if (typeof params.isClient != "undefined") {
    fields.isFollowing = params.isFollowing
  }

  const promise = fetch(`${DevineApiConfig.url}classes/UserBoutique/${params.objectId}`, {
    method: 'PUT',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(fields)
  }).then(res => res.json())

  return {
    type: actionTypes.PUT_USER_BOUTIQUE,
    payload: {
      promise
    }
  }
}
