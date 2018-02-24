import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'

import rootReducer from '../reducers'

const middleware = (process.env.NODE_ENV === 'development') ? applyMiddleware(logger) : () => {}

// const store = createStore(rootReducer, {}, middleware)
const store = createStore(rootReducer)

export default store
