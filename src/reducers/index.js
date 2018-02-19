import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'
import visualReducer from './visual'

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  visualState: visualReducer,
})

export default rootReducer
