const INITIAL_STATE = {
  budgetYear: '',
  budgetMonth: '',
}

const applySetBudgetYear = (state, action) => ({
  ...state,
  budgetYear: action.budgetYear,
})

const applySetBudgetMonth = (state, action) => ({
  ...state,
  budgetMonth: action.budgetMonth,
})

function budgetReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_BUDGET_YEAR': {
      return applySetBudgetYear(state, action)
    }
    case 'SET_BUDGET_MONTH': {
      return applySetBudgetMonth(state, action)
    }
    default: return state
  }
}

export default budgetReducer
