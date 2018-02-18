const INITIAL_STATE = {
  authUser: null,
}

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser,
})

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_AUTHUSER': {
      return applySetAuthUser(state, action)
    }
    default: return state
  }
}

export default sessionReducer
