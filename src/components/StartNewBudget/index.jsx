import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './StartNewBudget.css'
import { db } from '../../firebase'
import renderStruct from './initBudgetStructure'

class StartNewBudget extends Component {
  constructor(props) {
    super(props)
    this.initBudgetYear = this.initBudgetYear.bind(this)
  }

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

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  budgetYear: state.budgetState.budgetYear,
  budgetMonth: state.budgetState.budgetMonth,
})

const mapDispatchToProps = dispatch => ({
  setBudgetExists: selectedBudgetExists => dispatch({
    type: 'SET_BUDGET_EXISTS',
    selectedBudgetExists,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(StartNewBudget)
