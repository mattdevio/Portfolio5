import * as routes from '../constants/routes'

const INITIAL_STATE = {
  activeLink: routes.LANDING,
}

const applySetActiveLink = (state, action) => ({
  ...state,
  activeLink: action.activeLink,
})

function visualReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ACTIVE_LINK': {
      return applySetActiveLink(state, action)
    }
    default: return state
  }
}

export default visualReducer
