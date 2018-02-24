import React, { Component } from 'react'

import styles from './IncomeBlock.css'

const IncomeBlock = () => (
  <div className={styles.container}>
    <div className={styles.topbar}>
      <h1>Income:</h1>
      <span>
        <p>Planned</p>
        <p>Recieved</p>
      </span>
    </div>
    <InputLine />
    <hr />
    <div className={styles.actions}>
      <button className={styles.addItem}>+ Add Item</button>
    </div>
  </div>
)

class InputLine extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.toggleInput}>
        <div className={styles.inputGroup}>
          <button>X</button>
          <input type='text' placeholder='Budget Label Item' />
        </div>
        <div className={styles.displayGroup}>
          <input type='text' placeholder='$0.00' />
        </div>
        <p className={styles.actual}>$0.00</p>
      </div>
    )
  }
}

export default IncomeBlock
