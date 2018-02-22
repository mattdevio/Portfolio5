import React, { Component } from 'react'

import styles from './BudgetMonthSelector.css'

class BudgetMonthSelector extends Component {
  componentDidMount() {
    console.log('Budget Month Selector Mounted')
  }

  render() {
    const month = 'January'
    const year = '2018'
    return (
      <div className={styles.container}>
        <h1 className={styles.month}>{month}<span>{year}</span></h1>
        <div className={styles.select}>
          <div>Month</div>
        </div>
      </div>
    )
  }
}

export default BudgetMonthSelector
