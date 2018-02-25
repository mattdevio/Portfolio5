import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'
import budgetReducer from './budget'

// Bundle all the reducers into one
const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  budgetState: budgetReducer,
})

export default rootReducer
