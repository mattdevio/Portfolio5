import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { db } from '../../firebase'
import styles from './BudgetMonthSelector.css'

/**
 * BudgetMonthSelector - React Component
 * In charge of selecting, creating, and saving budgets for a
 * specific budget month & year.
 */
class BudgetMonthSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      monthsShort: moment.monthsShort(),
    }
  }

  /**
   * If a new budget year & month is selected,
   * download the related budget data from the firebase db
   * and store it in the global redux state
   */
  componentWillReceiveProps(nextProps) {
    const {
      budgetYear,
      budgetMonth,
      authUser,
      setBudgetExists,
      selectedBudgetExists,
      setBudgetIncomeGroups,
    } = this.props
    if (budgetYear !== nextProps.budgetYear ||
      budgetMonth !== nextProps.budgetMonth ||
      selectedBudgetExists !== nextProps.selectedBudgetExists) {
      db.doGetBudgetInformation(authUser.uid, nextProps.budgetMonth, nextProps.budgetYear)
        .then((snapshot) => {
          const budgetData = snapshot.val()
          setBudgetExists(!!budgetData)
          if (budgetData && budgetData.income) {
            setBudgetIncomeGroups(budgetData.income)
          } else {
            setBudgetIncomeGroups({})
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }

  /**
   * Save the current budget month to the redux store &
   * save the month in firebase
   */
  setBudgetMonth(month) {
    const { authUser } = this.props
    this.props.setBudgetMonth(
      authUser.uid,
      month,
    )
  }

  /**
   * Save the current budget year to the redux store &
   * save the year in firebase
   */
  setBudgetYear(year) {
    const { authUser } = this.props
    this.props.setBudgetYear(
      authUser.uid,
      year,
    )
  }

  /**
   * Display the component
   */
  render() {
    const {
      monthsShort,
    } = this.state

    const {
      budgetYear,
      budgetMonth,
    } = this.props

    const prevYear = (+budgetYear - 1).toString()
    const nextYear = (+budgetYear + 1).toString()

    return (
      <div className={styles.container}>
        <div className={styles.topbar}>
          <h1 className={styles.month}>{budgetMonth}<span>{budgetYear}</span></h1>
          <ul className={styles.yearBtnGroup}>
            <li>
              <button onClick={() => this.setBudgetYear(prevYear)}>
                {prevYear}
              </button>
            </li>
            <li className={styles.tag}>{budgetYear}</li>
            <li>
              <button onClick={() => this.setBudgetYear(nextYear)}>
                {nextYear}
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.select}>
          {monthsShort.map((month) => {
            const btnMonth = moment(month, 'MMM').format('MMMM')
            let s = styles.monthBtn
            s += (btnMonth === budgetMonth) ? ` ${styles.active}` : ''
            return (
              <button className={s} key={month} onClick={() => this.setBudgetMonth(btnMonth)}>
                <span>{month}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }
}

// map state from redux store to the component's props
const mapStateToProps = state => ({
  budgetYear: state.budgetState.budgetYear,
  budgetMonth: state.budgetState.budgetMonth,
  authUser: state.sessionState.authUser,
  selectedBudgetExists: state.budgetState.selectedBudgetExists,
})

// map dispatch methods to the component's props
const mapDispatchToProps = dispatch => ({
  // set budget year
  setBudgetYear: (uid, budgetYear) => {
    db.doSetBudgetYear(uid, budgetYear)
      .then(() => {
        dispatch({
          type: 'SET_BUDGET_YEAR',
          budgetYear,
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
  // set budget month
  setBudgetMonth: (uid, budgetMonth) => {
    db.doSetBudgetMonth(uid, budgetMonth)
      .then(() => {
        dispatch({
          type: 'SET_BUDGET_MONTH',
          budgetMonth,
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
  // set flag to tell if budget exists
  setBudgetExists: selectedBudgetExists => dispatch({
    type: 'SET_BUDGET_EXISTS',
    selectedBudgetExists,
  }),
  // set income groups
  setBudgetIncomeGroups: budgetInputGroups => dispatch({
    type: 'SET_BUDGET_INPUT_GROUPS',
    budgetInputGroups,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMonthSelector)
