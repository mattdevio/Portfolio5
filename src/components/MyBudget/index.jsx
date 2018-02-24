import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { db } from '../../firebase'
import withAuthorization from '../withAuthorization'
import BudgetMonthSelector from '../BudgetMonthSelector'
import StartNewBudget from '../StartNewBudget'
import IncomeBlock from '../IncomeBlock'

import styles from './MyBudget.css'

class MyBudgetPage extends Component {

  componentDidMount() {
    if (!this.props.displayName) {
      db.getDisplayName(this.props.authUser.uid)
        .then((snapshot) => {
          this.props.setDisplayName(snapshot.val().displayName)
        })
        .catch((error) => {
          console.dir(error)
        })
    }
  }

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
          <StartNewBudget />
          <IncomeBlock />
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  displayName: state.userState.displayName,
  budgetMonth: state.budgetState.budgetMonth,
  budgetYear: state.budgetState.budgetYear,
})

const mapDispatchToProps = dispatch => ({
  setDisplayName: displayName => dispatch({
    type: 'SET_DISPLAYNAME',
    displayName,
  }),
})

const authCondition = authUser => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
)(MyBudgetPage)
