import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import moment from 'moment'

import { db } from '../../firebase'
import withAuthorization from '../withAuthorization'
import BudgetMonthSelector from '../BudgetMonthSelector'
import StartNewBudget from '../StartNewBudget'
import IncomeBlock from '../IncomeBlock'

import styles from './MyBudget.css'

/**
 * MyBudgetPage - React Component
 * The 'My Budget' pages is the page that lets users create budgets
 */
class MyBudgetPage extends Component {

  // Load initial user data the database, set defaults if it's the first time
  // logging in.
  componentDidMount() {
    const {
      setDisplayName,
      setBudgetYear,
      setBudgetMonth,
    } = this.props
    db.getUserData(this.props.authUser.uid)
      .then((snapshot) => {
        const user = snapshot.val()
        const now = moment()
        const budgetYear = user.budgetYear || now.format('YYYY')
        const budgetMonth = user.budgetMonth || now.format('MMMM')
        setDisplayName(user.displayName)
        setBudgetYear(budgetYear)
        setBudgetMonth(budgetMonth)
      })
      .catch((error) => {
        console.dir(error)
      })
  }

  // Condition Display For Budget Data
  renderBudgetData() {
    if (this.props.selectedBudgetExists) {
      return (
        <IncomeBlock />
      )
    }
    return (<StartNewBudget />)
  }

  // Display Budget Structure
  render() {
    const {
      displayName,
    } = this.props

    return (
      <div className={styles.container}>
        <section className={styles.left}>
          <h1 className={styles.welcome}>Hello, {displayName}!</h1>
        </section>
        <section className={styles.right}>
          <BudgetMonthSelector />
          <hr />
          {this.renderBudgetData.bind(this)()}
        </section>
      </div>
    )
  }
}

// map redux state to MyBudgetPage props
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  displayName: state.userState.displayName,
  budgetMonth: state.budgetState.budgetMonth,
  budgetYear: state.budgetState.budgetYear,
  selectedBudgetExists: state.budgetState.selectedBudgetExists,
})

// map dispatch methods to MyBudgetPage props
const mapDispatchToProps = dispatch => ({
  setDisplayName: displayName => dispatch({
    type: 'SET_DISPLAYNAME',
    displayName,
  }),
  setBudgetYear: budgetYear => dispatch({
    type: 'SET_BUDGET_YEAR',
    budgetYear,
  }),
  setBudgetMonth: budgetMonth => dispatch({
    type: 'SET_BUDGET_MONTH',
    budgetMonth,
  }),
})

// Define the authCondition
const authCondition = authUser => !!authUser

// Export the composed React HOC
export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
)(MyBudgetPage)
