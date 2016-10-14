import * as actionTypes from '../actions/actionTypes'
import DevineApiConfig from '../config/api'
import AlgoliaConfig from '../config/algolia'

import algoliasearch from 'algoliasearch/reactnative'
const client = algoliasearch(AlgoliaConfig.appId, AlgoliaConfig.apiKey)

/**
 * Searches indices for the given search query.
 *
 * @param {string} query - a query string to search for
 * @param {array} indices - an collection of index names and associated props
 * @return {object} request
 */
export function getSearchResults(query, indices) {
  const searches = indices.map(index => {
    return {
      indexName: index.name,
      query,
      params: {
        hitsPerPage: index.hitsPerPage,
        page: index.page ? index.page : 0
      }
    }
  })
  const promise = client.search(searches)

  return {
    type: actionTypes.GET_SEARCH,
    payload: {
      promise
    }
  }
}
