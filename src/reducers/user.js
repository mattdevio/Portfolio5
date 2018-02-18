const INITIAL_STATE = {
  displayName: '',
}

const applySetDisplayName = (state, action) => ({
  ...state,
  displayName: action.displayName,
})

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_DISPLAYNAME': {
      return applySetDisplayName(state, action)
    }
    default: return state
  }
}

export default userReducer
