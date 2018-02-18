import React, { Component } from 'react'

import styles from './Navigation.css'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={styles.container}>
        <p>Navigation Elemenet</p>
      </div>
    )
  }
}

export default Navigation
