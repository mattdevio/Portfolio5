import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { db } from '../../firebase'
import withAuthorization from '../withAuthorization'
import BudgetMonthSelector from '../BudgetMonthSelector'
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
        <aside className={styles.left}>
          <h1 className={styles.welcome}>Hello, {displayName}!</h1>
        </aside>
        <section className={styles.right}>
          <BudgetMonthSelector />
          <hr />
          <IncomeBlock />
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  displayName: state.userState.displayName,
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
