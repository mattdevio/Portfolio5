import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import styles from './BudgetMonthSelector.css'
import { byPropKey } from '../common'

class BudgetMonthSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      monthsShort: moment.monthsShort(),
    }
    this.mountMonthClick = this.mountMonthClick.bind(this)
    this.mountYearClick = this.mountYearClick.bind(this)
  }

  componentDidMount() {
    console.log('cdm')
  }

  mountMonthClick(monthString) {
    return () => {
      this.setState(byPropKey('currentMonth', monthString))
    }
  }

  mountYearClick(yearString) {
    return () => {
      this.setState(byPropKey('currentYear', yearString))
    }
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
            <li><button onClick={this.mountYearClick(prevYear)}>{prevYear}</button></li>
            <li className={styles.tag}>{budgetYear}</li>
            <li><button onClick={this.mountYearClick(nextYear)}>{nextYear}</button></li>
          </ul>
        </div>
        <div className={styles.select}>
          {monthsShort.map((month) => {
            const btnMonth = moment(month, 'MMM').format('MMMM')
            let s = styles.monthBtn
            s += (btnMonth === budgetMonth) ? ` ${styles.active}` : ''
            return (
              <button className={s} key={month} onClick={this.mountMonthClick(btnMonth)}>
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
