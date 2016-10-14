import { generateRandomString } from '../utils/string'
import { normalizePhone } from '../utils/number'

// import fetch from 'node-fetch'

import DevineApiConfig from '../config/api'
import * as actionTypes from '../actions/actionTypes'

import LocalStorage from 'react-native-simple-store'

/**
 * Returns the currently logged in user if there is one.
 *
 * @return {object} request - returns the user from local storage
 */
export function getCurrentUser() {
  const promise = LocalStorage.get('user')

  return {
    type: actionTypes.GET_CURRENT_USER,
    payload: {
      promise
    }
  }
}

/**
 * Returns the currently logged in user if there is one.
 *
 * @param {object} user - the user's object
 * @return {object} request
 */
export function isUserSessionValid(user) {
  const promise = fetch(`${DevineApiConfig.url}classes/_User?where=${jsonString}`, {
    method: 'GET',
    headers: {
      ...DevineApiConfig.apiKeys,
      "X-Parse-Session-Token": user.sessionToken
    }
  }).then(res => res.json())

  return {
    type: actionTypes.GET_CURRENT_USER,
    payload: {
      promise
    }
  }
}

/**
 * Queries a user using the Parse master key and REST api.
 *
 * @param {object} query - parameters to pass to query (i.e. email, phone)
 * @return {object} request
 */
export function getUser(query) {
  if (query.phone) {
    query.phone = normalizePhone(query.phone)
  }

  const jsonString = JSON.stringify(query)
  const promise = fetch(`${DevineApiConfig.url}classes/_User?where=${jsonString}`, {
    method: 'GET',
    headers: {...DevineApiConfig.apiKeys}
  }).then(res => res.json())

  return {
    type: actionTypes.GET_USER,
    payload: {
      promise
    }
  }
}

/**
 * Logs the user in and stores the user credentials in local storage.
 *
 * @param  {string} username - the username
 * @param  {string} password - the password
 * @return {object} request
 */
export function logIn(username, password) {
  const promise = fetch(`${DevineApiConfig.url}login?username=${username}&password=${password}`, {
    method: 'GET',
    headers: {...DevineApiConfig.apiKeys}
  }).then(res => res.json())

  return {
    type: actionTypes.USER_LOG_IN,
    payload: {
      promise
    }
  }
}

/**
 * Logs-in or signs-up the user using their Facebook auth data.
 *
 * @param {object} params - the auth data from facebook
 * @return {object} request
 */
export function logInFacebook(params) {
  const promise = fetch(`${DevineApiConfig.url}users`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(params)
  }).then(res => res.json())

  return {
    type: actionTypes.USER_FACEBOOK_LOG_IN,
    payload: {
      promise
    }
  }
}

/**
 * Signs up a user with username (optional), email, phone, and password.
 *
 * @return {object} request
 */
export function signUpUser(form) {
  let fields = {}

  fields.username = form.username
  if (!form.username) {
    fields.username = generateRandomString()
  }

  if (form.email) {
    fields.email = form.email
    fields.isEmailVerified = false
  }

  if (form.phone) {
    fields.phone = normalizePhone(form.phone)
    fields.isPhoneVerified = false
  }

  fields.password = form.password

  const promise = fetch(`${DevineApiConfig.url}users`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(fields)
  }).then(res => res.json())

  return {
    type: actionTypes.USER_SIGNED_UP,
    payload: {
      promise
    }
  }
}

/**
 * Sends the password verification code to user.
 *
 * @param {string} userHandle - the user's email or phone number
 * @return {object} request
 */
export function sendPasswordVerificationCode(userHandle) {
  const promise = fetch(`${DevineApiConfig.url}functions/send_password_verification_code`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify({userHandle})
  }).then(res => res.json())

  return {
    type: actionTypes.SEND_VERIFICATION_CODE,
    payload: {
      promise
    }
  }
}

/**
 * Resets the user's password.
 *
 * @param {string} username -
 * @param {string} password -
 * @param {integer} verificationCode -
 * @return {object} request
 */
export function resetPassword(username, password, verificationCode) {
  const promise = fetch(`${DevineApiConfig.url}functions/reset_password`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify({username, password, verificationCode})
  }).then(res => res.json())

  return {
    type: actionTypes.SEND_VERIFICATION_CODE,
    payload: {
      promise
    }
  }
}

/**
 * Updates a user's profile information.
 *
 * @param {object} params - fields to update
 * @return {object} request
 */
export function putUser(params) {
  const promise = fetch(`${DevineApiConfig.url}users`, {
    method: 'PUT',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(params)
  }).then(res => res.json())

  return {
    type: actionTypes.PUT_USER,
    payload: {
      promise
    }
  }
}
