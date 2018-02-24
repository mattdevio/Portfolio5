import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './StartNewBudget.css'
import { db } from '../../firebase'

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
    } = this.props
    db.doInitBudgetInformation(authUser.uid, budgetMonth, budgetYear)
      .then(() => alert('budget created'))
      .catch(error => alert(error.message))
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

export default connect(mapStateToProps)(StartNewBudget)
