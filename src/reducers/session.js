// set the initial state
const INITIAL_STATE = {
  authUser: null,
}

// set the authuser in global state
const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser,
})

// compose the session reducer
function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_AUTHUSER': {
      return applySetAuthUser(state, action)
    }
    default: return state
  }
}

export default sessionReducer
