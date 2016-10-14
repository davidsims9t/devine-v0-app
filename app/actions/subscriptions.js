import * as actionTypes from '../actions/actionTypes'
import PusherConfig from '../config/pusher'

// Uncomment this line if unit testing
// import Pusher from 'pusher-websocket-iso'

// Comment this line if unit testing
import Pusher from 'pusher-websocket-iso/react-native'

/**
 * Subscribes to a Pusher channel.
 *
 * @param {string} channelName - the channel name (i.e. user id)
 * @param {string} event - the event name
 * @param {string} userId - optional user id if using presence channel
 * @return {object} request
 */
export function subscribe(channelName, event, userId) {
  let socket
  if (userId) {
    socket = new Pusher(PusherConfig.key, {
      authEndpoint: 'http://devine.parseapp.com/pusher/auth',
      auth: {
        params: {
          user_id: userId
        }
      }
    })
  } else {
    socket = new Pusher(PusherConfig.key)
  }

  let channel = socket.subscribe(channelName)
  const promise = getMessages(channel, event)

  return {
    type: actionTypes.SUBSCRIBE_TO_CHANNEL,
    payload: {
      promise
    }
  }
}

/**
 * This is a work-around for making bind return as a promise.
 *
 * @param {string} event - the event name
 * @param {object} channel - the channel object
 * @return {object} promise
 */
async function getMessages(channel, event) {
  channel.bind_all(data => {
    return data
  })
}

/**
 * Unsubscribes from a Pusher channel.
 *
 * @param {string} channel - the channel name (i.e. user id)
 * @return {object} request
 */
export function unsubscribe(channel, userId) {
  let socket
  if (userId) {
    socket = new Pusher(PusherConfig.key, {
      authEndpoint: 'http://devine.parseapp.com/pusher/auth',
      auth: {
        params: {
          user_id: userId
        }
      }
    })
  } else {
    socket = new Pusher(PusherConfig.key)
  }

  const unsubscribe = socket.unsubscribe(channel)
  channel.unbind()

  return {
    type: actionTypes.UNSUBCRIBE_FROM_CHANNEL,
    payload: {
      unsubscribe
    }
  }
}
