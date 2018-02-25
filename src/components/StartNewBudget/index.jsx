import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './StartNewBudget.css'
import { db } from '../../firebase'
import renderStruct from './initBudgetStructure'

/**
 * StartNewBudget - React Components
 * Lets the user init a new budget on a month & year
 */
class StartNewBudget extends Component {
  constructor(props) {
    super(props)
    this.initBudgetYear = this.initBudgetYear.bind(this)
  }

  // init budget on firebase db and set budgetExists flag
  initBudgetYear() {
    const {
      authUser,
      budgetMonth,
      budgetYear,
      setBudgetExists,
    } = this.props
    db.doInitBudgetInformation(
      authUser.uid,
      budgetMonth,
      budgetYear,
      renderStruct(),
    ).then(() => {
      setBudgetExists(true)
    }).catch((err) => {
      console.dir(err)
    })
  }

  // display the form / button to init a budget
  render() {
    const {
      budgetYear,
      budgetMonth,
    } = this.props
    return (
      <div className={styles.container}>
        <h1>You Have Not Started This Budget Yet</h1>
        <button onClick={this.initBudgetYear}>
          Create Budget For {`${budgetMonth} ${budgetYear}`}
        </button>
      </div>
    )
  }
}

// map state from redux store to StartNewBudget props
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  budgetYear: state.budgetState.budgetYear,
  budgetMonth: state.budgetState.budgetMonth,
  selectedBudgetExists: state.budgetState.selectedBudgetExists,
})

// map dispatch method to StartNewBudget props
const mapDispatchToProps = dispatch => ({
  setBudgetExists: selectedBudgetExists => dispatch({
    type: 'SET_BUDGET_EXISTS',
    selectedBudgetExists,
  }),
})

// export StartNewBudget
export default connect(mapStateToProps, mapDispatchToProps)(StartNewBudget)
