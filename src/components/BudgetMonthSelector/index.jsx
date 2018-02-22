import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

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
      setBudgetYear,
      setBudgetMonth,
    } = this.props
    const now = moment()
    if (!budgetYear) {
      setBudgetYear(now.format('YYYY'))
    }
    if (!budgetMonth) {
      setBudgetMonth(now.format('MMMM'))
    }
    console.dir(budgetMonth)
  }

  render() {
    const {
      monthsShort,
    } = this.state

    const {
      budgetYear,
      budgetMonth,
      setBudgetYear,
      setBudgetMonth,
    } = this.props

    const prevYear = (+budgetYear - 1).toString()
    const nextYear = (+budgetYear + 1).toString()

    return (
      <div className={styles.container}>
        <div className={styles.topbar}>
          <h1 className={styles.month}>{budgetMonth}<span>{budgetYear}</span></h1>
          <ul className={styles.yearBtnGroup}>
            <li>
              <button onClick={() => setBudgetYear(prevYear)}>
                {prevYear}
              </button>
            </li>
            <li className={styles.tag}>{budgetYear}</li>
            <li>
              <button onClick={() => setBudgetYear(nextYear)}>
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
              <button className={s} key={month} onClick={() => setBudgetMonth(btnMonth)}>
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
})

const mapDispatchToProps = dispatch => ({
  setBudgetYear: budgetYear => dispatch({
    type: 'SET_BUDGET_YEAR',
    budgetYear,
  }),
  setBudgetMonth: budgetMonth => dispatch({
    type: 'SET_BUDGET_MONTH',
    budgetMonth,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMonthSelector)
