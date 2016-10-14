import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'

// import fetch from 'node-fetch'

/**
 * Creates a new comment.
 *
 * @param {object} params - the comment params
 * @return {object} promise
 */
export function postReply(params) {
  const promise = fetch(`${DevineApiConfig.url}classes/Comment`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(params)
  }).then(res => res.json())

  return {
    type: actionTypes.POST_COMMENTS,
    payload: {
      promise
    }
  }
}

/**
 * After the comment has been posted, add the comment object as a relation to the parent feed item.
 *
 * @param {object} comment
 * @return {object} promise
 */
export function addCommentRelation(comment) {
  const data = {
    "comments": {
      "__op": "AddRelation",
      "objects": [
        {
          "className": comment.className,
          "__type": "Pointer",
          "objectId": comment.objectId
        }
      ]
    }
  }

  const promise = fetch(`${DevineApiConfig.url}classes/Comment`, {
    method: 'POST',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(data)
  }).then(res => res.json())

  return {
    type: actionTypes.ADD_COMMENT_RELATION,
    payload: {
      promise
    }
  }
}
