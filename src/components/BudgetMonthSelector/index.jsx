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
  }

  componentDidMount() {
    console.log('cdm')
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
        </div>
        <div className={styles.select}>
          {monthsShort.map((month) => {
            let s = styles.monthBtn
            const btnMonth = moment(month, 'MMM').format('MMMM')
            s += (btnMonth === currentMonth) ? ` ${styles.active}` : ''
            return (
              <div className={s} key={month}>
                <span>{month}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default BudgetMonthSelector
