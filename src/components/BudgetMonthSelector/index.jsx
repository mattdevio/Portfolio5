import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { db } from '../../firebase'
import styles from './BudgetMonthSelector.css'

class BudgetMonthSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      monthsShort: moment.monthsShort(),
    }
  }

  componentDidMount() {
    const {
      budgetYear,
      budgetMonth,
    } = this.props
    const now = moment()
    if (!budgetYear) {
      this.setBudgetYear(now.format('YYYY'))
    }
    if (!budgetMonth) {
      this.setBudgetMonth(now.format('MMMM'))
    }
  }

  setBudgetMonth(month) {
    this.props.setBudgetMonth(
      this.props.authUser.uid,
      month,
    )
  }

  setBudgetYear(year) {
    this.props.setBudgetYear(
      this.props.authUser.uid,
      year,
    )
  }

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

const mapStateToProps = state => ({
  budgetYear: state.budgetState.budgetYear,
  budgetMonth: state.budgetState.budgetMonth,
  authUser: state.sessionState.authUser,
})

const mapDispatchToProps = dispatch => ({
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
})

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMonthSelector)
