// set the initial state
const INITIAL_STATE = {
  displayName: '',
}

// set the logged in users display name
const applySetDisplayName = (state, action) => ({
  ...state,
  displayName: action.displayName,
})

// compose the user reducer
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_DISPLAYNAME': {
      return applySetDisplayName(state, action)
    }
    default: return state
  }
}

export default userReducer
