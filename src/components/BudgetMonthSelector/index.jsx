import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import styles from './BudgetMonthSelector.css'
import { byPropKey } from '../common'

class BudgetMonthSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentMonth: moment().format('MMMM'),
      currentYear: moment().format('YYYY'),
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
      currentMonth,
      currentYear,
      monthsShort,
    } = this.state

    const prevYear = (+currentYear - 1).toString()
    const nextYear = (+currentYear + 1).toString()

    return (
      <div className={styles.container}>
        <div className={styles.topbar}>
          <h1 className={styles.month}>{currentMonth}<span>{currentYear}</span></h1>
          <ul className={styles.yearBtnGroup}>
            <li><button onClick={this.mountYearClick(prevYear)}>{prevYear}</button></li>
            <li className={styles.tag}>{currentYear}</li>
            <li><button onClick={this.mountYearClick(nextYear)}>{nextYear}</button></li>
          </ul>
        </div>
        <div className={styles.select}>
          {monthsShort.map((month) => {
            const btnMonth = moment(month, 'MMM').format('MMMM')
            let s = styles.monthBtn
            s += (btnMonth === currentMonth) ? ` ${styles.active}` : ''
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

})

const mapDispatchToProps = dispatch => ({

})

export default BudgetMonthSelector
