import React, { Component } from 'react'

import styles from './BudgetMonthSelector.css'

class BudgetMonthSelector extends Component {
  componentDidMount() {
    console.log('Budget Month Selector Mounted')
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Budget Month Selector</h1>
      </div>
    )
  }
}

export default BudgetMonthSelector
