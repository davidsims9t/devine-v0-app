import React, { Component } from 'react-native'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reduxPromise from 'redux-promise-middleware'

import * as reducers from '../reducers'
import AppContainer from './app'

const createStoreWithMiddleware = applyMiddleware(reduxPromise())(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

export default class Devine extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
