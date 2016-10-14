import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'

// import fetch from 'node-fetch'

/**
 * Returns a list of notifications for a specific user.
 *
 * @param {string} userId - the user id
 * @param {bool} isNew - show only new user notifications
 * @return {object} request
 */
export function getNotifications(userId, isNew) {
  let where = {
    user: {
      "className": "_User",
      "__type": "Pointer",
      "objectId": userId
    }
  }

  if (isNew) {
    where.isNew = true
  }

  const queryStr = JSON.stringify(where)
  const promise = fetch(`${DevineApiConfig.url}classes/UserNotification?where=${queryStr}`, {
    method: 'GET',
    headers: {...DevineApiConfig.apiKeys}
  }).then(res => res.json())

  return {
    type: actionTypes.GET_NOTIFICATIONS,
    payload: {
      promise
    }
  }
}

/**
 * Updates user notifications (set isNew to false after viewing them).
 *
 * @param {array} notifications - collection of user notification objects
 * @return {object} request
 */
export function markUserNotificationAsSeen(notifications) {
  const requests = notifications.map(notification => {
    return {
      method: 'PUT',
      path: `/1/classes/UserNotification/${notification.objectId}`,
      body: {
        isNew: false
      }
    }
  })
  const body = JSON.stringify({requests})

  const promise = fetch(`${DevineApiConfig.url}batch`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body
  }).then(res => res.json())

  return {
    type: actionTypes.PUT_NOTIFICATIONS,
    payload: {
      promise
    }
  }
}
