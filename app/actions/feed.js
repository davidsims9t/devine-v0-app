import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'
import _ from 'lodash'

// import fetch from 'node-fetch'

const defaultItemState = {
  limit: 10,
  skip: 0,
  order: "createdAt",
  isDescending: true
}

/**
 * Queries a feed item class.
 *
 * @param {state} state - contains state items such as item limit, offset, objectId, and order.
 * @return {object} request
 */
export function getItem(state = defaultItemState) {
  let order = state.order
  if (!state.isDescending) {
    order = `-${state.order}`
  }

  let queryStr = `limit=${state.limit}&skip=${state.skip}&order=${order}`

  if (state.objectId) {
    queryStr = `where={"objectId":"${state.objectId}"}`
  }

  const promise = fetch(`${DevineApiConfig.url}classes/${state.className}?${queryStr}`, {
    method: 'GET',
    headers: {...DevineApiConfig.apiKeys},
  }).then(res => res.json())

  return {
    type: actionTypes.GET_FEED_ITEM,
    payload: {
      promise
    }
  }
}

/**
 * Queries the relational data for a given feed item.
 *
 * @param {object} parentObject - the parent object
 * @param {string} className - the class name of relation
 * @param {string} relationKey - the relation key
 * @param {object} queryFilters - (optional) extra query filters to pass
 * @return {object} request
 */
export function getRelationalData(parentObject, className, relationKey, queryFilters) {
  const where = JSON.stringify({
    "$relatedTo": {
      "object": {
        "__type" : "Pointer",
        "className" : parentObject.className,
        "objectId" : parentObject.objectId
      },
      "key": relationKey
    },
    ...queryFilters
  })

  const promise = fetch(`${DevineApiConfig.url}classes/${className}?where=${where}`, {
    method: 'GET',
    headers: {...DevineApiConfig.apiKeys},
  }).then(res => res.json())

  return {
    type: actionTypes.GET_FEED_RELATIONAL_DATA,
    payload: {
      promise
    }
  }
}

/**
 * When a user interacts with a feed item (likes, favorites, etc.) update the feed result.
 *
 * @param {object} params -
 * @return {object} request
 */
export function updateStats(params) {
  if (!params.rowData || !params.colName) {
    return false
  }

  const className = params.className
  const rowData = params.rowData
  const colName = params.colName
  const user = params.user
  const totalCount = params.totalCount
  const clickItem = params.clickItem
  const clickItemColName = params.clickItemColName

  let items

  if (user) {
    items = rowData[colName] || []

    if (clickItem && clickItemColName) {
      const obj = {"user": user.objectId, [clickItemColName]: clickItem}

      if (!_.some(items, obj)) {
        items.push(obj)
      }
    } else {
      if (params.canRemove) {
        if (items.indexOf(user.objectId) == -1) {
          items.push(user.objectId)
        } else {
          items.shift(items.indexOf(user.objectId), 1)
        }
      } else {
        if (items.indexOf(user.objectId) == -1) {
          items.push(user.objectId)
        }
      }
    }
  }

  let fields = {}

  if (items) {
    fields[colName] = items
  }

  if (totalCount) {
    fields[totalCount] = {"__op": "Increment", "amount": 1}
  }

  if (!rowData.updatedBy) {
    fields.updatedBy = rowData.createdBy
  }

  const promise = fetch(`${DevineApiConfig.url}classes/${className}/${rowData.objectId}`, {
    method: 'PUT',
    headers: {...DevineApiConfig.apiKeys},
    body: JSON.stringify(fields)
  }).then(res => res.json())

  return {
    type: actionTypes.UPDATE_STATS,
    payload: {
      promise
    }
  }
}
