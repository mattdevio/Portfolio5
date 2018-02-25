const INITIAL_STATE = {
  budgetYear: '',
  budgetMonth: '',
  selectedBudgetExists: false,
  budgetInputGroups: [],
}

const applySetBudgetYear = (state, action) => ({
  ...state,
  budgetYear: action.budgetYear,
})

const applySetBudgetMonth = (state, action) => ({
  ...state,
  budgetMonth: action.budgetMonth,
})

const applySetBudgetExists = (state, action) => ({
  ...state,
  selectedBudgetExists: action.selectedBudgetExists,
})

const applySetBudgetInputGroups = (state, action) => ({
  ...state,
  budgetInputGroups: action.inputBudgetGroups,
})

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
    default: return state
  }
}

export default budgetReducer
