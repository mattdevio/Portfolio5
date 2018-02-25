const INITIAL_STATE = {
  budgetYear: '',
  budgetMonth: '',
  selectedBudgetExists: false,
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
    default: return state
  }
}

export default budgetReducer
