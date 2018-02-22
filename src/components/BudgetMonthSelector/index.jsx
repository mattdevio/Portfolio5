import React, { Component } from 'react'
import moment from 'moment'

import styles from './BudgetMonthSelector.css'

class BudgetMonthSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentMonth: moment().format('MMMM'),
      currentYear: moment().format('YYYY'),
      monthsShort: moment.monthsShort(),
    }
    this.mountMonthClick = this.mountMonthClick.bind(this)
  }

  componentDidMount() {
    console.log('cdm')
  }

  mountMonthClick(monthString) {
    return () => {
      this.setState({
        currentMonth: monthString,
      })
    }
  }

  render() {
    const {
      currentMonth,
      currentYear,
      monthsShort,
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.topbar}>
          <h1 className={styles.month}>{currentMonth}<span>{currentYear}</span></h1>
          <ul className={styles.yearBtnGroup}>
            <li><button>&lt;</button></li>
            <li>YEAR</li>
            <li><button>&gt;</button></li>
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

export default BudgetMonthSelector
