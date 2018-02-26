import cloneDeep from 'lodash.clonedeep'

// set the initial state
const INITIAL_STATE = {
  budgetYear: '',
  budgetMonth: '',
  selectedBudgetExists: false,
  budgetInputGroups: {},
}

// update the budget year
const applySetBudgetYear = (state, action) => ({
  ...state,
  budgetYear: action.budgetYear,
})

// update the budget month
const applySetBudgetMonth = (state, action) => ({
  ...state,
  budgetMonth: action.budgetMonth,
})

// update the budget exists boolean
const applySetBudgetExists = (state, action) => ({
  ...state,
  selectedBudgetExists: action.selectedBudgetExists,
})

// set the budget input groups
const applySetBudgetInputGroups = (state, action) => ({
  ...state,
  budgetInputGroups: action.budgetInputGroups,
})

// update a label on a single budget input group
const applyUpdateBudgetInputGroupLabel = (state, action) => {
  const newState = cloneDeep(state)
  newState.budgetInputGroups[action.uuid].label = action.label
  return newState
}

const applyUpdateBudgetInputGroupPlanned = (state, action) => {
  const newState = cloneDeep(state)
  newState.budgetInputGroups[action.uuid].planned = action.planned
  return newState
}

const applyRemoveBudgetInputGroup = (state, action) => {
  const newState = cloneDeep(state)
  delete newState.budgetInputGroups[action.uuid]
  console.dir(newState)
  return newState
}

// compose the budget reducer
function budgetReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_BUDGET_YEAR': {
      return applySetBudgetYear(state, action)
    }
    case 'SET_BUDGET_MONTH': {
      return applySetBudgetMonth(state, action)
    }
    case 'SET_BUDGET_EXISTS': {
      return applySetBudgetExists(state, action)
    }
    case 'SET_BUDGET_INPUT_GROUPS': {
      return applySetBudgetInputGroups(state, action)
    }
    case 'UPDATE_BUDGET_INPUT_GROUP_LABEL': {
      return applyUpdateBudgetInputGroupLabel(state, action)
    }
    case 'UPDATE_BUDGET_INPUT_GROUP_PLANNED': {
      return applyUpdateBudgetInputGroupPlanned(state, action)
    }
    case 'REMOVE_BUDGET_INPUT_GROUP': {
      return applyRemoveBudgetInputGroup(state, action)
    }
    default: return state
  }
}

export default budgetReducer
